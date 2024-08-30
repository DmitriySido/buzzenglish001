import { useRouter } from 'next/navigation'
import './signButton.scss'

interface ISignButton {
  text: string,
  path: string
}

const SignButton = ({ text, path }: ISignButton) => {
  const router = useRouter()

  return <button className='signIn-button' onClick={() => router.replace('/' + path)}>{text}</button>
}

export default SignButton