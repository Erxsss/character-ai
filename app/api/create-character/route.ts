import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  const createdCharacter = await prisma.character.create({
    data: {
      name: body.name,
      systemPrompt: body.systemPrompt,
      picture: body.picture,
    },
  });
  return NextResponse.json(createdCharacter);
};
export const GET = async (req: Request, res: Response) => {
  const characters = await prisma.character.findMany();
  return NextResponse.json(characters);
};
