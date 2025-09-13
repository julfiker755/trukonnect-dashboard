"use client";
import { childrenProps } from "@/types";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Sidebar from "../common/dash/sideber";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function ReviewerWrapper({ children }: childrenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // cleanup: always remove body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="min-h-screen flex relative">
        {/* Full-screen background image  className="min-h-screen flex relative"*/}
        <div className="fixed inset-0">
          <Image
            src={pathname.includes("/admin") ? "/bg2.svg" : "/bg1.svg"}
            alt="title"
            fill
            className="object-cover z-0 md:rounded-md"
          />
        </div>

        {/* Sidebar and content width=250px ml-5 =20px -- 250+20=270px */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div
          className="relative
        z-10 flex flex-1 flex-col"
        >
          <div className="px-4 2xl:px-5">{children}</div>
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
