"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  age: number;
  hobby: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-zinc-900 dark:text-zinc-100">
          はぎもん: ユーザー一覧
        </h1>

        {loading ? (
          <p className="text-center text-xl text-zinc-600">読み込み中...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-xl text-zinc-600">
            ユーザーがいません
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {user.name}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-1">
                  年齢: {user.age}歳
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  趣味: {user.hobby}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
