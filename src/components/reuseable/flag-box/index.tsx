import { cn, helpers } from '@/lib';
import React from 'react';

interface flagProps {
  href: string;
  name?: string;
  className?: string;
  imgStyle?: string;
  nameStyle?: string;
  onClick?: () => any;
  label?: boolean;
}

export default function FlagBox({
  href,
  name,
  className,
  imgStyle,
  nameStyle,
  onClick,
  label = true,
}: flagProps) {
  return (
    <div onClick={onClick} className={cn(`flex items-center`, className)}>
      <picture>
        <img
          src={helpers.imgSource(href) || '/blur.png'}
          alt="flag"
          className={cn(`w-[20px] h-[15px]`, imgStyle)}
        />
      </picture>
      {label && <span className={cn(`ml-2`, nameStyle)}>{name}</span>}
    </div>
  );
}
