"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import Navber from "@/components/view/common/dash/navber";
import FavIcon from "@/icon/favIcon";
import { getSocial } from "@/icon/utils";
import Image from "next/image";
import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import calendar from "@/assets/calendar.svg";
import { PlaceholderImg } from "@/lib";
import { ImgBox } from "@/components/reuseable/Img-box";
import { useParams } from "next/navigation";
import CopyBox from "@/components/reuseable/copy-box";
import { Button, Textarea } from "@/components/ui";
import Modal2 from "@/components/reuseable/modal2";
import { CloseBtn } from "@/components/reuseable/btn";
import useSuccessModal from "@/components/context/sucess-box";

export default function TaskDetails() {
  const [isReject, setIsReject] = useState(false);
  const { openSucc } = useSuccessModal();
  const { id } = useParams();
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
          <h1 className="text-xl mb-4">Task Details</h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg">Instagram Likes</h1>
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
                <CopyBox value="https://www.figma.com/design/yXKlQR3P8SaIfdykQPG5uP/Truekonnect?node-id=1544-2241&m=dev" />
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">
            <Button onClick={() => setIsReject(true)} variant="secondary">
              Reject
            </Button>
            <Button
              onClick={async () => {
                await openSucc({
                  title: "Successfully",
                  description: "Task approved successfully",
                });
              }}
              variant="primary"
            >
              Approve
            </Button>
          </div>
        </div>
        <div className="bg-figma-chart p-6 h-fit rounded-xl">
          <div>
            <h1 className="text-xl">Issue</h1>
             <p className="text-figma-gray">I can not find the link which given by task creator.</p>
          </div>
          <h1 className="text-xl my-4">Reviewed By</h1>
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
      {/* ===== account varification reject======= */}
      <Modal2 open={isReject} setIsOpen={setIsReject} className="sm:max-w-sm">
        <div className="space-y-4">
          <h1 className="font-medium text-xl">Cause of rejection</h1>
          <Textarea
            className="resize-none min-h-30 mt-3 bg-figma-blacks border-none"
            placeholder="Write additional note"
          />
          <CloseBtn onClose={() => setIsReject(false)} />
          <Button variant="primary" className="w-full">
            Send
          </Button>
        </div>
      </Modal2>
    </div>
  );
}
