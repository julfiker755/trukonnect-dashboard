"use client";
import Sidebar from "@/components/view/common/dash/sideber";
import { childrenProps } from "@/types";
import React, { useState } from "react";

export default function ReviewerLayout({ children }: childrenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* <!-- ===== Sidebar Start ===== --> */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Content Area Start ===== --> */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* <Navber sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
