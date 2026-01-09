import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Project image is required'],
  },
  category: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
