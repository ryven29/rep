import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nnbpuxxokollpmkkfvhl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uYnB1eHhva29sbHBta2tmdmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MDQ3OTYsImV4cCI6MjA2NTk4MDc5Nn0.41ltW82Gdv0lYXyx7KmTKblH0ehe9pDUHLcSXTci1sM"
);

export default function ReputasiByRyven() {
  const [reputations, setReputations] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchReputations();
  }, []);

  const fetchReputations = async () => {
    const { data, error } = await supabase
      .from("reputations")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) {
      setReputations(data);
    }
  };

  const addReputation = async () => {
    if (name.trim() && message.trim() && rating > 0) {
      const { error } = await supabase.from("reputations").insert([
        { name, message, rating },
      ]);
      if (!error) {
        fetchReputations();
        setName("");
        setMessage("");
        setRating(0);
      }
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

  const users = Array.from(new Set(reputations.map(rep => rep.name)));
  const reputationsByUser = selectedUser
    ? reputations.filter(rep => rep.name === selectedUser)
    : reputations;

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(https://files.catbox.moe/v6uiyz.jpeg)` }}
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

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2 text-center">Lihat Reputasi per Pengguna</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <button
              onClick={() => setSelectedUser(null)}
              className={`px-3 py-1 rounded-full border ${selectedUser === null ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
            >
              Semua
            </button>
            {users.map(user => (
              <button
                key={user}
                onClick={() => setSelectedUser(user)}
                className={`px-3 py-1 rounded-full border ${selectedUser === user ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
              >
                {user}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {reputationsByUser.length === 0 ? (
              <p className="text-center text-gray-600">Belum ada reputasi.</p>
            ) : (
              reputationsByUser.map((rep) => (
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
    </div>
  );
}
