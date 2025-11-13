'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Heart, User, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  isDark?: boolean;
}

export default function Chatbot({ isDark = false }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 💕 I\'m LoveBot, your AI assistant for \'s wedding celebration. How can I help you with the wedding details?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const callGeminiAPI = async (prompt: string): Promise<string> => {
    // Use the GEMINI_API_KEY from environment variables
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    console.log('LoveBot Debug: API Key exists:', !!GEMINI_API_KEY);
    console.log('LoveBot Debug: API Key value:', GEMINI_API_KEY ? 'Present' : 'Missing');
    console.log('LoveBot Debug: User prompt:', prompt);

    if (!GEMINI_API_KEY) {
      console.log('LoveBot Debug: No API key found, returning fallback message');
      return 'Sorry, the AI assistant is not configured yet. Please contact the wedding organizers for assistance.';
    }

    try {
      console.log('LoveBot Debug: Initializing GoogleGenerativeAI...');
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      console.log('LoveBot Debug: Creating model with gemini-pro...');
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      console.log('LoveBot Debug: Model created successfully, generating content...');

      const systemPrompt = `You are LoveBot, an AI assistant for 's wedding celebration website.

Wedding Details:
- Couple: Rashmi and Deepankar
- Wedding Date: November 23, 2025
- Venue: Gymkhana Club, Sector-8, Karnal, Haryana
- Time: 11:00 AM onwards
- Rashmi's best Friend - Akriti
- Who created this website - Anubhav
- Friends of Rashmi - Charanya and Rachita
- Dress Code: Evening Elegance - Join us in your finest attire to celebrate this magical evening. Think cocktail dresses, elegant suits, and a touch of romance in your style.
- Theme: Romantic celebration with love, joy, and beautiful memories

Requirements:
- Be friendly, romantic, and celebratory in tone
- Focus on Wedding details, RSVPs, event information, and romantic well-wishes
- Keep responses warm and festive
- Help with questions about the ceremony, venue, timeline, and celebration
- Encourage RSVPs and sharing of well-wishes
- Only return the response text without any explanations or formatting
- Maintain a supportive, loving tone suitable for guests and well-wishers

User query: ${prompt}`;

      console.log('LoveBot Debug: System prompt created, making API call...');
      console.log('LoveBot Debug: System prompt length:', systemPrompt.length);

      const result = await model.generateContent(systemPrompt);
      console.log('LoveBot Debug: API call successful, processing response...');

      const response = result.response;
      const botResponse = response.text();
      console.log('LoveBot Debug: Response received, trimming...');
      console.log('LoveBot Debug: Raw response:', botResponse);

      const trimmedResponse = botResponse.trim();
      console.log('LoveBot Debug: Final response:', trimmedResponse);

      return trimmedResponse;
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'Sorry, I\'m having trouble connecting right now. Please try again later or contact Rashmi and Deepankar directly!';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    console.log('LoveBot Debug: handleSendMessage called with input:', inputMessage);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    console.log('LoveBot Debug: Adding user message to chat');
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      console.log('LoveBot Debug: Calling callGeminiAPI...');
      const botResponse = await callGeminiAPI(inputMessage);
      console.log('LoveBot Debug: Received bot response:', botResponse);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      console.log('LoveBot Debug: Adding bot message to chat');
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('LoveBot Debug: Error in handleSendMessage:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble responding right now. Please try again later. 💕',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      console.log('LoveBot Debug: Setting isTyping to false');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        {/* Close Arrow - Only show when chat is open */}
        {isOpen && (
          <motion.button
            className={`w-8 h-8 rounded-full shadow-lg backdrop-blur-md border transition-all duration-300 ${
              isDark
                ? 'bg-secondary/90 border-secondary/50 text-secondary-foreground hover:bg-secondary'
                : 'bg-background/90 border-border/50 text-foreground hover:bg-accent'
            }`}
            onClick={() => setIsOpen(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              rotate: 180,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            aria-label="Close LoveBot chat"
          >
            <X className="w-4 h-4 mx-auto" aria-hidden="true" />
          </motion.button>
        )}

        {/* Main Chat Button */}
        <motion.button
          className={`w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 border-2 border-background/30 relative overflow-hidden group ${
            isOpen ? 'scale-0' : 'scale-100'
          }`}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false); // Reset minimized state when opening
          }}
          aria-label="Open LoveBot wedding assistant"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4), 0 0 20px rgba(236, 72, 153, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-30 rounded-full blur-md transition-opacity duration-300"></div>

        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 border-2 border-orange-400/50 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

          <Heart className="w-8 h-8 text-white mx-auto relative z-10 fill-current" />

          {/* Notification dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-background"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-20 right-6 z-50 bg-gradient-to-br from-background via-orange-500/5 to-pink-500/5 backdrop-blur-lg shadow-2xl border border-orange-200/30 overflow-hidden ${
              isMinimized ? 'w-80 h-16 rounded-2xl' : 'w-80 h-96 flex flex-col rounded-t-2xl'
            }`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? 64 : 384
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 flex items-center justify-between relative overflow-hidden flex-shrink-0">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full -translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-white/10 rounded-full translate-x-6 translate-y-6"></div>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart className="w-6 h-6 text-white fill-current" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-base flex items-center gap-2">
                    LoveBot
                    <motion.span
                      className="w-2 h-2 bg-pink-300 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </h3>
                  <p className="text-white/90 text-xs">Your Wedding Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                {/* Minimize Button */}
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 border border-white/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ rotate: isMinimized ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Minimize2 className="w-4 h-4 text-white" />
                </motion.button>

                {/* Close Button */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 border border-white/30"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <motion.div
              className={`overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background/30 to-secondary/10 ${
                isMinimized ? 'h-0 opacity-0' : 'flex-1 opacity-100'
              }`}
              animate={{
                opacity: isMinimized ? 0 : 1,
                height: isMinimized ? 0 : 'auto'
              }}
              transition={{ duration: 0.3 }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border border-orange-400/50'
                        : 'bg-card text-card-foreground border border-border'
                    }`}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${
                      message.sender === 'user' ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Heart className="w-4 h-4 text-orange-500 fill-current" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === 'user' ? 'You' : 'LoveBot'}
                      </span>
                    </div>
                    <p className={`leading-relaxed ${
                      message.sender === 'user' ? 'text-white' : 'text-card-foreground'
                    }`}>{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-card border border-border px-4 py-3 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-orange-500 fill-current" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </motion.div>

            {/* Input */}
            <div
              className={`p-4 border-t border-border bg-muted/30 flex-shrink-0 ${
                isMinimized ? 'hidden' : 'block'
              }`}
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about the wedding, RSVP, or send wishes..."
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-foreground placeholder-muted-foreground text-sm shadow-sm"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/50 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                <span className="inline-flex items-center gap-1">
                  <Heart className="w-3 h-3 text-orange-500 fill-current animate-pulse" />
                  Powered by Love • Ask about 's celebration
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
