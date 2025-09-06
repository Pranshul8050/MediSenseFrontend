import React, { useState } from "react";
import axios from "axios";

const MedicineScanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/ai/scan`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult(res.data.answer);
    } catch (err) {
      console.error("❌ Scan error", err);
      setResult("Error scanning image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Medicine Scanner</h1>

      {/* Upload + Scan */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Scanning..." : "Scan Medicine"}
      </button>

      {result && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-indigo-700">Scan Result</h2>

          <div className="space-y-3 text-gray-700">
            {result.includes("Medicine Name:") && (
              <p>
                <span className="font-semibold">💊 Medicine Name: </span>
                {result
                  .split("Medicine Name:**")[1]
                  ?.split("**Usage:")[0]
                  ?.trim()
                  .replace(/\*/g, "")}
              </p>
            )}

            {result.includes("Usage:") && (
              <p>
                <span className="font-semibold">📌 Usage: </span>
                {result
                  .split("Usage:**")[1]
                  ?.split("**Side Effects:")[0]
                  ?.trim()
                  .replace(/\*/g, "")}
              </p>
            )}

            {result.includes("Side Effects:") && (
              <p>
                <span className="font-semibold">⚠️ Side Effects: </span>
                {result
                  .split("Side Effects:**")[1]
                  ?.split("**Precautions:")[0]
                  ?.trim()
                  .replace(/\*/g, "")}
              </p>
            )}

            {result.includes("Precautions:") && (
              <p>
                <span className="font-semibold">🔒 Precautions: </span>
                {result
                  .split("Precautions:**")[1]
                  ?.trim()
                  .replace(/\*/g, "")}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineScanner;

