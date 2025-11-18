import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";
import { useState } from "react";
import { useParams } from "next/navigation";

const genAI = new GoogleGenerativeAI("");
const ai = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const POST = async (
  req: Request,
  context: { params: Promise<{ characterId: string }> }
) => {
  const body = await req.json();
  const params = useParams();
  const { characterId } = await context.params;
  const character = await prisma.character.findUnique({
    where: {
      id: characterId,
    },
  });
  const prompt = [
    {
      role: "user",
      parts: [{ text: `SYSTEM INTRODUCTION:${character?.systemPrompt}` }],
    },
    {
      role: "user",
      parts: [{ text: body.message }],
    },
  ];
  const result = await ai.generateContent({
    contents: prompt,
  });
  const reply = result.response.text();
  await prisma.message.createMany({
    data: [
      { role: "user", characterId, content: body.message },
      { role: "assistant", characterId, content: reply },
    ],
  });
};
