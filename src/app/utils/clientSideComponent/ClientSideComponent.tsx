'use client'

import { usePathname } from 'next/navigation';
import SideNavigation from '../../components/UI/sideNavigation/SideNavigation';

const ClientSideComponent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const pathList = ['/education', '/profile', '/shop', '/settings'];
  const shouldShowSideNavigation = pathList.includes(pathname);

  return (
    <div className={shouldShowSideNavigation ? 'main-container' : ''}>
      {shouldShowSideNavigation && <SideNavigation />}
      {children}
    </div>
  );
};

export default ClientSideComponent;