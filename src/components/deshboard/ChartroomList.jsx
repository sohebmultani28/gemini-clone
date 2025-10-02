'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useChatStore from '@/store/chatStore';
import { Plus, Search, Trash2, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import useDebounce from '@/hooks/useDebounce';
import { formatTime, formatDate, truncateText } from '@/lib/utils';

export default function ChatroomList() {
  const router = useRouter();
  const { chatrooms, createChatroom, deleteChatroom, searchChatrooms } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');

  const debouncedSearch = useDebounce(searchQuery, 500);
  const filteredChatrooms = searchChatrooms(debouncedSearch);

  const handleCreateChatroom = () => {
    if (!newChatTitle.trim()) {
      toast.error('Please enter a chat title');
      return;
    }

    const chatroomId = createChatroom(newChatTitle);
    toast.success('Chatroom created successfully!');
    setShowNewChatModal(false);
    setNewChatTitle('');
    router.push(`/chat/${chatroomId}`);
  };

  const handleDeleteChatroom = (e, chatroomId, title) => {
    e.stopPropagation();
    
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteChatroom(chatroomId);
      toast.success('Chatroom deleted successfully!');
    }
  };

  const handleChatroomClick = (chatroomId) => {
    router.push(`/chat/${chatroomId}`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Chats
          </h1>
          <button
            onClick={() => setShowNewChatModal(true)}
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Chatroom List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChatrooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <MessageSquare className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No chats yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a new chat to get started
            </p>
            <button
              onClick={() => setShowNewChatModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Create New Chat
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredChatrooms.map((chatroom) => (
              <div
                key={chatroom.id}
                onClick={() => handleChatroomClick(chatroom.id)}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                      {chatroom.title}
                    </h3>
                    {chatroom.lastMessage && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {truncateText(chatroom.lastMessage, 50)}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {formatDate(chatroom.createdAt)} • {formatTime(chatroom.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteChatroom(e, chatroom.id, chatroom.title)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Create New Chat
            </h2>
            <input
              type="text"
              placeholder="Enter chat title..."
              value={newChatTitle}
              onChange={(e) => setNewChatTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateChatroom()}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNewChatModal(false);
                  setNewChatTitle('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChatroom}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}