"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Character = {
  id: string;
  name: string;
  systemPrompt: string;
  picture: string;
};

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const router = useRouter();

  const findCharacters = async () => {
    const res = await fetch("api/create-character", { method: "GET" });
    const data = await res.json();
    setCharacters(data);
  };

  useEffect(() => {
    findCharacters();
  }, []);

  return (
    <div className="min-h-screen back flex justify-center items-start py-10">
      <div className="w-[90%] max-w-[1400px] flex flex-wrap gap-10 justify-center">
        {characters.map((char) => (
          <div
            key={char.id}
            onClick={() => router.push(`/character/${char.name}`)}
            className="w-[280px] sm:w-[320px] md:w-[350px] lg:w-[400px] bg-white border-4 border-green-600 rounded-3xl shadow-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center"
          >
            <div className="w-full flex justify-center p-4">
              <img
                src={char.picture}
                alt={char.name}
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover border-4 border-green-600"
              />
            </div>
            <div className="text-center py-4 px-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                {char.name}
              </h1>
              <p className="mt-2 text-gray-500 text-sm sm:text-base line-clamp-3">
                {char.systemPrompt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
