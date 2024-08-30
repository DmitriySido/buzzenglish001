import Link from 'next/link'
import './exitLessonPopup.scss'

interface IExitLessonPopup {
  exitState: boolean,
  setExitState: (state: boolean) => void
}

const ExitLessonPopup = ({ exitState, setExitState }: IExitLessonPopup) => {

  const HandleClosePopupButton = () => setExitState(false)

  return(
    <>
      {exitState && <div className="exit-popup__overlay">
        <div className="exit-popup">
          <h2 className='exit-popup-title'>Ввесь ваш прогресс будет утерян!</h2>

          <p className='exit-popup-subtitle'>Вы уверенны, что хотите выйти?</p>
          <div className='link-list'>
            <Link className='button-exit' href='/education'>Выйти</Link>
            <Link onClick={HandleClosePopupButton} className='button-exit' href=''>Остаться</Link>
          </div>
        </div>
      </div>}
    </>
  )
}

export default ExitLessonPopup