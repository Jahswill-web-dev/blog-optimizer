const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: false },
    enhancedTitle: { type: String, required: false },
    enhancedContent: { type: String }, // Field for enhanced content
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model('Blog', BlogSchema);