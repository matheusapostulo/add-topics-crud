import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function GET(req){
  if (!token) {
    return NextResponse.json("Não tá logado!")
  } else {
    return NextResponse.json({name: session.user.name})
  }
}