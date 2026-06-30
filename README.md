# JOSHVA - India Information Chatbot

> **Your Personal AI Guide to Everything India** 🇮🇳

JOSHVA is an intelligent chatbot powered by AI that provides comprehensive information about India. Ask anything about India's geography, history, culture, tourism, food, sports, economy, and much more!

## 🌟 About JOSHVA

JOSHVA is built with love to help you learn, explore, and discover India in an interactive way. Whether you're a student, traveler, or someone curious about India, JOSHVA is here to help!

## ✨ Features

✅ **AI-Powered Responses**
- OpenAI GPT-3.5 Turbo integration
- Intelligent conversational responses
- Context-aware answers

✅ **Comprehensive India Information**
- 🗺️ Geography & Climate
- 📚 History & Heritage
- 🎭 Culture & Traditions
- ✈️ Tourism & Attractions
- 🍛 Food & Cuisine
- 🏏 Sports & Entertainment
- 💼 Economy & Industries
- 👥 People & Demographics

✅ **User-Friendly Interface**
- Modern React frontend
- Real-time chat experience
- Conversation history
- Responsive design (Mobile & Desktop)
- Beautiful Indian-themed UI

✅ **Robust Backend**
- Express.js server
- MongoDB database
- RESTful API
- Rate limiting & security
- Production-ready

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **OpenAI API** - AI responses
- **Helmet** - Security
- **CORS** - Cross-origin support
- **Morgan** - Request logging
- **Express Rate Limit** - API throttling

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Markdown** - Markdown rendering
- **CSS3** - Beautiful styling

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- OpenAI API Key

### Installation

1. **Clone repository**
```bash
git clone https://github.com/joshvadona-cell/india-chatbot.git
cd india-chatbot
```

2. **Backend setup**
```bash
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

3. **Frontend setup** (New terminal)
```bash
cd client
npm install
npm start
```

4. **Open in browser**
- Navigate to `http://localhost:3000`
- Start chatting with JOSHVA! 💬

## 📡 API Endpoints

- **POST** `/api/chat/message` - Send message to JOSHVA
- **GET** `/api/chat/conversation/:id` - Get chat history
- **GET** `/api/india/categories` - Get info categories
- **GET** `/api/india/category/:category` - Get by category
- **GET** `/api/health` - Server health check

## 🎨 UI Theme

- **Primary Orange** - #FF9933 (India Flag)
- **Green** - #138808 (India Flag)
- **Blue** - #1f4788 (India Flag)
- Beautiful gradient backgrounds
- Smooth animations
- Fully responsive

## 📦 Deployment

### Docker (Local)
```bash
docker-compose up -d
```

### Railway.app (Recommended)
1. Go to https://railway.app
2. Connect GitHub repo
3. Add environment variables
4. Deploy!

### Other Options
- Heroku + Vercel
- Render.com
- AWS/GCP/Azure

See `DEPLOYMENT.md` for detailed instructions.

## 🔐 Security

- ✅ Rate limiting on all endpoints
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation
- ✅ Error handling
- ✅ Request logging

## 📝 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/joshva-chatbot

# OpenAI API
OPENAI_API_KEY=sk-your-key-here

# Frontend
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🌐 Live Demo

Visit JOSHVA online:
- 🌍 Frontend: https://joshva-chatbot.vercel.app
- 🖥️ Backend API: https://joshva-api.railway.app
- 💬 Start chatting now!

## 📞 Support

For issues or questions:
- Check `DEPLOYMENT.md` for setup help
- Review `SETUP.md` for local development
- Create an issue on GitHub

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 🎉 Acknowledgments

- Built with ❤️ for India lovers
- Powered by OpenAI GPT-3.5 Turbo
- MongoDB for reliable data storage
- React for beautiful UI

---

**Made by Joshva for the World 🌍**

*JOSHVA - Your Personal AI Guide to India* 🇮🇳
