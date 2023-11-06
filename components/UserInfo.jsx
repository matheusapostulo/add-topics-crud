'use client'

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function UserInfo(){

    const {data:session} = useSession()

    return(
        <div className="shadow-lg p-4 bg-zince-300/10 flex gap-2 my-2 w-full justify-between">
            <h1 className="self-center">Boa noite, <span className="font-bold">{session?.user?.name}</span></h1>
            <button onClick={() => signOut()} className="bg-red-500 text-white font-bold rounded-md px-2 py-1">
                Sair
            </button>
        </div>
    )
}