"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestPage() {
  const [quests, setQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("quests").select("*");

      if (error) {
        console.error("❌ Supabase Error:", error.message);
      } else {
        console.log("✅ Quests:", data);
        setQuests(data);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">🪐 퀘스트 목록</h1>
      {quests.length === 0 ? (
        <p className="mt-4 text-gray-500">등록된 퀘스트가 없습니다.</p>
      ) : (
        <ul className="list-disc pl-6 mt-4">
          {quests.map((q) => (
            <li key={q.id}>
              {q.title} — {q.date} [{q.is_completed ? "완료" : "진행 중"}]
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
