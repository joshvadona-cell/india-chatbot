const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-ratelimit');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests to JOSHVA, please try again later'
});

app.use(limiter);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/joshva-chatbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ JOSHVA Database Connected'))
.catch(err => console.log('❌ JOSHVA Database Connection Error:', err));

// Routes
app.use('/api/chat', require('./routes/chat'));
app.use('/api/india', require('./routes/india'));
app.use('/api/health', require('./routes/health'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('JOSHVA Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'JOSHVA endpoint not found'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🤖 JOSHVA Server running on http://localhost:${PORT}`);
  console.log(`📱 Visit http://localhost:3000 to chat with JOSHVA`);
});

module.exports = app;
