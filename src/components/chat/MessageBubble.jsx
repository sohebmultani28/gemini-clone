'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { formatTime, copyToClipboard } from '@/lib/utilstils';
import toast from 'react-hot-toast';

export default function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    const success = await copyToClipboard(message.text);
    if (success) {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy');
    }
  };

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 relative ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
        }`}
      >
        {/* Message Content */}
        {message.type === 'image' && message.image && (
          <img
            src={message.image}
            alt="Uploaded"
            className="rounded-lg mb-2 max-w-full h-auto"
          />
        )}
        
        {message.text && (
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.text}
          </p>
        )}

        {/* Timestamp */}
        <div
          className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {formatTime(message.timestamp)}
        </div>

        {/* Copy Button */}
        {showCopy && message.text && (
          <button
            onClick={handleCopy}
            className={`absolute -right-8 top-2 p-1.5 rounded-lg transition-all ${
              isUser
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}