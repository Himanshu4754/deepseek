# DeepSeek Clone 🤖

A pixel-perfect, fully responsive clone of the DeepSeek AI interface. Built with **Next.js 14**, **Tailwind CSS**, and **JavaScript**, this application replicates the modern chat experience with real-time streaming responses, code syntax highlighting, and a clean dark-mode UI.

> **Live Demo:** [deepseek-iota-rosy.vercel.app/](https://deepseek-iota-rosy.vercel.app/)

## ✨ Key Features

- **⚡ Real-time AI Chat**: Seamless streaming responses with a "typing" effect.
- **🎨 Modern UI/UX**: Dark-themed, responsive design matching DeepSeek's aesthetic.
- **📝 Rich Text Support**:
  - **Markdown Parsing**: Renders bold, italics, lists, and headers.
  - **Code Highlighting**: Integrated `PrismJS` for beautiful code snippets.
- **🛠️ Chat Management**:
  - Sidebar for chat history navigation.
  - "New Chat" functionality.
  - Copy to Clipboard functionality.
- **💾 Database Integration**:
  - MongoDB integration for storing chats and user data.
- **📱 Responsive**: Optimized for both desktop and mobile views.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, JavaScript
- **Backend**: Node.js, Mongoose (MongoDB)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Local Assets & React Icons
- **Utilities**:
  - `axios`: For API requests
  - `react-markdown`: For rendering AI responses
  - `prismjs`: For syntax highlighting
  - `react-hot-toast`: For smooth notifications

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Database URL

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Himanshu4754/deepseek-clone.git](https://github.com/Himanshu4754/deepseek-clone.git)
   cd deepseek-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory.
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3000
   
   # Database Configuration
   MONGODB_URI=your_mongodb_connection_string
   
   # AI Provider Keys
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Visit `http://localhost:3000`.

## 📂 Project Structure

```bash
├── app/                # Next.js App Router pages (page.jsx)
├── assets/             # Static assets and icons
├── components/         # Reusable UI components
│   ├── ChatLabel.jsx
│   ├── Message.jsx
│   ├── PromptBox.jsx
│   └── Sidebar.jsx
├── config/             # Database configuration (db.js)
├── context/            # AppContext for global state
├── models/             # Database models (Chat.js, User.js)
├── public/             # Static files
├── .env                # Environment variables
├── package.json        # Project dependencies
└── ...
```

## 🤝 Contributing

Contributions are welcome!
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes.
4. Push to the branch and open a Pull Request.

## 👨‍💻 Author

**Himanshu Sankadiya**
- GitHub: [@Himanshu4754](https://github.com/Himanshu4754)
- LinkedIn: [Himanshu Sankadiya](https://www.linkedin.com/in/himanshu-sankadiya)

---
