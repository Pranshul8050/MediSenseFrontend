import React, { useEffect, useState } from "react";
import { getMedicines, addMedicine } from "../utils/api";

interface Medicine {
  id?: string;
  name: string;
  description?: string;
}

interface Symptom {
  id: number;
  description: string;
  severity: string;
  date: Date;
  time: string;
}

interface HealthTrackingProps {
  symptoms: Symptom[];
  setSymptoms: React.Dispatch<React.SetStateAction<Symptom[]>>;
}

const HealthTracking: React.FC<HealthTrackingProps> = ({ symptoms, setSymptoms }) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [newMedicine, setNewMedicine] = useState({ name: "", description: "" });

  // 🔹 Fetch medicines from Firestore on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMedicines();
        setMedicines(res.data);
      } catch (err) {
        console.error("❌ Error fetching medicines", err);
      }
    };
    fetchData();
  }, []);

  // 🔹 Add medicine
  const handleAddMedicine = async () => {
    if (!newMedicine.name.trim()) return;
    try {
      const res = await addMedicine(newMedicine);
      setMedicines([...medicines, { id: res.data.id, ...newMedicine }]);
      setNewMedicine({ name: "", description: "" });
    } catch {
      alert("❌ Error adding medicine");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Health Tracking</h1>

      {/* 🔹 Medicines Section */}
      <div className="bg-white shadow rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Medicines</h2>
        {medicines.length > 0 ? (
          <ul className="space-y-2">
            {medicines.map((m) => (
              <li
                key={m.id}
                className="flex justify-between border-b pb-2 text-gray-700"
              >
                <span>{m.name}</span>
                <span className="text-sm text-gray-500">{m.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No medicines added yet.</p>
        )}

        {/* Add Medicine Form */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Medicine name"
            value={newMedicine.name}
            onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
            className="border rounded-lg px-3 py-2 flex-1"
          />
          <input
            type="text"
            placeholder="Description"
            value={newMedicine.description}
            onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
            className="border rounded-lg px-3 py-2 flex-1"
          />
          <button
            onClick={handleAddMedicine}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* 🔹 Symptoms Section (still local for now) */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Symptoms</h2>
        {symptoms.length > 0 ? (
          <ul className="space-y-2">
            {symptoms.map((s) => (
              <li key={s.id} className="border-b pb-2 text-gray-700">
                <strong>{s.description}</strong> - {s.severity} <br />
                <span className="text-sm text-gray-500">
                  {s.date.toDateString()} at {s.time}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No symptoms logged.</p>
        )}
      </div>
    </div>
  );
};

export default HealthTracking;
