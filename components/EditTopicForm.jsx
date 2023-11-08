"use client";

import { useState } from "react"
import {useRouter} from "next/navigation"

export default function EditTopicForm ({id, title, description}) {
    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)
    
    const router = useRouter();

    console.log("esse é o novo title: ", newTitle)
    console.log("esse é a nova Description: ", newDescription)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/topics/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({newTitle, newDescription}),
            });

            if(!res.ok){
                throw new Error("Failed to update topic")
            }

            router.refresh()
            router.push("/")

        } catch (error) {
            console.log("deu ruim",error)
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col mt-7 space-y-3">
            <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                className="border rounded border-zinc-950 py-3 px-4"
                type="text"
                placeholder="Edit Title"
            />

            <input
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}    
                className="border rounded border-zinc-950 py-3 px-4"
                type="text"
                placeholder="Edit Description"
            />

            <button type="submit" className="bg-cyan-700 text-white font-bold py-3 px-6 w-fill">
                Update Topic
            </button>

        </form>
    )
}