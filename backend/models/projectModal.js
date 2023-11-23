const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  deadlineDate: {
    type: Date,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for employees
  },
  document: {
    type: String, // This could be a link to a document stored on Cloudinary or a file path
    required: true,
  },
  repositoryLink: {
    type: String,
  },status: {
    type: String,
    required: true,
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
