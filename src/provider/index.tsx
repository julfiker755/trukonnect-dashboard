"use client";
import { ConfirmDialogProvider } from "@/components/context/delete-modal";
import { SuccessModalProvider } from "@/components/context/sucess-box";
import { childrenProps } from "@/types";
import React from "react";
import { Toaster } from "sonner";

export default function Provider({ children }: childrenProps) {
  return (
    <SuccessModalProvider>
      <ConfirmDialogProvider>
        {children}
        <Toaster richColors position="top-right" />
      </ConfirmDialogProvider>
    </SuccessModalProvider>
  );
}
