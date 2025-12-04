import calendar from '@/assets/calendar.svg';
import { cn, helpers } from '@/lib';
import React from 'react';

interface socialProps {
  href: string;
  name?: string;
  className?: string;
  imgStyle?: string;
  nameStyle?: string;
  onClick?: () => any;
  label?: boolean;
}

//  ========= SocialBox ============
export function SocialBox({
  href,
  name,
  className,
  imgStyle,
  nameStyle,
  onClick,
  label = true,
}: socialProps) {
  return (
    <div onClick={onClick} className={cn(`flex items-center`, className)}>
      <picture>
        <img
          src={helpers.imgSource(href) || '/blur.png'}
          alt="social"
          className={cn(`w-[19px] h-[19px]`, imgStyle)}
        />
      </picture>
      {label && <span className={cn(`ml-2`, nameStyle)}>{name}</span>}
    </div>
  );
}

//  ========= DateBox ===========
interface DateBoxProps {
  date: string;
  className?: string;
  imgStyle?: string;
}
export function DateBox({ date, className, imgStyle }: DateBoxProps) {
  return (
    <div className={cn(`flex items-center`, className)}>
      <picture>
        <img src={calendar.src} alt="datebox" className={cn(`w-[19px] h-[19px]`, imgStyle)} />
      </picture>
      <span className="ml-2">{helpers.formatDate(date)}</span>
    </div>
  );
}
