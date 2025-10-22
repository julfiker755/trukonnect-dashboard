import { cn, helpers } from "@/lib";
import React from "react";

interface flagProps {
  href: string;
  name: string;
  className?: string;
  imgStyle?: string;
  nameStyle?: string;
  onClick?: () => any;
}

export default function FlagBox({
  href,
  name,
  className,
  imgStyle,
  nameStyle,
  onClick,
}: flagProps) {
  return (
    <div onClick={onClick} className={cn(`flex items-center`, className)}>
      <picture>
        <img
          src={helpers.imgSource(href)}
          alt="flag"
          className={cn(`w-[20px] h-[15px]`, imgStyle)}
        />
      </picture>
      <span className={cn(`ml-2`, nameStyle)}>{name}</span>
    </div>
  );
}
