"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FavIcon from "@/icon/favIcon";
import { formatDate } from "@/lib";

export function SingleCalendar({ onChange }: any) {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    let newStartDate = startDate;
    let newEndDate = endDate;

    if (!startDate) {
      // If no start date is selected, set the start date
      newStartDate = selectedDate;
      newEndDate = undefined; // Reset end date when selecting new start
    } else if (!endDate) {
      // If there's a start date but no end date
      if (selectedDate > startDate) {
        // Selected date is after start date, set as end date
        newEndDate = selectedDate;
        setOpen(false); // Close popover after selecting end date
      } else {
        // Selected date is before or same as start date, reset range
        newStartDate = selectedDate;
        newEndDate = undefined;
      }
    } else {
      // Both dates are selected, start a new range
      newStartDate = selectedDate;
      newEndDate = undefined;
    }

    // Update the state
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // Log the selected dates with proper formatting
    console.log({
      startDate: newStartDate ? formatDate(newStartDate) : "",
      endDate: newEndDate ? formatDate(newEndDate) : "",
    });

    // Update the parent component with the selected dates
    onChange({ startDate: newStartDate, endDate: newEndDate });
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-fit cursor-pointer hover:!bg-transparent hover:text-white border-none btn-shadow justify-between font-normal"
          >
            {startDate ? `${formatDate(startDate)}` : "Start Date"} - {" "}
            {endDate ? `${formatDate(endDate)}` : "End Date"}
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
            selected={startDate}
            numberOfMonths={2}
            className="[[data-slot=popover-content]_&]:bg-background text-white"
            classNames={{
              button_previous:
                "cursor-pointer size-8 grid place-items-center rounded-md bg-[#575757]/20 text-white ",
              button_next:
                "cursor-pointer size-8 grid place-items-center rounded-md bg-[#575757]/20 text-white",
            }}
            onSelect={handleSelectDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
