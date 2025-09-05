import React, { useContext, useState, useEffect } from "react";
import {
  Scan, Mic, Shield, Bell, Activity, AlertTriangle
} from "lucide-react";
import LanguageContext from "../context/LanguageContext";
import API, { getMedicines } from "../utils/api";

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language];

  // 🔹 State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState<any[] | null>(null); // null = still loading

  // 🔹 Load medicines from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMedicines();
        setMedicines(res.data);
      } catch (err) {
        console.error("❌ Error fetching medicines", err);
        setMedicines([]); // fallback
      }
    };
    fetchData();
  }, []);

  // 🔹 AI Ask
  const askAI = async () => {
    if (!aiPrompt.trim()) return;
    setLoading(true);
    try {
      // ✅ FIXED: send { question: aiPrompt } instead of { prompt: aiPrompt }
      const res = await API.post("/api/ai/ask", { question: aiPrompt });
      setAiAnswer(res.data.answer);
    } catch {
      setAiAnswer("❌ Error contacting AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Dashboard */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            {t.home?.welcome || "Welcome to MediSense"}
          </h1>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <button
              onClick={() => onNavigate("scanner")}
              className="p-6 bg-white shadow rounded-2xl flex flex-col items-center hover:shadow-lg"
            >
              <Scan className="w-8 h-8 text-blue-600 mb-2" />
              <span>Scanner</span>
            </button>

            <button
              onClick={() => onNavigate("voice")}
              className="p-6 bg-white shadow rounded-2xl flex flex-col items-center hover:shadow-lg"
            >
              <Mic className="w-8 h-8 text-green-600 mb-2" />
              <span>Voice Assistant</span>
            </button>

            <button
              onClick={() => onNavigate("tracking")}
              className="p-6 bg-white shadow rounded-2xl flex flex-col items-center hover:shadow-lg"
            >
              <Activity className="w-8 h-8 text-purple-600 mb-2" />
              <span>Health Tracking</span>
            </button>

            <button
              onClick={() => onNavigate("reminders")}
              className="p-6 bg-white shadow rounded-2xl flex flex-col items-center hover:shadow-lg"
            >
              <Bell className="w-8 h-8 text-orange-600 mb-2" />
              <span>Reminders</span>
            </button>

            <button
              onClick={() => onNavigate("safety")}
              className="p-6 bg-white shadow rounded-2xl flex flex-col items-center hover:shadow-lg"
            >
              <Shield className="w-8 h-8 text-red-600 mb-2" />
              <span>Safety</span>
            </button>

            <button
              onClick={() => onNavigate("emergency")}
              className="p-6 bg-white shadow rounded-2xl flex flex-col items-center hover:shadow-lg"
            >
              <AlertTriangle className="w-8 h-8 text-yellow-600 mb-2" />
              <span>Emergency</span>
            </button>
          </div>

          {/* 🔹 Medicines Snapshot */}
          <div className="bg-white shadow rounded-2xl p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Your Medicines</h2>
            {medicines === null ? (
              <p className="text-gray-400 italic">Loading medicines...</p>
            ) : medicines.length > 0 ? (
              <ul className="space-y-2">
                {medicines.slice(0, 3).map((m) => (
                  <li
                    key={m.id}
                    className="flex justify-between border-b pb-2 text-gray-700"
                  >
                    <span>{m.name}</span>
                    <span className="text-sm text-gray-500">
                      {m.description}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No medicines added yet.</p>
            )}
          </div>

          {/* 🔹 AI Section */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Ask MediSense AI</h2>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ask anything about medicines..."
              className="w-full border rounded-lg p-3 text-gray-700"
            />
            <button
              onClick={askAI}
              disabled={loading}
              className="mt-3 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>
            {aiAnswer && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">AI Answer:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{aiAnswer}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
