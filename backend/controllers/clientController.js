import Client from '../models/Client.js';

// Get all clients (Public)
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create client (Admin)
export const createClient = async (req, res) => {
  try {
    const { name, designation, description, image } = req.body;
    
    const client = await Client.create({
      name,
      designation,
      description,
      image,
    });
    
    res.status(201).json({ success: true, data: client });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update client (Admin)
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    
    res.status(200).json({ success: true, data: client });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete client (Admin)
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    
    res.status(200).json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
