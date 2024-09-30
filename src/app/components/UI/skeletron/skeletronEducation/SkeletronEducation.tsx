
import './skeletronEducation.scss'

import { SkeletronEducationData } from "@/app/utils/skeletronData/skeletronDataEducation";
import ModuleTitle from "../../lessonListUI/ModuleTitle";
import LessonButton from "../../lessonListUI/lessonButton/LessonButton";
import SkeletronSideRightPanel from "../skeletronSideRightPanel/SkeletronSideRightPanel";

const SkeletronEducation = () => {

  return(
    <main className='main skeletron'>
      <ul className='lesson-list'>
        {SkeletronEducationData.map((lesson, index) => {
          const showTitle = index === 0 || SkeletronEducationData[index - 1].chapter !== lesson.chapter;

          return (
            <div className='lesson-button__wrapper' key={lesson.lessonID}>
              {showTitle && (
                <ModuleTitle
                  color={lesson.color}
                  module={lesson.module}
                  chapter={lesson.chapter}
                  lessonTitle={lesson.lessonTitle}
                />
              )}
              <LessonButton
                color={lesson.color}
                lesson={lesson}
                handleLessonClick={() => {}}
              />
            </div>
          );
        })}
      </ul>

      <SkeletronSideRightPanel/>
    </main>
  )
}

export default SkeletronEducation