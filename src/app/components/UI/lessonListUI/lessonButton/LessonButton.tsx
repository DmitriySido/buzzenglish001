'use client'

import './lessonButton.scss'

import Image from "next/image"
import StarIcon from '../../../../../../public/navigationIcons/star-icon.png'
import CheckMarkIcon from '../../../../../../public/navigationIcons/check-mark-icon.png'
import React from "react"

import { ILesson } from "@/app/utils/interfaces/ILessons/ILessons"

interface ILessonButtonProps {
  color: string,
  lesson: ILesson,
  progressCount: number,
  handleLessonClick: (lesson: ILesson, event: React.MouseEvent) => void
}

const LessonButton = ({ color, lesson, progressCount, handleLessonClick } : ILessonButtonProps) => {

  return(
    <button
      className={`${color}-lesson-item lesson-item`}
      onClick={(event) => handleLessonClick(lesson, event)}
    >

      <Image className={progressCount >= 6 ? 'icon-check-mark' : 'icon-star'} src={progressCount >= 6 ? CheckMarkIcon : StarIcon} alt="Star Icon" width={80} height={80} />
    </button>
  )
}

export default LessonButton





















































// interface ILesson {
//   lessonTitle: string,
//   lessonExperience: number,
//   module: number,
//   chapter: number,
//   lessonPath: string,
//   passed: boolean,
//   progress: number,
//   color: string,
// }

// interface LessonButtonProps {
//   color: string;
//   lesson: ILesson;
//   handleLessonClick: (lesson: ILesson, event: React.MouseEvent) => void;
// }

// const LessonButton = ({ color, lesson, handleLessonClick }: LessonButtonProps) => {
//   return (
//     <button
//       className={`${color}-lesson-item lesson-item`}
//       onClick={(event) => handleLessonClick(lesson, event)}
//     >
//       <Image className='icon-star' src={StarIcon} alt='StarIcon' width={80} height={80} />
//     </button>
//   );
// };

// export default LessonButton;