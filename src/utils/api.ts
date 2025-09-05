import axios from "axios";

// 👇 Your backend runs on localhost:8080
const API = axios.create({
  baseURL: "https://medisensebackend.onrender.com", // now points to root
  withCredentials: false,
});

// =====================
// ✅ Healthcheck API
// =====================
export const checkBackend = () => API.get("/");

// =====================
// ✅ Messages API
// =====================
export const addMessage = (data: { name: string; message: string }) =>
  API.post("/api/firestore/add-message", data);

export const getMessages = () => API.get("/api/firestore/all-messages");

// ======================
// ✅ Medicines API
// ======================
export const addMedicine = (data: { name: string; description?: string; dosage?: string; frequency?: string }) =>
  API.post("/api/firestore/add-medicine", data);

export const getMedicines = () => API.get("/api/firestore/all-medicines");

// ======================
// ✅ Symptoms API
// ======================
export const addSymptom = (data: { description: string; severity: string; date: string; time: string }) =>
  API.post("/api/firestore/add-symptom", data);

export const getSymptoms = () => API.get("/api/firestore/all-symptoms");
// ======================
// ✅ AI API
// ======================
export const askAI = (question: string) =>
  API.post("/api/ai/ask", { question });


// ======================
// ✅ Default Export
// ======================
export default API;
