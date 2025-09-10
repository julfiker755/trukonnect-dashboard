"use client";
import { childrenProps } from "@/types";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Sidebar from "../common/dash/sideber";
import Image from "next/image";

interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function ReviewerWrapper({ children }: childrenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="flex relative">
        {/* Full-screen background image */}
        <div className="fixed inset-0">
          <Image
            src="/bg1.svg"
            alt="title"
            fill
            className="object-cover z-0 md:rounded-md"
          />
        </div>

        {/* Sidebar and content */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative z-10 flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="px-6">{children}</div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

// useSidebarReviewer hook
export const useSidebarReviewer = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
