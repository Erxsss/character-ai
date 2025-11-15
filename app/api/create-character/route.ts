import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  const createdCharacter = await prisma.character.create({
    data: {
      name: body.name,
      systemPrompt: body.systemPrompt,
    },
  });
  return NextResponse.json(createdCharacter);
};
