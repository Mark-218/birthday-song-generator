# 🎵 Birthday Song Generator

A **full-stack application** that generates personalized birthday songs
using **AI** for lyrics and **Text-to-Speech (TTS)** for audio
playback.\
✅ **Song Playback Feature is now LIVE** with support for **male and
female voices**.

------------------------------------------------------------------------

## 📌 Features

-   ✅ **Personalized Song Generation** using OpenAI GPT API
-   ✅ **Modern Frontend** built with **React + Vite + TailwindCSS +
    TypeScript**
-   ✅ **Backend API** built with **Node.js + Express + TypeScript**
-   ✅ **TTS Integration** using [ElevenLabs API](https://elevenlabs.io)
-   ✅ **Configurable Voice Options** (Male / Female)
-   ✅ **Themes & Moods** (Happy, Romantic, Funny, EDM, etc.)
-   ✅ **Responsive UI**
-   ✅ **Audio Playback with Custom Voice**
-   ✅ **Fallback to Browser Speech if TTS API Fails**

------------------------------------------------------------------------

## 📂 Project Structure

    birthday-song-generator/
    │
    ├── frontend/        # React + Vite + Tailwind app
    │   ├── public/      # Assets (images, fonts, icons)
    │   ├── src/         # Components, pages, routes, context
    │   ├── package.json # Frontend dependencies
    │
    ├── backend/         # Node.js + Express API
    │   ├── src/         # Controllers, routes, services
    │   ├── package.json # Backend dependencies
    │
    └── README.md        # Project documentation

------------------------------------------------------------------------

## ⚙️ Setup & Installation

### **1️⃣ Clone the Repository**

``` bash
git clone https://github.com/Mark-218/birthday-song-generator.git
cd birthday-song-generator
```

------------------------------------------------------------------------

### **2️⃣ Setup Backend**

``` bash
cd backend
npm install
```

#### **Configure Environment Variables**

Create a `.env` file in `backend/` and add:

``` env
# Server Configuration
PORT=4000
CLIENT_ORIGIN=http://localhost:5173

# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=Mayur@10
DB_NAME=birthday_song_app

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# TTS Provider
TTS_PROVIDER=elevenlabs
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Voice IDs
ELEVENLABS_VOICE_ID_DEFAULT=jYMoRsZQbrEVBccBz1fa
ELEVENLABS_VOICE_ID_MALE=jYMoRsZQbrEVBccBz1fa
ELEVENLABS_VOICE_ID_FEMALE=WzsP0bfiCpSDfNgLrUuN
```

✅ **Notes:** - Replace `your_openai_api_key_here` with your **OpenAI
API key**. - Replace `your_elevenlabs_api_key_here` with your
**ElevenLabs API key**. - Set the correct **Voice IDs** from your
ElevenLabs dashboard.

#### **Run Backend**

``` bash
npm run dev
```

------------------------------------------------------------------------

### **3️⃣ Setup Frontend**

``` bash
cd ../frontend
npm install
```

#### **Configure Environment Variables**

Create `.env` file in `frontend/` and add:

``` env
VITE_API_BASE_URL=http://localhost:4000
```

#### **Run Frontend**

``` bash
npm run dev
```

------------------------------------------------------------------------

## ▶️ **How to Use**

1.  Open the app in your browser:\
    **Frontend:** `http://localhost:5173`\
    **Backend:** `http://localhost:4000`
2.  Enter user details (**name**, **gender**, **mood**, etc.)
3.  Select **Voice Type** (Male or Female)
4.  Click **Generate Song**
5.  Once the lyrics are generated, click **Play Song**:
    -   If TTS API works → **Plays MP3 in selected voice**
    -   If TTS API fails → **Fallback to browser speech synthesis**
