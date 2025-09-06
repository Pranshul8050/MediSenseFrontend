import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8080", 
  withCredentials: false,
});

export const scanMedicine = (formData: FormData) =>
  API.post("/api/ai/scan", formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
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

export default API;

