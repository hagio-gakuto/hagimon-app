"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      console.log("fetching");
      const response = await fetch("http://localhost:3001");
      setData(await response.text());
    }
    fetchData();
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p className="text-2xl font-bold">Hello World</p>
      <p className="text-2xl font-bold">{data}</p>
    </div>
  );
}
