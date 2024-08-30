import './createButtonAccount.scss'

import { useRouter } from "next/navigation"

interface IButton {
  text: string
}

const CreateAccountButton = ({ text }:IButton) => {
  const router = useRouter()
  return (
    <button className='create-account-button' onClick={() => router.replace('/')}>{text}</button>
  )
}

export default CreateAccountButton