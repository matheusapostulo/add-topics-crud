"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function AddTopic () {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const {data:session} = useSession()

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const created = session.user.name
        if(!title || !description){
            /* Then change this option to be displayed on the screen */
            alert("Title and description are required");
            return;
        }

        try {
            const res = await fetch("/api/topics",{
                method: "POST",
                headers:{
                    "Content-type": "application/json",
                },
                body: JSON.stringify({created, title, description}),
            });

            if(res.ok){
                router.push('/');
                router.refresh();
            } else {
                throw new Error('Failed to create a topic!')
            }
        } catch (error) {
            console.log(error)
        }

    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col mt-7 space-y-3">
            <input
                onChange={(e) => {setTitle(e.target.value)}}
                value={title}
                className="border rounded border-zinc-950 py-3 px-4"
                type="text"
                placeholder="Topic Title"
            />

            <input
                onChange={(e) => {setDescription(e.target.value)}}
                value={description}
                className="border rounded border-zinc-950 py-3 px-4"
                type="text"
                placeholder="Topic Description"
            />

            <button type="submit" className="bg-cyan-700 text-white font-bold py-3 px-6 w-fill">
                Add Topic
            </button>

        </form>
    )
}