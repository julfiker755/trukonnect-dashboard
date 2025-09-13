import Image from "next/image";
import React from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex relative">
      {/* Full-screen background image  className="min-h-screen flex relative"*/}
      <div className="fixed inset-0">
        <Image
          src="bg2.svg"
          alt="title"
          fill
          className="object-cover z-0 md:rounded-md"
        />
      </div>
      <div className="z-10">{children}</div>
    </div>
  );
}
