import Image from 'next/image'
import './sideRightPanel.scss'
import ProgressBar from '../lessonUI/topPanel/progressBar/progressBar'
import ExperienceIcon from '../../../../../public/icons/experience-icon.png'
import { ITask } from '@/app/utils/interfaces/ITaskOfTheDay/ITaskOfTheDay'

interface ISideRightPanel {
  userExperience: number
}

const SideRightPanel = ({ userExperience = 0 }: ISideRightPanel) => {
  const tasksOfTheDay = [
    {
      taskName: 'Получите 10 очков опыта',
      progress: 10,
      maxProgress: 10,
      taskIcon: '',
      id: '001'
    },
    {
      taskName: 'Пройдите не менее 2 уроков',
      progress: 1,
      maxProgress: 2,
      taskIcon: '',
      id: '002'
    },
    {
      taskName: 'Получите 30 очков опыта',
      progress: 10,
      maxProgress: 30,
      taskIcon: '',
      id: '003'
    },
  ]

  return(
    <div className='side-right-panel'>
      <div className='side-right-panel__inner'>
        <p className='user-experience'>{`${userExperience}`} Опыта</p>
        
        <ul className='tasks-the-day__list'>
          <h3 className='task-list-title'>Задания дня</h3>
          <li className='tasks-the-day__item'>
            {
              tasksOfTheDay.map((task: ITask) => {
                return(
                  <div className='task-the-day' key={task.id}>
                    <Image
                      className='task-icon'
                      width={30}
                      height={30}
                      src={ExperienceIcon}
                      alt='Task Icon'
                    />

                    <div className='task-content'>
                      <h4 className='task-title'>{task.taskName}</h4>

                      <ProgressBar progress={task.progress} maxProgress={task.maxProgress}/>
                    </div>
                  </div>
                )
              })
            }
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideRightPanel