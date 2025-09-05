👨‍💻 Author

Pranshul Kumar Gera
📧 pranshulgera0508@gmail.com


---

# 🔵 Frontend README (MediSenseFrontend)

```markdown
# 💊 MediSense Frontend

This is the **frontend** for MediSense, a smart medicine assistant app.  
It provides a clean UI to interact with the backend API and AI model.

---

## 🚀 Features
- Beautiful UI built with **React + TypeScript**
- Interacts with backend via **Axios API**
- AI-powered "Ask AI" feature
- Medicines, Symptoms, and Messages dashboard
- Hosted on **Vercel**

---

## ⚙️ Tech Stack
- **React + Vite + TypeScript**
- **Axios** (for API calls)
- **Tailwind CSS** (for styling)
- Hosted on **Vercel**

---

## 📂 Project Structure


frontend/
│── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Pages (Medicines, Symptoms, Ask AI, etc.)
│ ├── api.ts # Axios API setup
│ ├── App.tsx
│── package.json
│── vite.config.ts


---

## 🔑 Environment Variables
In **Vercel dashboard → Project Settings → Environment Variables**, add:



VITE_API_URL=https://medisensebackend.onrender.com


*(Already configured in `api.ts` to point to backend)*

---

## ▶️ Run Locally
```bash
# Install dependencies
npm install

# Start dev server
npm run dev


Frontend will run on http://localhost:5173

🌍 Deployment

This frontend is deployed on Vercel:
👉 https://medisensefrontend.vercel.app

🔗 Connection with Backend

The frontend connects with the backend via api.ts:

const API = axios.create({
  baseURL: "https://medisensebackend.onrender.com",
  withCredentials: false,
});


So when you click Ask AI or manage medicines/symptoms, it calls the backend APIs.

👨‍💻 Author

Pranshul Kumar Gera
📧 pranshulgera0508@gmail.com


---

✨ Now you’ll have **two professional READMEs** — one in each repo.  
Do you want me to also **create an `example .env` file** (`.env.example`) for both repos so contributors know what to fill in?
