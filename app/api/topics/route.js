import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(request){
    const session = await getServerSession(authOptions)
    if(session){
        const {title, description, created} = await request.json();
        await connectMongoDB();
        await Topic.create({created, title, description});
        return NextResponse.json({message: "Topic Created"}, {status: 201});  
    } else {
        return NextResponse.json({message: "Acesso negado! Não foi possível criar o Tópico"}, {status: 201}); 
    }  
}

export async function GET(req){
    const id = req.nextUrl.searchParams.get("id")
    await connectMongoDB();
    const topics = await Topic.find({ created: id}).exec();
    return NextResponse.json({topics})   
}

export async function DELETE(req){
    const session = await getServerSession(authOptions)
    if(session){
        console.log("Session no DELETE", session)
        const id = req.nextUrl.searchParams.get("id")
        await connectMongoDB();
        await Topic.findByIdAndDelete(id)
        return NextResponse.json({message: "Topic Deleted"}, {status: 200})
    } else {
        return NextResponse.json({message: "Acesso negado! Não foi possível criar o Tópico"}, {status: 201}); 
    }
}