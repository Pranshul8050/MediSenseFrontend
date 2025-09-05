import React, { useEffect, useState } from "react";
import { getMedicines, addMedicine } from "../utils/api";

interface Medicine {
  id?: string;
  name: string;
  description?: string;
  nextDue?: string; // optional if you want to store reminder times
}

const Reminders: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [newReminder, setNewReminder] = useState({ name: "", description: "" });

  // 🔹 Fetch medicines (reminders) from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMedicines();
        setMedicines(res.data);
      } catch (err) {
        console.error("❌ Error fetching reminders", err);
      }
    };
    fetchData();
  }, []);

  // 🔹 Add new reminder (actually stored as medicine with description)
  const handleAddReminder = async () => {
    if (!newReminder.name.trim()) return;
    try {
      const res = await addMedicine(newReminder);
      setMedicines([...medicines, { id: res.data.id, ...newReminder }]);
      setNewReminder({ name: "", description: "" });
    } catch {
      alert("❌ Error adding reminder");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reminders</h1>

      {/* 🔹 Reminder List */}
      <div className="bg-white shadow rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Active Reminders</h2>
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
          <p className="text-gray-500">No reminders added yet.</p>
        )}

        {/* Add Reminder Form */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Medicine / Task name"
            value={newReminder.name}
            onChange={(e) =>
              setNewReminder({ ...newReminder, name: e.target.value })
            }
            className="border rounded-lg px-3 py-2 flex-1"
          />
          <input
            type="text"
            placeholder="Description (e.g. 8PM daily)"
            value={newReminder.description}
            onChange={(e) =>
              setNewReminder({ ...newReminder, description: e.target.value })
            }
            className="border rounded-lg px-3 py-2 flex-1"
          />
          <button
            onClick={handleAddReminder}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
