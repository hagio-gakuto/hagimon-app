"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("fetching");
    try {
      async function fetchData() {
        const response = await fetch("http://localhost:3001");
        console.log(await response.text());
      }
      fetchData();
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      console.log("fetching completed");
    }
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>Hello World</p>
    </div>
  );
}
