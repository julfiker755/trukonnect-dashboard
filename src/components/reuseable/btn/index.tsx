import { Button } from "@/components/ui";
import { cn } from "@/lib";
import { XIcon } from "lucide-react";
import React from "react";

interface CloseBtnProps {
  className?: string;
  ctrlClose: React.Dispatch<React.SetStateAction<boolean>>;
}

// CloseIcon
export function CloseIcon({ className, ctrlClose }: CloseBtnProps) {
  return (
    <button
      className={cn("absolute top-2 right-2", className)}
      onClick={() => ctrlClose(false)}
      type="button"
    >
      <XIcon className="size-6 cursor-pointer text-figma-red" />
    </button>
  );
}

// CloseBtn
export function CloseBtn({ className, ctrlClose }: CloseBtnProps) {
  return (
    <Button
      onClick={() => ctrlClose(false)}
      variant="secondary"
      type="button"
      className={cn(`w-full h-10`, className)}
    >
      Close
    </Button>
  );
}
