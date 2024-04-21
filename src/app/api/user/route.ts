import { createReadStream, createWriteStream } from "fs";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  return NextResponse.json({ message: "GET REQUEST FIRED" });
}
export async function POST(request: NextApiRequest) {
  const data = request.body;
  
  return NextResponse.json({ message: "POST REQUEST FIRED" });
}
