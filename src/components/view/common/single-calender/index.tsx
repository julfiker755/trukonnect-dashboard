"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FavIcon from "@/icon/favIcon";
import { formatDate } from "@/lib";

export function SingleCalendar({ onChange }: any) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 cursor-pointer hover:!bg-transparent hover:text-white border-none btn-shadow justify-between font-normal"
          >
            {date ? formatDate(date) : "Select date"}
            <span className="bg-white p-[6px] rounded-full">
              <FavIcon name="calender" className="size-4" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden bg-figma-chart p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            className="[[data-slot=popover-content]_&]:bg-background text-white"
            classNames={{
              button_previous:
                "cursor-pointer size-8 grid place-items-center rounded-md bg-[#575757]/20 text-white ",
              button_next:
                "cursor-pointer size-8 grid place-items-center rounded-md bg-[#575757]/20 text-white",
            }}
            onSelect={(date) => {
              setDate(date);
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
