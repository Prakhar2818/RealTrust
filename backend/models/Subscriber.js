import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  subscribed: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

subscriberSchema.index({ email: 1 });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;
