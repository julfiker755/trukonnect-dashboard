"use client";
import Avatars from "@/components/reuseable/avater";
import { ImageGallery } from "@/components/reuseable/image-gallery";
import { ImgBox } from "@/components/reuseable/Img-box";
import Navber from "@/components/view/common/dash/navber";
import { BackBtn } from "@/components/reuseable/back-btn";
import CopyBox from "@/components/reuseable/copy-box";
import calendar from "@/assets/calendar.svg";
import { PlaceholderImg } from "@/lib";
import FavIcon from "@/icon/favIcon";
import { getSocial } from "@/icon/utils";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import { Button, Textarea } from "@/components/ui";
import useSuccessModal from "@/components/context/sucess-box";
import { useModalState } from "@/hooks/useModalState";
import Modal2 from "@/components/reuseable/modal2";
import { CloseBtn } from "@/components/reuseable/btn";

export default function TaskDetails() {
  const { openSucc } = useSuccessModal();
  const { id } = useParams();
  const [state, updateState] = useModalState({
    isReject: false,
    isSocial: false,
  });
  const images = ["/photo.jpg", "/photo.jpg", "/photo.jpg"];
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
          <h1 className="text-lg mb-4">Task Details</h1>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Avatars
                  src={""}
                  fallback="Star Bucks"
                  alt="Star Bucks"
                  fallbackStyle="avatar"
                />
                <ul className="*:leading-5">
                  <li className="text-xl">Star Bucks</li>
                  <li className="text-sm text-figma-gray">13 Aug, 2025</li>
                </ul>
              </div>
            </div>
            <h1 className="text-lg font-medium mb-2">Instagram Likes</h1>
            <p className="text-figma-gray">
              Like the latest Star Bucks ad post on Instagram. Earn 2 tokens
              instantly for showing your support!
            </p>
            <ul className="*:text-lg *:text-figma-gray">
              <li>- Tap in the link.</li>
              <li>- There have a light profile picture</li>
              <li>- React on this link</li>
            </ul>
            <Button
              onClick={() => updateState("isSocial", true)}
              variant="secondary"
              className="w-full  text-figma-primary"
            >
              User Social
            </Button>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Total tokens</span>
                <span className="flex items-center">
                  <FavIcon name="coin" className="mr-1 size-5" />2
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Task from</span>
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
                <span>Task Link</span>
                <CopyBox value=" https://hdurbakjdfb.com" />
              </li>
              <li className="mt-3">
                <h1 className="text-lg font-medium mb-3">Proven File</h1>
                <ImageGallery images={images}>
                  <div className="flex flex-wrap gap-5 items-center justify-between">
                    <ImgBox
                      src={"/photo.jpg"}
                      alt="photo2"
                      className="w-[70px] h-[100px] mx-auto"
                    />
                    <ImgBox
                      src={"/photo.jpg"}
                      alt="photo2"
                      className="w-[70px] h-[100px] mx-auto"
                    />
                    <ImgBox
                      src={"/photo.jpg"}
                      alt="photo2"
                      className="w-[70px] h-[100px] mx-auto"
                    />
                    <ImgBox
                      src={"/photo.jpg"}
                      alt="photo2"
                      className="w-[70px] h-[100px] mx-auto"
                    />
                    <ImgBox
                      src={"/photo.jpg"}
                      alt="photo2"
                      className="w-[70px] h-[100px] mx-auto"
                    />
                    <ImgBox
                      src={"/photo.jpg"}
                      alt="photo2"
                      className="w-[70px] h-[100px] mx-auto"
                    />
                  </div>
                </ImageGallery>
              </li>
            </ul>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 mt-5">
              <Button
                onClick={() => updateState("isReject", true)}
                variant="secondary"
              >
                Reject
              </Button>
              <Button
                onClick={async () => {
                  await openSucc({
                    title: "Successfully",
                    description: "You approved the order",
                  });
                }}
                variant="primary"
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-figma-chart p-6 h-fit rounded-xl">
          <div>
            <h1 className="text-xl">Issue</h1>
            <p className="text-figma-gray">
              I can not find the link which given by task creator.
            </p>
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
      <Modal2
        open={state.isReject}
        setIsOpen={(v) => updateState("isReject", v)}
        className="sm:max-w-sm"
      >
        <div className="space-y-4">
          <h1 className="font-medium text-xl">Cause of rejection</h1>
          <Textarea
            className="resize-none min-h-30 mt-3 bg-figma-blacks border-none"
            placeholder="Write additional note"
          />
          <CloseBtn onClose={() => updateState("isReject", false)} />
          <Button variant="primary" className="w-full">
            Send
          </Button>
        </div>
      </Modal2>
      {/* ========User social======== */}
      <Modal2
        open={state.isSocial}
        setIsOpen={(v) => updateState("isSocial", v)}
        className="sm:max-w-sm"
      >
        <div>
          <ImgBox
            src={PlaceholderImg()}
            className="w-full h-[250px]"
            alt="imgbox1"
          ></ImgBox>
          <ul className="*:text-lg my-3">
            <li>
              <span className="text-figma-gray">Username: </span>Sourov Das
              Mithun
            </li>
            <li>
              {" "}
              <span className="text-figma-gray">Notes: </span>This is my
              facebook account
            </li>
          </ul>
          {/* performer takle checkbox show hobe */}
          <CloseBtn
            className="bg-figma-primary"
            onClose={() => updateState("isSocial", false)}
          />
        </div>
      </Modal2>
    </div>
  );
}
