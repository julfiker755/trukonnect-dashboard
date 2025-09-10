"use client";
import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface searchBoxProps {
  placeholder?: string;
  className?: string;
  onSearch?: (searchText: string) => void;
}

export default function SearchBox({
  placeholder = "Search hare",
  className,
  onSearch,
}: searchBoxProps) {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch?.(text);
  };
  return (
    <div
      className={cn(
        `relative w-full max-w-2xl rounded-full bg-figma-blacks py-1`,
        className
      )}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-figma-gray" />
      <Input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="pl-10 pr-4 py-3  rounded-full border-none w-full placeholder:text-figma-gray text-whie"
      />
    </div>
  );
}
