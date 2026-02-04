"use client";
import { ReviewerWrapper } from "@/components/view/wapper-layout/reviewer";
import { childrenProps } from "@/types";
import React from "react";

export default function ReviewerLayout({ children }: childrenProps) {
  return <ReviewerWrapper>{children}</ReviewerWrapper>;
}
