import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";

const genAI = new GoogleGenerativeAI("AIzaSyAPF9-oQtWywKQKZxu1Kr7RFjsJMlsuGe4");
const ai = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
