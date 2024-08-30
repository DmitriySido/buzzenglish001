import { useState } from 'react'
import ExitLessonPopup from '../../../popups/exitLessonPopup/ExitLessonPopup'
import './buttonBack.scss'

const ButtonBack = () => {
  const [exitState, setExitState] = useState<boolean>(false)

  const handleExitButton = () => setExitState(true)


  return(
    <div>
      <button onClick={handleExitButton} type='button' className='button-to-back'>Выйти</button>

      <ExitLessonPopup exitState={exitState} setExitState={setExitState}/>
    </div>
  )

}

export default ButtonBack