import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  const createdMessage = await prisma.message.create({
    data: {
      characterId: body.characterId,
      role: body.role,
      content: body.content,
    },
  });
  return NextResponse.json(createdMessage);
};
