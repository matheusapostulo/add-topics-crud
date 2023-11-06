import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request){
    const {title, description, created} = await request.json();
    console.log("Criado por", created)
    await connectMongoDB();
    await Topic.create({created, title, description});
    return NextResponse.json({message: "Topic Created"}, {status: 201});
}

export async function GET(){
    await connectMongoDB();
    const topics = await Topic.find()
    return NextResponse.json({topics})
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id")
    await connectMongoDB();
    await Topic.findByIdAndDelete(id)
    return NextResponse.json({message: "Topic Deleted"}, {status: 200})
}