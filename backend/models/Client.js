import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
  },
  designation: {
    type: String,
    required: [true, 'Client designation is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Client description is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Client image is required'],
  },
}, {
  timestamps: true,
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
