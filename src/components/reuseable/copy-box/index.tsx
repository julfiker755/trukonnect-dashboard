"use client"
import { cn } from "@/lib";
import { Files } from "lucide-react";
import React, { useState } from "react";

interface CopyProps {
  value: string;
  className?: string;
  iconStyle?: string;
}

export default function CopyBox({ value, className, iconStyle }: CopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        `border-2 flex justify-between h-8 px-2 items-center border-[#575757]/20 rounded-md`,
        className
      )}
    >
      <span className="truncate w-[100px] text-sm text-figma-gray">
        {value}
      </span>

      <Files
        onClick={handleCopy}
        className={cn(
          `text-[#575757]/60 ${
            copied && "text-green-600"
          } cursor-pointer ml-3 size-5 transition`,
          iconStyle
        )}
      />
    </div>
  );
}
