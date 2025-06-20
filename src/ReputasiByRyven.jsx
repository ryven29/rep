import React, { useState, useEffect } from "react";
import bg from "../assets/download.jpeg";

export default function ReputasiByRyven() {
  const [reputations, setReputations] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("reputations");
    if (stored) {
      setReputations(JSON.parse(stored));
    }
  }, []);

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

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-xl mx-auto bg-white/80 shadow-lg rounded-2xl p-6 border-2 border-black">
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
        </div>

        <div className="mt-8 space-y-4">
          {reputations.length === 0 ? (
            <p className="text-center text-gray-600">Belum ada reputasi.</p>
          ) : (
            reputations.map((rep) => (
              <div
                key={rep.id}
                className="bg-white border border-black rounded-xl p-4 shadow-sm"
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
