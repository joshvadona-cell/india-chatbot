const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// DATABASE CONNECTION
// ============================================

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/joshva', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected')).catch(err => console.log('❌ DB Error:', err));

// ============================================
// CHAT MODEL
// ============================================

const chatSchema = new mongoose.Schema({
  messages: [
    {
      role: { type: String, enum: ['user', 'assistant'], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

// ============================================
// INDIA DATA (In-Memory)
// ============================================

const indiaData = {
  geography: {
    title: 'Geography of India',
    content: 'India is the 7th largest country by area (3.28 million km²) and 2nd most populous with 1.4+ billion people. It has 28 states and 8 union territories. Major geographic features include the Himalayas, Western Ghats, Eastern Ghats, Thar Desert, and the Deccan Plateau.'
  },
  history: {
    title: 'History of India',
    content: 'India has one of the oldest civilizations dating back to 2500 BCE. It has witnessed various empires including Maurya, Gupta, Mughal, and British. India gained independence on August 15, 1947, led by Mahatma Gandhi.'
  },
  culture: {
    title: 'Indian Culture',
    content: 'India has a diverse culture with multiple religions - Hinduism, Buddhism, Jainism, Islam, Sikhism, and Christianity. Major festivals include Diwali, Holi, Eid, Christmas, and Pongal. Indian classical arts include Bharatanatyam, Kathak, and Kathakali.'
  },
  food: {
    title: 'Indian Food',
    content: 'Indian cuisine is world-famous with diverse flavors. Major dishes include Biryani, Masala Dosa, Samosa, Butter Chicken, and Paneer Tikka. Each region has unique cuisines - North Indian, South Indian, East Indian, and West Indian.'
  },
  tourism: {
    title: 'Indian Tourism',
    content: 'Major tourist destinations include Taj Mahal (Agra), Jaipur Pink City, Kerala Backwaters, Goa beaches, and Statue of Unity in Vadodara. India attracts over 10 million tourists annually and is one of the world\'s top destinations.'
  },
  sports: {
    title: 'Sports in India',
    content: 'Cricket is the most popular sport. India has hosted Cricket World Cup and won it in 1983 and 2011. Other sports include Field Hockey (national sport), Badminton, Kabaddi, and Wrestling. Indian athletes have won medals in Olympics.'
  },
  economy: {
    title: 'Indian Economy',
    content: 'India has the 5th largest economy globally and fastest growing major economy. Major industries include IT (Bangalore Silicon Valley), Agriculture, Manufacturing, and Services. India is a leading IT outsourcing hub with companies like TCS, Infosys, and Wipro.'
  },
  people: {
    title: 'Indian People',
    content: 'India is home to 1.4+ billion people, making it the most populous country. It has 22 official languages, with Hindi and English widely spoken. Indians are known for their diversity, resilience, and entrepreneurial spirit. India celebrates Unity in Diversity.'
  }
};

// ============================================
// SIMPLE AI RESPONSE GENERATOR
// ============================================

function generateJoshvaResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  const responses = {
    'geography': indiaData.geography.content,
    'history': indiaData.history.content,
    'culture': indiaData.culture.content,
    'food': indiaData.food.content,
    'cuisine': indiaData.food.content,
    'tourism': indiaData.tourism.content,
    'tourist': indiaData.tourism.content,
    'sports': indiaData.sports.content,
    'cricket': indiaData.sports.content,
    'economy': indiaData.economy.content,
    'business': indiaData.economy.content,
    'people': indiaData.people.content,
    'population': indiaData.people.content,
  };

  for (let key in responses) {
    if (msg.includes(key)) {
      return `🇮🇳 **JOSHVA's Answer:**\n\n${responses[key]}\n\n*Ask me more about India!*`;
    }
  }

  if (msg.includes('hello') || msg.includes('hi')) {
    return '👋 **JOSHVA here!** Your personal AI guide to India 🇮🇳\n\nI can tell you about:\n🗺️ Geography\n📚 History\n🎭 Culture\n🍛 Food\n✈️ Tourism\n🏏 Sports\n💼 Economy\n👥 People\n\nWhat would you like to know?';
  }

  if (msg.includes('thank')) {
    return '🙏 You\'re welcome! Always happy to help you learn about India 🇮🇳';
  }

  return '🤔 That\'s a great question! I\'m JOSHVA, your India guide. Try asking me about:\n- Geography of India\n- Indian History\n- Indian Culture\n- Indian Food\n- Tourism in India\n- Sports in India\n- Indian Economy\n- Indian People';
}

// ============================================
// API ROUTES
// ============================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: '🤖 JOSHVA is running!' });
});

// Send Message
app.post('/api/chat/message', async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message cannot be empty' });
    }

    // Generate response
    const assistantResponse = generateJoshvaResponse(message);

    // Save to database
    let conversation;
    if (conversationId) {
      conversation = await Chat.findByIdAndUpdate(
        conversationId,
        {
          $push: {
            messages: [
              { role: 'user', content: message },
              { role: 'assistant', content: assistantResponse }
            ]
          }
        },
        { new: true }
      );
    } else {
      conversation = new Chat({
        messages: [
          { role: 'user', content: message },
          { role: 'assistant', content: assistantResponse }
        ]
      });
      await conversation.save();
    }

    res.json({
      success: true,
      conversationId: conversation._id,
      response: assistantResponse
    });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ success: false, message: 'Error processing message' });
  }
});

// Get Conversation
app.get('/api/chat/conversation/:id', async (req, res) => {
  try {
    const conversation = await Chat.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }
    res.json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving conversation' });
  }
});

// ============================================
// SERVE FRONTEND
// ============================================

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`\n🤖 JOSHVA Server is running!\n`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
  console.log(`📝 API: http://localhost:${PORT}/api/health\n`);
});