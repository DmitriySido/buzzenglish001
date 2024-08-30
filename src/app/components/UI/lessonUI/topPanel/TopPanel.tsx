import './topPanel.scss'
import ButtonBack from "./buttonBack/buttonBack"
import ProgressBar from "./progressBar/progressBar"

interface ProgressBarProps {
  progress: number;
}

const TopPanel = ({ progress }: ProgressBarProps) => {
  return(
    <div className="top-panel__wrapper">
      <ButtonBack/>
      <ProgressBar progress={progress}/>
    </div>
  )
}

export default TopPanel