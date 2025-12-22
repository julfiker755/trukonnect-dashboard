'use client';
import Avatars from '@/components/reuseable/avater';
import { authKey, cn, helpers } from '@/lib';
import { useGetProfileQuery } from '@/redux/api/authApi';
import React, { useEffect, useRef, useState } from 'react';
import { useSidebarReviewer } from '../../wapper-layout/reviewer';
import FavIcon from '@/icon/favIcon';
import { Menu } from 'lucide-react';
import Link from 'next/link';


interface navberProps {
  className?: string;
  props?: any;
  isShow?: boolean;
  title?: string;
  backbtn?: React.ReactNode;
}

export default function Navber({ props, isShow = true, title, backbtn, className }: navberProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>()
  const { sidebarOpen, setSidebarOpen } = useSidebarReviewer();
  const token = helpers.getAuthCookie(authKey)
  const { data: profile } = useGetProfileQuery({},
    { refetchOnFocus: true, skip: !token }

  )

  useEffect(() => {
    if (profile) {
      const isTrue = profile?.data?.role === "admin"
      setIsAdmin(isTrue)
    }
  }, [profile])

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.classList.add('overflow-hidden');
  };

  useEffect(() => {
    const onScroll = () => navRef.current?.classList.toggle('nav-sticky', window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={navRef}>
      <div
        className={cn(
          `flex space-x-3  lg:space-x-0  z-20 items-center justify-between pt-2 lg:py-6`,
          className
        )}
      >
        <h1 onClick={() => handleSidebar()} className="cursor-pointer block lg:hidden">
          <Menu className="text-figma-gray" />
        </h1>
        {backbtn && backbtn}
        {title && <h1 className="text-xl hidden md:block">{title}</h1>}
        <div className="hidden lg:block">{props && props}</div>
        {isShow && (
          <div className="flex space-x-2 lg:space-x-0">
            <div className="block lg:hidden">{props && props}</div>
            <div className="bg-figma-blacks py-1 px-2 rounded-full flex items-center space-x-5">
              {isAdmin ? (
                <>
                  <Link href="/admin/notification">
                    <FavIcon name="bell" />
                  </Link>
                  <Link href="/admin/profile">
                    <Avatars
                      src={helpers.imgSource(profile?.data?.avatar) || '/avater.png'}
                      fallback={profile?.data?.name}
                      className="2xl:size-10   cursor-pointer"
                      alt={profile?.data?.avatar}
                    />
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/reviewer/notification">
                    <FavIcon name="bell" />
                  </Link>
                  <Link href="/reviewer/profile">
                    <Avatars
                      src={helpers.imgSource(profile?.data?.avatar) || '/avater.png'}
                      fallback={profile?.data?.name}
                      className="2xl:size-10   cursor-pointer"
                      alt={profile?.data?.avatar}
                    />
                  </Link>
                </>
              )}



            </div>
          </div>
        )}
      </div>
      {title && <h1 className="text-xl block md:hidden mt-1 mb-4">{title}</h1>}
    </div>
  );
}
