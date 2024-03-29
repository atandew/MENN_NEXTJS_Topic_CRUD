import connectMongoDB from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await req.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request: Request, { params }) {
  const { id } = params;
  console.log("id inside =>", id);
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  console.log("topic found =>", topic);
  return NextResponse.json({ topic }, { status: 200 });
}
