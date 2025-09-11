import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  titleStyle?: string;
  mainStyle?: string;
}

export default function Modal2({
  open,
  setIsOpen,
  children,
  className,
  mainStyle,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild />
      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className={cn(
          `sm:max-w-md p-0 gap-0 bg-background modal-shadow1 rounded-2xl overflow-hidden border-none`,
          className
        )}
      >
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <div className={cn("p-4", mainStyle)}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
