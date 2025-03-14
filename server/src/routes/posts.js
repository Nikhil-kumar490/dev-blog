const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all posts (with search/tag filter)
router.get('/', async (req, res) => {
  try {
    const { search, tag, page = 1, limit = 10 } = req.query;
    const query = { published: true };
    if (search) query.title = { $regex: search, $options: 'i' };
    if (tag) query.tags = tag;

    const posts = await Post.find(query)
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Post.countDocuments(query);
    res.json({ posts, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single post by slug
router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'username avatar bio');
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// CREATE post
router.post('/', auth, async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user._id });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE post
router.put('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (!post.author.equals(req.user._id)) return res.status(403).json({ error: 'Forbidden' });
  Object.assign(post, req.body);
  await post.save();
  res.json(post);
});

// DELETE post
router.delete('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (!post.author.equals(req.user._id)) return res.status(403).json({ error: 'Forbidden' });
  await post.deleteOne();
  res.json({ message: 'Deleted' });
});

// LIKE toggle
router.post('/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  const idx = post.likes.indexOf(req.user._id);
  if (idx === -1) post.likes.push(req.user._id);
  else post.likes.splice(idx, 1);
  await post.save();
  res.json({ likes: post.likes.length });
});

module.exports = router;
