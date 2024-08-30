'use client';

import TopPanel from "@/app/components/UI/lessonUI/topPanel/TopPanel";
import { useLessonContext } from "@/app/utils/context/LessonContext";



const Lesson2 = () => {
  const { lessons } = useLessonContext();
  console.log(lessons);

  return (
    <div className="container">
      <TopPanel progress={60} />
      <div className="lesson__wrapper">

      </div>
    </div>
  );
};

export default Lesson2;