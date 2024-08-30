'use client'

import { usePathname } from 'next/navigation';
import './sideNavigation.scss'
import IconEducation from '../../../../../public/navigationIcons/education-icon.svg'
import IconShop from '../../../../../public/navigationIcons/shop-icon.svg'
import IconMore from '../../../../../public/navigationIcons/more-icon.svg'
import DefaultBodyIcon from '../../../../../public/customAvatar/body/body1-blue.png';
import DefaultEyeIcon from '../../../../../public/customAvatar/eyes/eyes1-blue.png';

import Link from "next/link";
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import ProfileIcon from './profileIcon/ProfileIcon';

interface IProfileIcon {
  bodyIcon: string | StaticImageData;
  eyeIcon: string | StaticImageData;
}

const SideNavigation = () => {
  const [avatarState, setAvatarState] = useState<IProfileIcon | null>(null);

  useEffect(() => {
    const avatar = localStorage.getItem('avatar');
    if (avatar) {
      const data = JSON.parse(avatar);
      setAvatarState({ 
        bodyIcon: data.body, 
        eyeIcon: data.eye 
      });
    }
  }, []);

  const pathname = usePathname();

  const navigationLinks = [
    { title: 'Обучение', path: '/education', id: 1, icon: IconEducation },
    { title: 'Профиль', path: '/profile', id: 2, icon: avatarState?.bodyIcon || DefaultBodyIcon, icon2: avatarState?.eyeIcon || DefaultEyeIcon },
    { title: 'Магазин', path: '/shop', id: 3, icon: IconShop },
    { title: 'Настройки', path: '/settings', id: 4, icon: IconMore },
  ];

  return (
    <nav className="side-navigation">
      <ul className="navigation-list">
        <div className='logo__wrapper'>
          <Link className='logo' href={'/education'}>BuzzEnglish</Link>
        </div>
        {navigationLinks.map((link) => {
          const isActive = pathname === link.path;

          return (
            <li className="side-navigation-item" key={link.id}>
              <Link href={link.path} className={`side-navigation-link ${isActive ? 'active' : ''}`}>
                {link.id === 2 && link.icon && link.icon2 ? (
                  <ProfileIcon bodyIcon={link.icon} eyeIcon={link.icon2}/>
                ) : (
                  <Image
                    className='side-navigation-icon'
                    src={typeof link.icon === 'string' ? link.icon : (link.icon as StaticImageData)}
                    width={30}
                    height={30}
                    alt={link.title}
                  />
                )}
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNavigation;