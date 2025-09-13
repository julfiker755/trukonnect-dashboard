"use client";
import Avatars from "@/components/reuseable/avater";
import FavIcon from "@/icon/favIcon";
import { Menu } from "lucide-react";
import React, { useEffect } from "react";
import { useSidebarReviewer } from "../../wapper-layout/reviewer";
import Link from "next/link";

interface navberProps {
  props: any;
  isShow?: boolean;
}

export default function Navber({ props, isShow = true }: navberProps) {
  const { sidebarOpen, setSidebarOpen } = useSidebarReviewer();

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.classList.add("overflow-hidden");
  };

  return (
    <div className="flex space-x-3 sticky top-0 lg:space-x-0  z-20 items-center justify-between py-6">
      <h1
        onClick={() => handleSidebar()}
        className="cursor-pointer block lg:hidden"
      >
        <Menu className="text-figma-gray" />
      </h1>
      {props}
      {isShow && (
        <div className="bg-figma-blacks py-1 px-2 rounded-full flex items-center space-x-5">
          <Link href={"/reviewer/notification"}>
            <FavIcon name="bell" />
          </Link>
          <Link  href={"/reviewer/profile"}>
            <Avatars
              src="/user.png"
              fallback="P"
              className="2xl:size-10 cursor-pointer"
              alt="img"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
