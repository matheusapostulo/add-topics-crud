import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials:{
                email: { label: "Email", type: "text", placeholder: "topics@gmail.com" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials){
                const {email, password} = credentials
                try {
                    await connectMongoDB()
                    const user = await User.findOne({email}) 

                    if(!user){
                        return null
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password)
                    
                    if(!passwordsMatch){
                        return null
                    }

                    return user

                } catch (error) {
                    console.log("Erro:", error)
                }  
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: "/login"
    },
    callbacks: {
        // As callbacks abaixo são chamadas após o authorize. authorize -> jwt -> session
        async jwt({token, user}){
            // Disparado quando é feito o login (signIn) e passa o id para o token
            if(user){
                return {
                    ...token,
                    id: user.id,
                }    
            }
            return token
        },
        async session({session, token, user}){
            // passando o id do usuário para a session
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
        }
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}