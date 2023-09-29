"use client";

import {HiOutlineTrash} from "react-icons/hi"
import { useRouter } from "next/navigation";


export default function RemoveBtn ({id}) {
    const router = useRouter();
    const removeTopic = async() => {
        const confirmed = confirm("Are you sure?");

        if(confirmed){
            const res = await fetch(`/api/topics?id=${id}`,{
                method:"DELETE",
            });

            if(res.ok){
                console.log("essa é a res",res)
                router.refresh()
            }
        }
        
    }

    return(
        <button onClick={removeTopic} className="text-red-500">
            <HiOutlineTrash size={24}/>
        </button>
    )
}