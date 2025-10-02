import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  chatrooms: [],
  currentChatroom: null,
  messages: {},
  isTyping: false,
  
  createChatroom: (title) => {
    const newChatroom = {
      id: Date.now().toString(),
      title: title || 'New Chat',
      createdAt: new Date().toISOString(),
      lastMessage: null,
    };
    
    set((state) => ({
      chatrooms: [newChatroom, ...state.chatrooms],
      messages: {
        ...state.messages,
        [newChatroom.id]: []
      }
    }));
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatrooms', JSON.stringify(get().chatrooms));
    }
    
    return newChatroom.id;
  },
  
  deleteChatroom: (chatroomId) => {
    set((state) => {
      const newMessages = { ...state.messages };
      delete newMessages[chatroomId];
      
      return {
        chatrooms: state.chatrooms.filter(room => room.id !== chatroomId),
        messages: newMessages,
        currentChatroom: state.currentChatroom?.id === chatroomId ? null : state.currentChatroom
      };
    });
  },
  
  setCurrentChatroom: (chatroomId) => {
    const chatroom = get().chatrooms.find(room => room.id === chatroomId);
    set({ currentChatroom: chatroom });
  },
  
  addMessage: (chatroomId, message) => {
    set((state) => {
      const chatroomMessages = state.messages[chatroomId] || [];
      const newMessage = {
        id: Date.now().toString() + Math.random(),
        ...message,
        timestamp: new Date().toISOString(),
      };
      
      const updatedChatrooms = state.chatrooms.map(room => 
        room.id === chatroomId 
          ? { ...room, lastMessage: message.text, updatedAt: new Date().toISOString() }
          : room
      );
      
      return {
        messages: {
          ...state.messages,
          [chatroomId]: [...chatroomMessages, newMessage]
        },
        chatrooms: updatedChatrooms
      };
    });
  },
  
  addAIResponse: (chatroomId, userMessage) => {
    set({ isTyping: true });
    
    const thinkingTime = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      const aiResponses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're asking. Here's what I think...",
        "Great question! Based on my knowledge, I can tell you that...",
        "I'd be happy to help you with that. Let me explain...",
        "That's a fascinating topic! Here's my perspective...",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      get().addMessage(chatroomId, {
        text: randomResponse,
        sender: 'ai',
        type: 'text'
      });
      
      set({ isTyping: false });
    }, thinkingTime);
  },
  
  getMessages: (chatroomId, page = 1, limit = 20) => {
    const allMessages = get().messages[chatroomId] || [];
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      messages: allMessages.slice(start, end),
      hasMore: end < allMessages.length,
      total: allMessages.length
    };
  },
  
  searchChatrooms: (query) => {
    const chatrooms = get().chatrooms;
    if (!query) return chatrooms;
    
    return chatrooms.filter(room => 
      room.title.toLowerCase().includes(query.toLowerCase())
    );
  },
  
  setTyping: (status) => set({ isTyping: status }),
}));

export default useChatStore;