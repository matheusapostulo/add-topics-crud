'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Navbar () {
    const {data:session} = useSession()

    return(
        <nav className="flex justify-between bg-zinc-800 px-10 py-4 items-center rounded-md">
            <Link href={"/"} className=" text-zinc-200 font-bold"> Topics WebSite </Link>
            <div className="flex space-x-2">
                { !session && (
                    <Link href={"/login"} className="bg-zinc-800 py-2 px-4 font-bold text-zinc-50 rounded-md border-2 border-cyan-700 hover:bg-cyan-700"> Login </Link>
                )}
                { session && (
                    <>  
                        <Link href={"/addTopic"} className="bg-zinc-800 py-2 px-4 font-bold text-zinc-50 rounded-md border-2 border-cyan-700 hover:bg-cyan-700"> Add Topic </Link>
                        <Link href={"/dashboard"} className="py-2 px-4 font-bold text-zinc-50 rounded-md border-2 bg-cyan-700 border-cyan-700 hover:bg-cyan-700"> {session?.user?.name} </Link>
                    </>
                )}

            </div>
            
        </nav>
    )
}