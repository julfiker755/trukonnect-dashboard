"use client";
import { CloseBtn, CloseIcon } from "@/components/reuseable/btn";
import Modal2 from "@/components/reuseable/modal2";
import RadioToggle from "@/components/reuseable/radio-toggle";
import { Button, Input } from "@/components/ui";
import { useModalState } from "@/hooks/useModalState";
import FavIcon from "@/icon/favIcon";
import React, { useState } from "react";

export default function UserManagementAction({isShow=true}:any) {
  const [state, updateState] = useModalState({
    isStatus: false,
    isToken: false,
  });   
  const [isValue, setIsValue] = useState("ban_user");

  return (
    <div>
      <ul className="flex flex-wrap  space-y-3 lg:space-y-0 justify-between items-center">
        <li className="text-xl font-medium">Basic Information</li>
        <li className="flex items-center space-x-2">
          {isShow && (
            <Button
            variant="secondary" 
            type="button" 
            className="rounded-md"
            onClick={() => updateState("isToken", true)}
          >
            Send Token
          </Button>
          )}
          <Button
            variant="primary"
            onClick={() => updateState("isStatus", true)}
            className="rounded-md"
            type="button"
          >
            Change Status
          </Button>
        </li>
      </ul>
      {/* ============== Change Status  ============== */}
      <Modal2
        open={state.isStatus}
        setIsOpen={(v) => updateState("isStatus", v)}
        className="sm:max-w-sm"
      >
        <div className="space-y-4">
          <ul className="flex justify-between items-center">
            <li className="font-medium text-2xl">Select option</li>
            <li className="font-medium text-xl">
              <CloseIcon
                className="static"
                onClose={() => updateState("isStatus", false)}
              />
            </li>
          </ul>
          <RadioToggle
            value={isValue}
            onValueChange={setIsValue}
            options={[
              { label: "Ban User", value: "ban_user" },
              { label: "Not Banned", value: "not_banned" },
            ]}
            className="flex-col items-start"
          />
          <div className="grid grid-cols-2 gap-4 mt-10">
            <CloseBtn onClose={() => updateState("isStatus", false)} />
            <Button variant="primary" className="w-full">
              Confirm
            </Button>
          </div>
        </div>
      </Modal2>
      {/* ============== Send token as gift  ============== */}
      <Modal2
        open={state.isToken}
        setIsOpen={(v) => updateState("isToken", v)}
        className="sm:max-w-sm"
      >
        <div className="space-y-4">
          <ul className="flex justify-between items-center">
            <li className="font-medium text-2xl">Send token as gift</li>
            <li className="font-medium text-xl">
              <CloseIcon
                className="static"
                onClose={() => updateState("isToken", false)}
              />
            </li>
          </ul>
           <div className="relative">
             <Input className="h-10 w-full border-none bg-[#5E5E5E]/20 rounded-sm pl-7" placeholder="Enter the number of token" />
             <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
               <FavIcon name="coin" className="size-4" />
             </span>
           </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <CloseBtn onClose={() => updateState("isToken", false)} />
            <Button variant="primary" className="w-full">
              Send
            </Button>
          </div>
        </div>
      </Modal2>
    </div>
  );
}
