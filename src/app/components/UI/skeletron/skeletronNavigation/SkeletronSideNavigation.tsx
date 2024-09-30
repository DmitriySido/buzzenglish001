
import './skeletronSideNavigation.scss'

import Link from 'next/link';

const SkeletronSideNavigation = () => {
  const navigationLinks = [
    { title: 'Обучение', path: '/education', id: 1},
    { title: 'Профиль', path: '/profile', id: 2},
    { title: 'Магазин', path: '/shop', id: 3},
    { title: 'Настройки', path: '/settings', id: 4},
  ];

  return(
    <nav className="skeletron-side-navigation side-navigation">
      <ul className="navigation-list">
        <div className='logo__wrapper'>
          <Link className='logo' href={'/education'}>BuzzEnglish</Link>
        </div>
        {navigationLinks.map((link) => {

          return (
            <li className="side-navigation-item" key={link.id}>
              <Link href={'/education'} className={`side-navigation-link`}>
                <div className='side-navigation-icon'></div>
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  )
}

export default SkeletronSideNavigation