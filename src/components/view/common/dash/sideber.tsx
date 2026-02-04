"use client";
import React from "react";
import { Button } from "@/components/ui";
import { adminLinks, reviewerlinks } from "./navdata";
import FavIcon from "@/icon/favIcon";
import NavItem from "./navitem";
import Avatars from "@/components/reuseable/avater";
import { usePathname } from "next/navigation";
import Link from "next/link";


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const links = pathname.includes("/admin") ? adminLinks : reviewerlinks;

  return (
    <div className="flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 opacity-50"
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            setSidebarOpen(false);
          }}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`absolute left-0  top-0 z-20 shadow 
          h-screen lg:h-fit bg-[#424242]/20  lg:!rounded-md p-4  backdrop-blur-[70px]
           flex  transition-transform transform duration-300 ease-linear flex-col  
           text-white ${
             pathname.includes("admin") ? "w-fit" : "w-[250px]"
           } lg:sticky lg:top-[20px] lg:pb-2 lg:ml-(--sideber-margin)  lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-center h-[60px]">
            <Link href={links && links[0]?.to || ""}>
              <ul className="flex justify-center space-x-2 items-center">
                <li>
                  <FavIcon className="w-[72px] h-[60px]" name="logo" />
                </li>
                <li className="font-semibold text-2xl">Trukonnect</li>
              </ul>
            </Link>
          </div>
          <div className="h-[calc(100vh-140px)] mt-6 flex flex-col justify-between overflow-y-scroll scrollbar-hide">
            <nav>
              <NavItem item={links} />
            </nav>
            <div className="w-full my-2 flex justify-center">
              <Button
                variant="primary"
                className="bg-figma-primary px-2 text-white w-full h-12 rounded-sm"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="flex items-center gap-x-1">
                    <Avatars
                      className="bg-white text-black rounded-md 2xl:size-10"
                      src=""
                      fallback="N"
                      alt="@shadcn"
                    />
                    <span className="font-medium text-base ml-1">Log Out</span>
                  </span>
                  <span>
                    {" "}
                    <FavIcon className="size-6" name="signOut" />
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
