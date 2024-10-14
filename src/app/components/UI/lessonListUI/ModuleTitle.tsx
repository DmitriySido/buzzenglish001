import './moduleTitle.scss'

interface IModule {
  color: string,
  module: number,
  chapter: number, 
  lessonTitle: string
}

const ModuleTitle = ({ color, module, chapter, lessonTitle}: IModule) => {

  return(
    <div className='module-header'>
      {
        module !== chapter ?
        <div className='lesson-list__subtitle'>
          <h2 className='lesson-chapter-title'>{lessonTitle}</h2> 
        </div>
        : 
        <div className={`lesson-list__title ${color}`}>
          <h2 className='lesson-title__module'>Модуль: {module}, Раздел: {chapter}</h2>
          <h2 className='lesson-chapter-title'>{lessonTitle}</h2>  
        </div>
      }
    </div>
  )
}

export default ModuleTitle