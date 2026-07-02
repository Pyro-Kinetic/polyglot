<div align="center">

# Polyglot 🌍

<img src="./frontend/src/assets/logo.png" alt="Polyglot Branding" width="140" />

<p>
  Polyglot is a lightweight AI-powered translation web app built with React, TypeScript, Express, and OpenAI.
</p>

<a href="https://polyglot-static.onrender.com/" target="_blank" rel="noopener noreferrer">
  <img
    src="https://img.shields.io/badge/Polyglot-Live%20Demo-FFD23F?style=for-the-badge&logo=googlechrome&logoColor=1e293b&labelColor=FF6F7D"
    alt="Live Demo"
  />
</a>

</div>

## ✨ Features

- Welcome screen with Polyglot branding
- “Get Started” button
- Translate text into English, Spanish, French, or Japanese
- Chat-like translation history
- Press Enter to submit and Shift + Enter for multiline text
- Draggable language greeting elements like “Hello,” “¡Hola!,” “Bonjour,” and “こんにちは”
- Auto-scrolls to the latest translation
- Client-side validation for empty input
- Error messages for failed translation requests
- Home button to return to the welcome screen

## 🧠 How It Works

The frontend sends the user’s text and selected target language to the backend. The backend sanitizes the request, applies rate limiting, sends the request to OpenAI, and returns the translated result to the frontend.

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- TypeScript
- OpenAI API
- CORS
- Express Rate Limit

## 🔌 API Endpoints

- `GET /health`
- `POST /translate`

### `POST /translate` example request

```json
{
  "userPrompt": "Hello, how are you today?",
  "targetLanguage": "Japanese"
}
```

### `POST /translate` example response

```json
{
  "message": [
    {
      "input": "Hello, how are you today?",
      "output": "こんにちは、お元気ですか？"
    }
  ]
}
```

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Clone the repository

```bash
git clone <your-repository-url>
cd polyglot
```

### Install frontend dependencies

```bash
cd frontend
npm install
```

### Install backend dependencies

```bash
cd ../backend
npm install
```

## 🔐 Environment Variables

Create `.env` files in both `backend` and `frontend` directories.

### Backend `.env` example

```env
OPENAI_API_KEY=your_openai_api_key
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173,https://polyglot-static.onrender.com
```

### Frontend `.env` example

```env
VITE_API_BASE_URL=http://localhost:5000
```

## ▶️ Running Locally

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

## 📁 Project Structure

```text
polyglot/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── App.tsx                # Main UI flow (welcome screen, translator, history)
│   │   ├── config/
│   │   │   ├── deploy.config.ts       # Frontend deploy/runtime settings
│   │   │   └── endpoints.config.ts    # API endpoint definitions used by the client
│   │   ├── utils/
│   │   │   └── requests.ts            # HTTP request helpers for backend communication
│   │   └── index.css                  # Global styles and Polyglot UI theme
│   ├── public/                        # Static assets served as-is
│   └── dist/                          # Production build output
├── backend/
│   ├── src/
│   │   ├── app.ts                     # Express app setup, middleware, and route registration
│   │   ├── controllers/
│   │   │   └── translate.controllers.ts # Translation endpoint logic and OpenAI integration
│   │   └── middleware/
│   │       ├── sanitize.middleware.ts # Request input sanitization and validation hardening
│   │       └── rateLimiter.middleware.ts # API rate limiting to protect backend resources
│   └── dist/                          # Compiled backend output
└── README.md
```

## 🛡️ Backend Protections

- Request sanitization middleware
- Rate limiting
- CORS configuration
- Error handling for missing input, unknown endpoints, and server failures

## 🔮 Future Improvements

- Add support for more languages
- Add copy-to-clipboard functionality
- Save translation history
- Add user authentication
- Add loading animations
- Improve accessibility
- Add tests