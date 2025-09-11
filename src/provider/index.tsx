"use client";
import { SuccessModalProvider } from "@/components/context/sucess-box";
import { childrenProps } from "@/types";
import React from "react";
import { Toaster } from "sonner";

export default function Provider({ children }: childrenProps) {
  return (
    <SuccessModalProvider>
      {children}
      <Toaster richColors position="top-right" />
    </SuccessModalProvider>
  );
}
