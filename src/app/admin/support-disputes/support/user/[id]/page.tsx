"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import Navber from "@/components/view/common/dash/navber";
import React, { useState } from "react";
import { PlaceholderImg } from "@/lib";
import { ImgBox } from "@/components/reuseable/Img-box";
import { useParams } from "next/navigation";
import { Button, Textarea } from "@/components/ui";


export default function UsersDetails() {
  const { id } = useParams();
  return (
    <div className="mb-10">
      <Navber
         className="py-3"
         backbtn={
           <div className="items-center hidden lg:flex">
             <BackBtn iconStyle="text-figma-primary" />
             <h1 className="text-lg relative -ml-2 mb-[2px]">Back</h1>
           </div>
         }
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-figma-chart p-6 rounded-xl">
          <h1 className="text-xl mb-4">Issue</h1>
          <div className="space-y-4">
            <p className="text-figma-gray">
              Like the latest Star Bucks ad post on Instagram. Earn 2 tokens
              instantly for showing your support!
            </p>
            <ul className="*:text-lg *:text-figma-gray">
              <li>- Tap in the link.</li>
              <li>- There have a light profile picture</li>
              <li>- React on this link</li>
            </ul>
          </div>
          <div className="mt-10">
            <h1 className="text-lg">Your reply*</h1>
            <Textarea
              className="resize-none min-h-30 mt-3 bg-figma-blacks border-none"
              placeholder="Briefly describe the answer"
            />
            <Button variant="primary" className="w-full mt-5">
              Send
            </Button>
          </div>
        </div>
        <div className="bg-figma-chart p-6 h-fit rounded-xl">
          <h1 className="text-xl mb-4">Reviewed By</h1>
          <div className="space-y-3">
            <div className="mb-10">
              <ImgBox
                className="size-30 rounded-xl mx-auto"
                src={PlaceholderImg()}
                alt="img"
              ></ImgBox>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Full name</span>
              <span className="text-white">Mr. Daniel</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Email</span>
              <span className="text-white">daniel234@gmail.com</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Phone number</span>
              <span className="text-white">+334 254845665</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Region</span>
              <span className="text-white">Ghana</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
