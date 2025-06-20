import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReputasiByRyven() {
  const [reputations, setReputations] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

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
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Reputasi by Ryven</h1>

      <div className="space-y-2">
        <Input
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Tambahkan reputasi..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={addReputation} className="w-full">
          Tambahkan Reputasi
        </Button>
      </div>

      <div className="space-y-3 pt-4">
        {reputations.length === 0 ? (
          <p className="text-center text-muted-foreground">Belum ada reputasi.</p>
        ) : (
          reputations.map((rep) => (
            <Card key={rep.id}>
              <CardContent className="p-4">
                <p className="font-semibold">{rep.name}</p>
                <p className="text-sm text-gray-600">{rep.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
