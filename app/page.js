import TopicsList from '@/components/TopicsList'
import Login from './login/page'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if(session) redirect("/dashboard")
  
  return (
    <>
    <div className='flex flex-col'>
      <h1 className='mt-4 font-bold text-2xl align-self-center'>Faça Login para ver seus Tópicos!</h1>
      <Login></Login>
    </div>
      
    </>
  )
}
