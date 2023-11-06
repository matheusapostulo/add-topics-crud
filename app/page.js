import TopicsList from '@/components/TopicsList'
import Login from './login/page'

export default function Home() {
  return (
    <>
    <div className='flex flex-col'>
      <h1 className='mt-4 font-bold text-2xl align-self-center'>Faça Login para ver seus Tópicos!</h1>
      <Login></Login>
    </div>
      
    </>
  )
}
