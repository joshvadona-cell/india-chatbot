const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Simple in-memory chat storage
const chats = {};

// India Info Database
const indiaInfo = {
  'geography': 'India is the 7th largest country in the world with 1.4 billion people. It has 28 states and 8 union territories. The capital is New Delhi.',
  'history': 'India got independence on August 15, 1947. It was under British rule for 200 years. Mahatma Gandhi led the independence movement.',
  'culture': 'India has diverse culture with Hinduism, Buddhism, Islam, Sikhism. Diwali, Holi are major festivals. Classical dances like Bharatanatyam are famous.',
  'food': 'Indian food is world famous. Biryani, Samosa, Butter Chicken, Paneer Tikka are popular. Each region has unique cuisine.',
  'tourism': 'Taj Mahal in Agra is most famous. Other places: Jaipur, Kerala, Goa, Varanasi. India attracts millions of tourists yearly.',
  'sports': 'Cricket is most popular. India hosted Cricket World Cup. Kabaddi, Badminton, Wrestling also popular. Sachin Tendulkar is cricket legend.',
  'economy': 'India has 5th largest economy. IT industry very strong - TCS, Infosys, Wipro are big companies. Agriculture is major sector.',
  'people': 'India has 1.4 billion people. 22 official languages. Hindi and English widely spoken. Indians known for hard work and innovation.'
};

// Chat API
app.post('/api/chat', (req, res) => {
  const { message, id } = req.body;
  
  if (!message) {
    return res.json({ error: 'No message' });
  }

  // Create chat history if not exists
  if (!chats[id]) {
    chats[id] = [];
  }

  // Store user message
  chats[id].push({ role: 'user', text: message });

  // Generate AI response
  let response = 'Tell me more! Ask about: Geography, History, Culture, Food, Tourism, Sports, Economy, or People of India';
  
  const msg = message.toLowerCase();
  
  for (let key in indiaInfo) {
    if (msg.includes(key)) {
      response = indiaInfo[key];
      break;
    }
  }

  // Store AI response
  chats[id].push({ role: 'bot', text: response });

  res.json({ 
    response: response,
    id: id,
    history: chats[id]
  });
});

app.listen(5000, () => {
  console.log('\n✅ JOSHVA is running!\n');
  console.log('🌐 Open: http://localhost:5000\n');
});
