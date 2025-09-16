"use client";
import Avatars from "@/components/reuseable/avater";
import FavIcon from "@/icon/favIcon";
import { Menu } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useSidebarReviewer } from "../../wapper-layout/reviewer";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface navberProps {
  props: any;
  isShow?: boolean;
}

export default function Navber({ props, isShow = true }: navberProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useSidebarReviewer();

  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.classList.add("overflow-hidden");
  };

  useEffect(() => {
    const onScroll = () =>
      navRef.current?.classList.toggle("nav-sticky", window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={navRef}
      className="flex space-x-3 sticky top-0 lg:space-x-0  z-20 items-center justify-between py-6"
    >
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
          {/* src={pathname.includes("/admin") ? "/bg2.svg" : "/bg1.svg"} */}
          <Link
            href={
              pathname.includes("/admin")
                ? "/admin/profile"
                : "/reviewer/profile"
            }
          >
            <Avatars
              src="/user.png"
              fallback="P"
              className="2xl:size-10  cursor-pointer"
              alt="img"
            />
          </Link>
        </div>
      )}

      <style jsx>{`
        .nav-sticky {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background-color:#00060c;
        }
      `}</style>
    </div>
  );
}
