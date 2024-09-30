import { useEffect, useState } from 'react'
import './lessonloading.scss'


const Lessonloading = () => {
  const [phrase, setPhrase] = useState<string>('')

  const PharaseList = [
    '"Как дела?" - "How are you?"', 'Уделяя всего 10 минут каждый день изучению английского языка, можно достичь больших высот!', '"Добро пожаловать" - "Welcome"', '"Который сейчас час?" - "What time is it now?"',
  ]

  function getRandomElement(arr: string[]) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  useEffect(() => {
    setPhrase(getRandomElement(PharaseList))
  },[])

  return(
    <div className='loading'>
      <div className='loading-text'>
        <p className='loading-title'>Загрузка...</p>
        <p className='loading-phrase'>{phrase}</p>
      </div>
    </div>
  )
}

export default Lessonloading