const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:   { type: String, required: true, trim: true },
  slug:    { type: String, unique: true },
  content: { type: String, required: true },   // Markdown
  excerpt: { type: String },
  author:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags:    [{ type: String, lowercase: true, trim: true }],
  likes:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  coverImage: { type: String, default: '' },
  published: { type: Boolean, default: true },
  readTime: { type: Number, default: 1 },
}, { timestamps: true });

// Auto-generate slug and excerpt
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
  }
  if (this.isModified('content')) {
    this.excerpt = this.content.replace(/[#*`>\[\]]/g, '').slice(0, 160) + '...';
    this.readTime = Math.max(1, Math.ceil(this.content.split(' ').length / 200));
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
