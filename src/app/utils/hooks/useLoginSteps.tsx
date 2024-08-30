import { useState } from "react"

const UseLoginSteps = (initialCounter: number) => {
  const [counter, setCounter] = useState<number>(initialCounter)
  const [animate, setAnimate] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  const handleNextStep = () => {
    setAnimate(true)
    setTimeout(() => {
      setAnimate(false)
      setCounter(prevCounter => prevCounter + 1)
      setInputValue('')
    }, 500)
  }

  return { counter, animate, inputValue, setInputValue, handleNextStep }
}

export default UseLoginSteps
