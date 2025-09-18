import { BackBtn } from "@/components/reuseable/back-btn";
import Navber from "@/components/view/common/dash/navber";
import FavIcon from "@/icon/favIcon";
import { getSocial } from "@/icon/utils";
import { IdParams } from "@/types";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import calendar from "@/assets/calendar.svg";
import { PlaceholderImg } from "@/lib";
import { ImgBox } from "@/components/reuseable/Img-box";
import CopyBox from "@/components/reuseable/copy-box";

export default async function RejectedTaskDetails({ params }: IdParams) {
  const { id } = await params;
  return (
    <div className="mb-10">
      <Navber
        className="py-4"
        backbtn={
          <div className="items-center hidden lg:flex">
            <BackBtn iconStyle="text-figma-primary" />
            <h1 className="text-xl  relative -ml-2">Back</h1>
          </div>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                <span>Total Cost</span>
                <span className="flex items-center">
                  <FavIcon className="size-5" name="cost" />
                  <span className="ml-1 text-figma-primary">5896.00</span>
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Link</span>
                <CopyBox value=" https://hdurbakjdfb.com" />
              </li>
            </ul>
          </div>
        </div>
        <div>
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
          {/* Issue condition apply for the web */}
          <div className="bg-figma-chart p-6 h-fit mt-4 rounded-xl">
            <h1 className="text-lg mb-2">Issue</h1>
            <p className="text-figma-gray">
              I can not find the link which given by task creator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
