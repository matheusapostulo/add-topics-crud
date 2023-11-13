import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getTopics = async (idUser) => {
    const apiUrl = process.env.API_URL;
    try{
        const res = await fetch(`${apiUrl}/api/topics?id=${idUser}`, {
            cache: "no-store",      
        });

        if(!res.ok){
            throw new Error("Failed to fetch topics")
        }

        return res.json()

    } catch (error) {
        console.log("Erro ao carregar tópicos: ", error)
    }
}

export default async function TopicsList () {
    const session = await getServerSession(authOptions)
    const idUser = session.user.id
    try {
        const {topics} = await getTopics(idUser);
        if(topics){
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
        } else {
            return(
                <h1>Falha em obter tópicos!</h1>
            )        
        }
    } catch (error) {
        console.log("Erro ao buscar tópicos:", error)
    }   
}