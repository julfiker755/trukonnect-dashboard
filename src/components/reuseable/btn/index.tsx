import { Button } from "@/components/ui";
import { cn } from "@/lib";
import { XIcon } from "lucide-react";
import React from "react";

interface CloseBtnProps {
  className?: string;
  onClose: () => any;
}

// CloseIcon
export function CloseIcon({ className, onClose }: CloseBtnProps) {
  return (
    <button
      className={cn("absolute top-2 right-2", className)}
      onClick={onClose}
      type="button"
    >
      <XIcon className="size-6 cursor-pointer text-figma-red" />
    </button>
  );
}

// CloseBtn
export function CloseBtn({ className, onClose }: CloseBtnProps) {
  return (
    <Button
      onClick={onClose}
      variant="secondary"
      type="button"
      className={cn(`w-full h-10`, className)}
    >
      Close
    </Button>
  );
}
