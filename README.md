# DevBlog — Developer Blogging Platform ✍️

A full-stack MERN blogging platform for developers. Write posts in Markdown, tag them, comment, and follow other devs.

## Features
- Markdown editor with live preview
- Syntax-highlighted code blocks
- Tags & category filtering
- Comments with nested replies
- User profiles with follow system
- JWT authentication
- Like / bookmark posts
- Search by title or tag

## Tech Stack
- **Frontend**: React 18, React Router v6, React-Markdown, Highlight.js
- **Backend**: Node.js, Express 4
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt

## Project Structure
```
dev-blog/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   ├── NewPost.jsx
│   │   │   └── Profile.jsx
│   │   ├── components/
│   │   │   ├── PostCard.jsx
│   │   │   ├── MarkdownEditor.jsx
│   │   │   └── CommentSection.jsx
│   │   ├── context/AuthContext.jsx
│   │   ├── api/index.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Post.js
│   │   │   └── Comment.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── posts.js
│   │   │   └── comments.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Setup

```bash
# Server
cd server && npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET
npm run dev

# Client
cd client && npm install && npm run dev
```
