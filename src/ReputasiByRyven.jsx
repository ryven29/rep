import React, { useState, useEffect } from "react";

export default function ReputasiByRyven() {
  const [reputations, setReputations] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

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
    if (name.trim() && message.trim() && rating > 0) {
      setReputations([
        { id: Date.now(), name, message, rating },
        ...reputations,
      ]);
      setName("");
      setMessage("");
      setRating(0);
    }
  };

  const Star = ({ filled, onClick }) => (
    <span
      onClick={onClick}
      className={`cursor-pointer text-2xl ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    >
      ★
    </span>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(https://files.catbox.moe/1nw19y.jpg)` }}
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
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} filled={i <= rating} onClick={() => setRating(i)} />
            ))}
          </div>
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
                <div className="text-yellow-400 text-lg">
                  {"★".repeat(rep.rating)}{"☆".repeat(5 - rep.rating)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
