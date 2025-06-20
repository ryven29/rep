import React, { useState, useEffect } from "react";

export default function ReputasiByRyven() {
  const [reputations, setReputations] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Load reputations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("reputations");
    if (stored) {
      setReputations(JSON.parse(stored));
    }
  }, []);

  // Save reputations to localStorage on change
  useEffect(() => {
    localStorage.setItem("reputations", JSON.stringify(reputations));
  }, [reputations]);

  const addReputation = () => {
    if (name.trim() && message.trim()) {
      setReputations([
        { id: Date.now(), name, message },
        ...reputations,
      ]);
      setName("");
      setMessage("");
    }
  };

  const clearReputations = () => {
    setReputations([]);
    localStorage.removeItem("reputations");
  };

  const exportReputations = () => {
    const blob = new Blob([JSON.stringify(reputations, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reputasi-by-ryven.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Reputasi by Ryven
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Tambahkan reputasi..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addReputation}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Tambahkan Reputasi
          </button>

          <div className="flex justify-between space-x-2">
            <button
              onClick={clearReputations}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Hapus Semua
            </button>
            <button
              onClick={exportReputations}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Ekspor JSON
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {reputations.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada reputasi.</p>
          ) : (
            reputations.map((rep) => (
              <div
                key={rep.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <p className="font-semibold text-gray-800">{rep.name}</p>
                <p className="text-sm text-gray-600">{rep.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
