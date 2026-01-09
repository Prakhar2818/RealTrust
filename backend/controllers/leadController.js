import Lead from '../models/Lead.js';

export const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, city, company, message } = req.body;

    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: 'A lead with this email already exists',
      });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      city,
      company,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your information has been submitted successfully.',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};
