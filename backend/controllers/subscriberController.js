import Subscriber from '../models/Subscriber.js';

// Subscribe email (Public)
export const subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already subscribed' });
    }
    
    const subscriber = await Subscriber.create({ email });
    
    res.status(201).json({ success: true, message: 'Successfully subscribed!', data: subscriber });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all subscribers (Admin)
export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ subscribed: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete subscriber (Admin)
export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    
    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }
    
    res.status(200).json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
