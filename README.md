# 🎵 Birthday Song Generator

A **full-stack application** that generates personalized birthday songs using **AI and TTS (Text-to-Speech)**.  
Currently, **song playback functionality is pending**, but the app generates a custom birthday message and prepares the audio.

---

## 📌 Features
- ✅ **Personalized Song Generation** using AI (OpenAI API)
- ✅ **Modern Frontend** built with **React + Vite + TailwindCSS + TypeScript**
- ✅ **Backend API** built with **Node.js + Express + TypeScript**
- ✅ **Configurable Themes & Moods** (Happy, Romantic, Funny, EDM, etc.)
- ✅ **Responsive UI**
- ⚠ **Upcoming Feature:** Song Playback

---

## 📂 Project Structure
```
birthday-song-generator/
│
├── frontend/        # React + Vite + Tailwind app
│   ├── public/      # Assets (images, fonts, icons)
│   ├── src/         # Components, pages, routes
│   ├── package.json # Frontend dependencies
│
├── backend/         # Node.js + Express API
│   ├── src/         # Controllers, routes, services
│   ├── package.json # Backend dependencies
│
└── README.md        # Project documentation
```

---

## ⚙️ Setup & Installation

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/your-username/birthday-song-generator.git
cd birthday-song-generator
```

---

### **2️⃣ Setup Backend**
```bash
cd backend
npm install
```

#### **Configure Environment Variables**
Create a `.env` file in `backend/` and add:
```
PORT=4000
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_database_connection_string
```

#### **Run Backend**
```bash
npm run dev
```

---

### **3️⃣ Setup Frontend**
```bash
cd ../frontend
npm install
```

#### **Configure Environment Variables**
Create `.env` file in `frontend/` and add:
```
VITE_API_BASE_URL=http://localhost:4000
```

#### **Run Frontend**
```bash
npm run dev
```

---

## ▶️ **How to Use**
1. Open the app in your browser:  
   **Frontend:** `http://localhost:5173`  
   **Backend:** `http://localhost:4000`
2. Enter user details (name, mood, gender, etc.)
3. Click **Generate Song**
4. Song text will be generated (audio feature coming soon)

---

## ✅ Future Enhancements
- [ ] Code optimization
- [ ] Song playback feature
- [ ] TTS integration for full audio output
