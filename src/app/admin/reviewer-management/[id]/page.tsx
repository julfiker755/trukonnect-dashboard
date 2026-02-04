"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { CloseBtn, CloseIcon } from "@/components/reuseable/btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import Modal2 from "@/components/reuseable/modal2";
import RadioToggle from "@/components/reuseable/radio-toggle";
import { Button } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import AnalyticChart from "@/components/view/reviewer/chart/analytic-chart";
import FavIcon from "@/icon/favIcon";
import { PlaceholderImg } from "@/lib";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const overviewItem = [
  {
    title: "Total Verified Task",
    count: 265,
    bg: "rgba(194, 255, 212, 0.10)",
  },
  {
    title: "Total Verified Orders",
    count: 6531.0,
    bg: "rgba(251, 190, 254, 0.10)",
  },
  {
    title: "Total Verified Accounts",
    count: 458,
    bg: "rgba(190, 223, 254, 0.10)",
  },
];

export default function ReviewDetails() {
  const [isStatus, setIsStatus] = useState(false);
  const [isValue, setIsValue] = useState("");
  const { id } = useParams();
  return (
    <div>
      <Navber
        isShow={false}
        props={
          <>
            <div className="flex items-center">
              <BackBtn iconStyle="text-figma-primary" />
              <h1 className="text-xl font-medium">Reviewer Details</h1>
            </div>
          </>
        }
      />
      <div className="bg-figma-chart p-6 rounded-xl mb-5">
        <Button
          variant="primary"
          onClick={() => setIsStatus(!isStatus)}
          className="rounded-md float-right"
          type="button"
        >
          Action
        </Button>

        {/* User Info Section */}
        <div className="mt-10">
          {/* Left Side: User Info */}
          <div className="space-y-3">
            <div>
              <ImgBox
                className="size-30 rounded-xl mx-auto"
                src={PlaceholderImg()}
                alt="img"
              ></ImgBox>
              <h1 className="text-figma-green text-center mt-1">Not Banned</h1>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <div className="space-y-4">
            {overviewItem?.map((item, index) => (
              <div
                key={index}
                className="flex justify-center py-5 px-4 rounded-md"
                style={{
                  background: item.bg, // Dynamic background color from item
                }}
              >
                <div>
                  <div className="text-figma-gray text-center">
                    {item.title}
                  </div>
                  <div className="text-2xl font-semibold text-center">
                    {item.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <AnalyticChart show={false}  className="bg-transparent p-0" />
        </div>
      </div>
      {/* ============== Change Status  ============== */}
      <Modal2 open={isStatus} setIsOpen={setIsStatus} className="sm:max-w-sm">
        <div className="space-y-4">
          <ul className="flex justify-between items-center">
            <li className="font-medium text-2xl">Select option</li>
            <li className="font-medium text-xl">
              <CloseIcon
                className="static"
                onClose={() => setIsStatus(false)}
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
            <CloseBtn onClose={() => setIsStatus(false)} />
            <Button variant="primary" className="w-full">
              Confirm
            </Button>
          </div>
        </div>
      </Modal2>
    </div>
  );
}
