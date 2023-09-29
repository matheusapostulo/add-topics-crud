import Link from "next/link"

export default function Navbar () {
    return(
        <nav className="flex justify-between bg-zinc-800 px-10 py-4 items-center rounded-md">
            <Link href={"/"} className=" text-zinc-200 font-bold"> Topics WebSite </Link>
            <Link href={"/addTopic"} className="bg-zinc-800 py-2 px-4 font-bold text-zinc-50 rounded-md border-2 border-cyan-700"> Add Topic </Link>
        </nav>
    )
}