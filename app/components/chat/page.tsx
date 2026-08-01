'use client'; // Required for useState and client-side interactivity

import React, { useState, useRef, useEffect } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';

// Define message type
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Define props interface
interface ChatProps {
  title?: string;
  initialMessages?: Message[];
  botName?: string;
  primaryColor?: string;
  onSendMessage?: (message: string) => void;
  onClose?: () => void;
}

const Chat: React.FC<ChatProps> = ({
  title = "Chat Support",
  initialMessages = [
    { id: '1', text: 'Hello! How can we help you?', sender: 'bot', timestamp: new Date() },
  ],
  botName = "Support Bot",
  primaryColor = "rgb(122,220,180)",
  onSendMessage,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (): void => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Call external handler if provided
    if (onSendMessage) {
      onSendMessage(inputMessage);
    } else {
      // Auto-reply for demo
      setIsTyping(true);
      setTimeout(() => {
        const botReply: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. Our team will get back to you shortly.",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botReply]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset unread count or other logic when opening
    }
  };

  const handleClose = (): void => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen ? (
          <button 
            className="bg-[rgb(14,194,122)] text-white hover:text-[rgb(14,194,122)] p-4 rounded-full shadow-lg hover:bg-[rgb(255,245,203)] transition-all duration-300 hover:scale-110"
            onClick={toggleChat}
            aria-label="Open chat"
          >
            <FaCommentDots size={24} />
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div 
              className="text-white p-4 flex justify-between items-center"
              style={{ backgroundColor: primaryColor }}
            >
              <h3 className="font-bold">{title}</h3>
              <button 
                onClick={handleClose}
                className="hover:bg-[rgb(100,200,160)] p-1 rounded transition"
                aria-label="Close chat"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-[rgb(122,220,180)] text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-left mb-3">
                  <div className="inline-block bg-gray-200 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="p-3 border-t bg-white">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-[rgb(122,220,180)] text-sm"
                  aria-label="Type your message"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                  disabled={!inputMessage.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;