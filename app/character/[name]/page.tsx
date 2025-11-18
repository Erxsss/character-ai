"use client"
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
type Character = {
  id: string;
  name: string;
  systemPrompt: string;
  picture: string;
};
const Page = () => {
  const [message, setMessage] = useState<string>("");
  const sendChat = async () => {
    const res = fetch(`/api/chat/`);
  };
  const params = useParams();
  const [char, setChar] = useState<Character[]>([]);
  console.log(params.name);
  const findCharacters = async () => {
    const charac = prisma.character.findUnique({
      where: {
        name: params.name,
      },
    });
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <div>
      <Input placeholder="Enter chat" onChange={(e) => handleInput(e)} />
    </div>
  );
};
export default Page;
