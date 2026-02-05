# How to Run the Vigilante AI Project

This project consists of a **Next.js frontend**, a **FastAPI backend**, and a **LiveKit Voice Agent**.

## Prerequisites
- Node.js (v18+)
- Python (3.9+)
- A Groq API Key (Get it from [console.groq.com](https://console.groq.com/))
- A LiveKit Cloud Project (Get it from [livekit.io](https://livekit.io/))
- A Deepgram API Key (Get it from [deepgram.com](https://deepgram.com/))

---

## 🚀 1. Setup Backend (The Brain)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. **Setup Env**: Create or update `.env`:
   ```bash
   # d:/GITHUB/guvihclhack26/DJ/guvihack-main/backend/.env
   GROQ_API_KEY=your_groq_api_key
   # Needed for Frontend to Sync with Agent:
   LIVEKIT_URL=wss://your-project.livekit.cloud
   LIVEKIT_API_KEY=your_api_key
   LIVEKIT_API_SECRET=your_api_secret
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend server **from within the /backend folder**:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will be available at `http://127.0.0.1:8000`*

---

## 🎙️ 2. Setup Voice Agent (The Voice)

1. Navigate to the voice module directory:
   ```bash
   cd Phase3_Voice
   ```
2. **Setup Env**: Create `.env` (Use matching keys as Backend):
   ```bash
   LIVEKIT_URL=wss://your-project.livekit.cloud
   LIVEKIT_API_KEY=your_api_key
   LIVEKIT_API_SECRET=your_api_secret
   DEEPGRAM_API_KEY=your_deepgram_key
   GROQ_API_KEY=your_groq_key
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the voice agent:
   ```bash
   python agent/agent.py dev
   ```
   *The agent will connect to your LiveKit room and wait for users.*

---

## 🌐 3. Setup Frontend (The Interface)

1. Navigate to the frontend directory:
   ```bash
   cd DJI/guvihack-main/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. **Important**: Open `http://localhost:3000/console` to access the microphone securely.

---

## 🔍 Troubleshooting: "Agent Not Speaking"

1. **Check Log**: Only access via `localhost` (not IP address).
2. **Check Keys**: Ensure `backend/.env` and `Phase3_Voice/.env` have the **EXACT SAME** `LIVEKIT_URL`, `API_KEY`, and `SECRET`.
3. **Restart Backend**: If you added keys, restart the backend terminal for them to take effect.
