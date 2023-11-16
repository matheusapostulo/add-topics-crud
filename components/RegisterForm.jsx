'use client';

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function RegisterForm(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!name || !email || !password){
            setError("Preencha todos os campos!");
            return
        }

        try {
            const resUserExists = await fetch("api/userExists",{
                method: "POST",
                headers: {
                    "Content-type":"application/json",
                },
                body: JSON.stringify({email}),
            })

            const {user} = await resUserExists.json()

            if (user) {
                setError("Usuário já existe!")
                return
            }

            const res = await fetch('api/register',{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if(res.ok){
                const form = e.target;
                form.reset();
                router.push("/login")
            } else {
                console.log("Erro ao registrar usuário")
            }
        } catch (error) {
            console.log("Erro ao registrar usuário: ", error)
        }
    }

    return(
        <div className="grid place-items-center mt-5">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-cyan-700">
                <h1 className="text-xl font-bold my-4">Registre-se</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={(e) => setName(e.target.value)}
                        type="text" 
                        placeholder="Nome" 
                        className="input-login" 
                    />
                    <input onChange={(e) => setEmail(e.target.value)}
                        type="text" 
                        placeholder="Email" 
                        className="input-login"
                    />
                    <input onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        placeholder="Senha" 
                        className="input-login"
                    />
                    <button className="bg-cyan-700 font-bold cursor-pointer text-white px-6 py-2">
                        Registre-se
                    </button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                    )}
                    <Link className="text-sm mt-3 text-right" href={"/login"}> 
                        Já possui uma conta? <span className="underline">Entre</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}