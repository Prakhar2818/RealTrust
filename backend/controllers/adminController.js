import Admin from '../models/Admin.js';
import Lead from '../models/Lead.js';
import { generateToken } from '../middleware/auth.js';
import { Parser } from 'json2csv';

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists with this email',
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 [LOGIN] Attempt with email:', email);

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      console.log('❌ [LOGIN] Admin not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    console.log('✅ [LOGIN] Admin found:', admin.email);

    // Check password
    const isMatch = await admin.comparePassword(password);
    console.log('🔑 [LOGIN] Password match:', isMatch);

    if (!isMatch) {
      console.log('❌ [LOGIN] Password mismatch for:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    console.log('✅ [LOGIN] Last login updated');

    const token = generateToken(admin._id);
    console.log('🎫 [LOGIN] Token generated');

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log('✅ [LOGIN] Login successful for:', email);
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    console.error('❌ [LOGIN] Error occurred:', error.message);
    console.error('❌ [LOGIN] Error stack:', error);
    next(error);
  }
};

export const getAllLeads = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, search, sort = '-createdAt' } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    // Execute query with pagination
    const leads = await Lead.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Lead.countDocuments(query);

    res.json({
      success: true,
      data: leads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadStats = async (req, res, next) => {
  try {
    const total = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const contacted = await Lead.countDocuments({ status: 'contacted' });
    const qualified = await Lead.countDocuments({ status: 'qualified' });
    const converted = await Lead.countDocuments({ status: 'converted' });

    // Get leads from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentLeads = await Lead.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    res.json({
      success: true,
      data: {
        total,
        byStatus: {
          new: newLeads,
          contacted,
          qualified,
          converted,
        },
        recentLeads,
        conversionRate: total > 0 ? ((converted / total) * 100).toFixed(2) : 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const exportLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find().lean();

    const fields = ['name', 'email', 'phone', 'company', 'message', 'status', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(leads);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const matchStage = {};
    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = new Date(startDate);
      if (endDate) matchStage.createdAt.$lte = new Date(endDate);
    }

    // Leads over time (by day)
    const leadsOverTime = await Lead.aggregate([
      ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Leads by status
    const leadsByStatus = await Lead.aggregate([
      ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        leadsOverTime,
        leadsByStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};
