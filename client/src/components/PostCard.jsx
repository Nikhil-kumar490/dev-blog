import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div style={styles.card}>
      <div style={styles.tags}>
        {post.tags?.map(tag => (
          <span key={tag} style={styles.tag}>#{tag}</span>
        ))}
      </div>
      <Link to={`/post/${post.slug}`} style={styles.title}>{post.title}</Link>
      <p style={styles.excerpt}>{post.excerpt}</p>
      <div style={styles.meta}>
        <span>✍️ {post.author?.username}</span>
        <span>❤️ {post.likes?.length || 0}</span>
        <span>⏱ {post.readTime} min read</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#1e293b', borderRadius: 10, padding: '1.25rem',
    marginBottom: '1rem', borderLeft: '3px solid #6366f1'
  },
  tags: { display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' },
  tag: { background: '#334155', color: '#a78bfa', borderRadius: 4, padding: '2px 8px', fontSize: 12 },
  title: { color: '#e2e8f0', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', display: 'block', marginBottom: 8 },
  excerpt: { color: '#94a3b8', fontSize: '0.9rem', marginBottom: 12 },
  meta: { display: 'flex', gap: 16, color: '#64748b', fontSize: '0.85rem' }
};
