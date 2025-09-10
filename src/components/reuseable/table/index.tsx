import {
  Table as TableArea,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/lib";
import React, { ReactNode } from "react";

interface TableProps {
  className?: string;
  headers?: string[];
  children: ReactNode;
}

export const CustomTable = ({
  className,
  headers = [],
  children,
}: TableProps) => {
  return (
    <div
      className={cn(
        "bg-[#575757]/20 backdrop-blur-2xl rounded-xl px-6 py-3",
        className
      )}
    >
      <div>
        <TableArea className="border-separate border-spacing-y-3 my-0">
          {headers && headers.length > 0 && (
            <TableHeader>
              <TableRow className="text-base  text-center font-semibold text-black border-2 border-[#F6F6F6]">
                {headers?.map((header, index) => (
                  <TableHead key={index} className="text-center">
                    <h1
                      className={
                        index === headers.length - 1
                          ? "w-max capitalize font-semibold inline-block"
                          : "w-max capitalize font-semibold"
                      }
                    >
                      {header}
                    </h1>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody className="[&>tr>td>svg]:last:mx-auto">
            {children}
          </TableBody>
        </TableArea>
      </div>
    </div>
  );
};
