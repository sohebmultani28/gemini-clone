'use client';

import Navbar from '@/components/common/Navbar';
import ChatroomList from '@/components/dashboard/ChatroomList';

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full">
          <ChatroomList />
        </div>
      </div>
    </div>
  );
}
