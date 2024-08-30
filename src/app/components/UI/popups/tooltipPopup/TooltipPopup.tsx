'use client'

import Link from 'next/link';
import './tooltipPopup.scss';
import { forwardRef } from 'react';

interface TooltipPopupProps {
  experience: number,
  color: string,
  path: string,
  progressCount: number,
  lessonSubitle: string
}

const TooltipPopup = forwardRef<HTMLDivElement, TooltipPopupProps>(({ lessonSubitle, experience, color, path, progressCount }, ref) => {

  return (
    <div className='tooltip-popup-wrapper'>
      <div className='overlay'></div>
      <div className={`${color}-tooltip tooltip-popup`} ref={ref}>
        <h2 className='tooltip-title'>{lessonSubitle}</h2>
        <p className='tooltip-progress'>Урок {progressCount}/6</p>
        <Link href={path}>
          <button className='button-start'>Начать: + {experience} опыта</button>
        </Link>
      </div>
    </div>
  );
});

TooltipPopup.displayName = 'TooltipPopupsss';

export default TooltipPopup;