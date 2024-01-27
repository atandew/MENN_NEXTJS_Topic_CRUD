import connectMongoDB from "../../../libs/mongodb";
import Topic from "../../../models/topic";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("POST request =>", req);
  const { title, description } = await req.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json(
    { message: "Topic added succesfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
