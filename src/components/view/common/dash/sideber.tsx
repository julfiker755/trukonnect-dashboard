"use client";
import React from "react";
import { Button } from "@/components/ui";
import { reviewerlinks } from "./navdata";
import FavIcon from "@/icon/favIcon";
import NavItem from "./navitem";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const links = reviewerlinks;

  return (
    <div className="flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`absolute left-0 top-0 z-20 bg-[#424242]/10 backdrop-blur-[70px] flex h-screen  transition-transform transform duration-300 ease-linear flex-col overflow-y-hidden  text-white w-[240px] lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-screen relative">
          <div className="flex items-center justify-center m-2 rounded-md py-1">
            <FavIcon className="w-fit h-[50px]" name="logo" />
          </div>
          <div className="h-[calc(100vh-80px)] flex flex-col justify-between overflow-y-scroll scrollbar-hide">
            <nav>
              <NavItem item={links} />
            </nav>
            <div className="w-full my-3 flex justify-center">
              <Button
                variant="primary"
                className="bg-figma-primary text-white w-full rounded-sm"
              >
                <div className="flex w-full items-center justify-between">
                  <span>
                    
                    Log Out</span>
                  <span>
                    {" "}
                    <FavIcon name="signOut" />
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
