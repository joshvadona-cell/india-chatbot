import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend, FiLoader } from 'react-icons/fi';
import MessageBubble from './MessageBubble';
import '../styles/ChatContainer.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function ChatContainer({ conversationId, onConversationIdChange }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId);
    } else {
      setMessages([]);
    }
  }, [conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversation = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/chat/conversation/${id}`);
      if (response.data.success) {
        const formattedMessages = response.data.conversation.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
      setError('Failed to load conversation');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/chat/message`, {
        message: inputValue,
        conversationId: conversationId
      });

      if (response.data.success) {
        if (!conversationId) {
          onConversationIdChange(response.data.conversationId);
        }

        const assistantMessage = {
          role: 'assistant',
          content: response.data.response,
          timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>🤖 JOSHVA</h1>
        <p>Your Personal AI Guide to India</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome to JOSHVA! 👋</h2>
            <p>Your Personal AI Guide to India</p>
            <p>Ask me anything about India's:</p>
            <ul>
              <li>🗺️ Geography & Climate</li>
              <li>📚 History & Heritage</li>
              <li>🎭 Culture & Traditions</li>
              <li>✈️ Tourism & Attractions</li>
              <li>🍛 Food & Cuisine</li>
              <li>🏏 Sports & Entertainment</li>
              <li>💼 Economy & Industries</li>
              <li>👥 People & Demographics</li>
            </ul>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble
              key={index}
              role={message.role}
              content={message.content}
            />
          ))
        )}
        {isLoading && (
          <div className="loading-bubble">
            <FiLoader className="spinner" />
            <span>JOSHVA is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Ask JOSHVA anything about India..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="chat-input"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="send-button"
            title="Send message to JOSHVA"
          >
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatContainer;
