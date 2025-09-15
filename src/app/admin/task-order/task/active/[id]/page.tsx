import { BackBtn } from "@/components/reuseable/back-btn";
import Navber from "@/components/view/common/dash/navber";
import FavIcon from "@/icon/favIcon";
import { getSocial } from "@/icon/utils";
import { IdParams } from "@/types";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import calendar from "@/assets/calendar.svg";
import { Files } from "lucide-react";
import { PlaceholderImg } from "@/lib";
import { ImgBox } from "@/components/reuseable/Img-box";

export default async function TaskDetails({ params }: IdParams) {
  const { id } = await params;
  return (
    <div>
      <Navber
        props={
          <>
            <div className="flex items-center space-x-2">
              <BackBtn iconStyle="text-figma-primary" />
              <h1 className="relative -ml-3">Back</h1>
            </div>
          </>
        }
      />
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-figma-chart p-6 rounded-xl">
          <h1 className="text-lg mb-4">Task Details</h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl">Instagram Likes</h1>
            </div>
            <p className="text-figma-gray">
              Like the latest Star Bucks ad post on Instagram. Earn 2 tokens
              instantly for showing your support!
            </p>
            <ul className="*:text-lg *:text-figma-gray">
              <li>- Tap in the link.</li>
              <li>- There have a light profile picture</li>
              <li>- React on this link</li>
            </ul>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Quantity</span>
                <span>150</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Selected Audience</span>
                <span>
                  <ReactCountryFlag
                    countryCode={"GH"}
                    svg
                    style={{
                      width: "2em",
                      height: "1em",
                    }}
                    title={"item.region"}
                  />
                  Ghana
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Per user earned Tokens</span>
                <span className="flex items-center">
                  <FavIcon name="coin" className="mr-1 size-5" />2
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Platform</span>
                <span className="flex items-center">
                  {getSocial("instagram")}
                  <span className="ml-2">Instagram</span>
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Creation Date</span>
                <span className="flex items-center">
                  <Image src={calendar} width={18} height={20} alt="img1" />
                  <span className="ml-1">13 Aug, 2025</span>
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Link</span>
                <span className="border-2 flex justify-between items-center border-[#575757]/20 rounded-md px-2 py-[2px]">
                  <span> https://hdurbakjdfb..</span>
                  <Files className="text-[#575757]/40 cursor-pointer ml-3 size-5" />
                </span>
              </li>
            </ul>
          </div>
          <h1 className="text-lg mt-5">Progress of task</h1>
          {/* task view */}
          <div className="w-full">
            <div>
              <div className="text-xs font-semibold flex mb-2 justify-end">
                <span className="text-figma-primary mr-1"> 75 </span> / 150
              </div>
              <div className="bg-[#575757]/20  h-2 mb-2.5 rounded-md w-full">
                <div
                  className="bg-figma-primary  h-2 rounded-full"
                  style={{ width: `50%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-figma-chart p-6 h-fit rounded-xl">
          <h1 className="text-lg mb-4">Reviewed By</h1>
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
