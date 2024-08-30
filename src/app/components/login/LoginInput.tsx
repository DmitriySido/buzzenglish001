import './loginInput.scss'

const LoginInput = ({ loginStep }: any) => {

  return(
    <input className='login-input' type="text" name="UserName" placeholder={loginStep.placeholder}/>
  )
}

export default LoginInput