import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/MessageBubble.css';

function MessageBubble({ role, content }) {
  return (
    <div className={`message-bubble message-${role}`}>
      <div className="message-avatar">
        {role === 'user' ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        {role === 'user' && <span className="message-label">You</span>}
        {role === 'assistant' && <span className="message-label">JOSHVA</span>}
        {role === 'assistant' ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
