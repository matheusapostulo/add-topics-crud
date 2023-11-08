import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { useSession } from "next-auth/react";

const getTopics = async () => {
    const apiUrl = process.env.API_URL;

    try{
        const res = await fetch(`${apiUrl}/api/topics`, {
            cache: "no-store",
        });

        if(!res.ok){
            throw new Error("Failed to fetch topics")
        }

        return res.json();

    } catch (error) {
        console.log("Error loading topics: ", error)
    }
}

export default async function TopicsList () {
    const {topics} = await getTopics();
    console.log("Esse é topic:", topics)

    return(
        <>
            {topics && (
                topics.map((t) => (
                <div className="flex justify-between border border-zinc-950 rounded-md my-4 p-3" key={t._id}>
                    <div className="">
                        <h2 className="font-bold text-3xl mb-1">{t.title}</h2>
                        <p>{t.description}</p>
                    </div>

                    <div className="flex self-start gap-5">
                        <RemoveBtn id={t._id}/>
                        <Link href={`/editTopic/${t._id}`}> 
                            <HiPencilAlt size={24}/>
                        </Link>
                    </div>
                </div>
            )))}
       
        </>
    )
}