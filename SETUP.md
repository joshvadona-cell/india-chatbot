# JOSHVA - Setup & Installation Guide

## Welcome to JOSHVA! 🤖

JOSHVA is Your Personal AI Guide to India. This guide will help you set it up.

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Backend
```bash
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Step 2: Frontend
```bash
cd client
npm install
npm start
```

### Step 3: Configure .env
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/joshva-chatbot
OPENAI_API_KEY=your_key_here
FRONTEND_URL=http://localhost:3000
```

### Step 4: Start MongoDB
```bash
mongod
```

### Step 5: Open http://localhost:3000

---

## 📋 Prerequisites

- Node.js v14+
- MongoDB
- OpenAI API Key

---

## 🔧 Troubleshooting

### MongoDB Error
```bash
brew services start mongodb-community
# Or use MongoDB Atlas
```

### OpenAI Error
- Verify API key in .env
- Generate new key if needed

### Port Already in Use
```bash
lsof -ti:5000 | xargs kill -9
```

---

## 🐳 Docker Setup

```bash
export OPENAI_API_KEY=your_key
docker-compose up -d
```

---

## 📞 Support

Check README.md or DEPLOYMENT.md for more help.

---

**Let's chat with JOSHVA! 🤖💬**
