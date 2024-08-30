'use client'

import './ProfileIcon.scss'
import Image, { StaticImageData } from "next/image"

interface IProfileIcon {
  bodyIcon: string | StaticImageData;
  eyeIcon: string | StaticImageData;
}

const ProfileIcon = ({ bodyIcon, eyeIcon }: IProfileIcon) => {
  return (
    <div className='side-navigation-icon profile-icon__wrapper'>
      <Image
        className='profile-icon-body'
        src={typeof bodyIcon === 'string' ? bodyIcon : (bodyIcon as StaticImageData)}
        width={30}
        height={30}
        alt={'Тело'}
      />
      <Image
        className='profile-icon-eye'
        src={typeof eyeIcon === 'string' ? eyeIcon : (eyeIcon as StaticImageData)}
        width={30}
        height={30}
        alt={'Глаза'}
      />
    </div>
  )
}

export default ProfileIcon;