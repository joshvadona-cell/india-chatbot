import React, { useState } from 'react';
import { FiPlus, FiMenu, FiX } from 'react-icons/fi';
import '../styles/Sidebar.css';

function Sidebar({ sidebarOpen, onNewChat }) {
  const [isOpen, setIsOpen] = useState(sidebarOpen);

  const categories = [
    { name: 'Geography', icon: '🗺️' },
    { name: 'History', icon: '📚' },
    { name: 'Culture', icon: '🎭' },
    { name: 'Tourism', icon: '✈️' },
    { name: 'Food', icon: '🍛' },
    { name: 'Sports', icon: '🏏' },
    { name: 'Economy', icon: '💼' },
    { name: 'People', icon: '👥' }
  ];

  const handleNewChat = () => {
    onNewChat();
  };

  return (
    <>
      <button 
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle JOSHVA menu"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>🤖 JOSHVA</h2>
          <p>India AI Guide</p>
        </div>

        <button className="new-chat-btn" onClick={handleNewChat}>
          <FiPlus /> New Chat
        </button>

        <div className="sidebar-section">
          <h3>Explore India</h3>
          <div className="categories-list">
            {categories.map((category, index) => (
              <button
                key={index}
                className="category-btn"
                title={`Learn about ${category.name}`}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <p>JOSHVA - Your AI India Guide</p>
          <small>Made with ❤️ by Joshva</small>
          <small>© 2024 JOSHVA</small>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
