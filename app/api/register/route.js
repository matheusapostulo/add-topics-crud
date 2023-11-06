import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectMongoDB from "@/libs/mongodb"
import User from "@/models/user"

export async function POST(req){
    console.log("Chegando req")
    try {
        const {name, email, password} = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(name,email,password)

        await connectMongoDB();

        await User.create({name, email, password:hashedPassword})

        return NextResponse.json({message: "Usuário registrado!"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Ocorreu um erro ao registrar o usuário!"}, {status: 500})
    }
}