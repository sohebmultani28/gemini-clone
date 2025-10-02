# Gemini Clone - AI Chat Application

## 🌐 Live Demo
https://gemini-clone-beige-tau.vercel.app/

## 📦 GitHub Repository
https://github.com/sohebmultani28/gemini-clone

## 📋 Project Overview
A fully functional, responsive AI chat application built with Next.js 15, featuring OTP authentication, chatroom management, and simulated AI messaging.

## ✨ Features Implemented

### Authentication
- OTP-based login/signup with country code selection
- Country data fetched from RestCountries API
- Form validation using React Hook Form + Zod
- Simulated OTP verification

### Dashboard
- Create and delete chatrooms
- Debounced search functionality
- Toast notifications for user actions

### Chat Interface
- Real-time chat UI with user and AI messages
- Typing indicator ("Gemini is typing...")
- Simulated AI responses with throttling
- Auto-scroll to latest message
- Image upload with preview
- Copy-to-clipboard on message hover
- Message timestamps

### Global Features
- Mobile responsive design
- Dark mode toggle
- Loading skeletons
- Keyboard accessibility
- LocalStorage data persistence

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **State Management**: Zustand
- **Form Validation**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

## 📁 Project Structure
src/
├── app/              # Next.js pages (App Router)
├── components/       # Reusable components
│   ├── auth/        # LoginForm, OTPInput
│   ├── chat/        # ChatWindow, MessageBubble, TypingIndicator
│   ├── dashboard/   # ChatroomList
│   └── common/      # Navbar, LoadingSkeleton
├── store/           # Zustand stores (auth, chat, theme)
├── hooks/           # Custom hooks (useDebounce)
└── lib/             # Utilities and validation schemas

## 🚀 Installation & Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
Open http://localhost:3000 to view the application.

📧 Submission
Completed for Kuvaka Tech Frontend Developer Assignment

Developer: Soheb Multani
Submission Date: October 2, 2025
