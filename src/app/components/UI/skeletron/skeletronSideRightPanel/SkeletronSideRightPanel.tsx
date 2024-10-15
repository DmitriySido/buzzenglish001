
import './skeletronSideRightPanel.scss'

import { ITask } from '@/app/utils/interfaces/ITaskOfTheDay/ITaskOfTheDay'
import { SkeletronDataTasksOfTheDay } from '@/app/utils/skeletronData/skeletronDataTaskOfTheDay'
import ProgressBar from '../../lessonUI/topPanel/progressBar/progressBar'

const SkeletronSideRightPanel = () => {

  return(
    <div className='skeletron side-right-panel'>
      <div className='side-right-panel__inner'>
        <p className='user-experience'>0 Опыта</p>

        <ul className='tasks-the-day__list'>
          <h3 className='task-list-title'>Задания дня</h3>
          <li className='tasks-the-day__item'>
            {
              SkeletronDataTasksOfTheDay.map((task: ITask) => {
                return(
                  <div className='task-the-day' key={task.id}>
                    <div className='task-icon'></div>

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

export default SkeletronSideRightPanel