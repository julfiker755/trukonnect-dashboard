"use client";
import useSuccessModal from "@/components/context/sucess-box";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reuseable/avater";
import { CloseBtn, CloseIcon } from "@/components/reuseable/btn";
import Modal2 from "@/components/reuseable/modal2";
import { Pagination } from "@/components/reuseable/pagination";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Button, TableCell, TableRow, Textarea } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import FavIcon from "@/icon/favIcon";
import { Files } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import calendar from "@/assets/calendar.svg";
import { getSocial } from "@/icon/utils";
import { ImgBox } from "@/components/reuseable/Img-box";
import { PlaceholderImg } from "@/lib";
import { useModalState } from "@/hooks/useModalState";
import { ImageGallery } from "@/components/reuseable/image-gallery";
import CopyBox from "@/components/reuseable/copy-box";

const item = [
  { performer: "Abir", taskType: "Instagram Follows" },
  { performer: "Maksud", taskType: "TikTok Shares" },
  { performer: "Arjun", taskType: "Facebook Post Likes" },
  { performer: "Sita", taskType: "Twitter Retweets" },
  { performer: "Kiran", taskType: "YouTube Comments" },
  { performer: "Ravi", taskType: "Instagram Shares" },
  { performer: "Anita", taskType: "YouTube Video Views" },
  { performer: "Deepak", taskType: "TikTok Comments" },
  { performer: "Deepak", taskType: "Twitter Follows" },
  { performer: "Deepak", taskType: "YouTube Shares" },
  { performer: "Anita", taskType: "Instagram Likes" },
];

export default function PerformanceReview() {
  const [state, updateState] = useModalState({
    isPreview: false,
    isReject: false,
    isReport: false,
    isSocail: false,
  });
  const [isPage, setIsPage] = useState(1);
  const { openSucc } = useSuccessModal();
  const headers = ["Performers", "Task Type", "Action"];

  const isLoading = false;
  const images = ["/photo.jpg", "/photo.jpg", "/photo.jpg"];
  return (
    <div>
      <Navber
        props={
          <>
            <h1 className="text-xl">Performance Review</h1>
            <SearchBox
              placeholder="Search by user name"
              onSearch={(text: any) => console.log(text)}
            />
          </>
        }
      />
      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton
              colSpan={headers?.length}
              tdStyle="!pl-0 !bg-background"
            />
          ) : item.length > 0 ? (
            item.map((item: any, index: any) => (
              <TableRow key={index}>
                {/* User */}
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={""}
                      fallback={item.performer}
                      alt={item.performer}
                      fallbackStyle="avatar"
                    />
                    <span>{item.performer}</span>
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell>{item.taskType}</TableCell>
                <TableCell>
                  <h1
                    onClick={() => updateState("isPreview", true)}
                    className="flex justify-center cursor-pointer"
                  >
                    {" "}
                    <FavIcon name="eye" />
                  </h1>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No users are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
        <Pagination
          onClick={(v: any) => setIsPage(v)}
          {...dummyJson.meta}
        ></Pagination>
      </div>
      {/* ===== account varification prieview======= */}
      <Modal2
        open={state.isPreview}
        setIsOpen={(v) => updateState("isPreview", v)}
      >
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
            {/* <h1 className="font-semibold text-xl">Instagram Likes</h1> */}
            <h1>
              <CloseIcon
                className="static"
                onClose={() => updateState("isPreview", false)}
              />
            </h1>
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
          <Button
            className="w-full"
            variant="primary"
            onClick={() => updateState("isSocail", true)}
          >
            User Social
          </Button>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Quantity</span>
              <span>150</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Selected Audience</span>
              <span>Ghana</span>
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
              <CopyBox value=" https://hdurbakjdfb.com" />
            </li>
            <li>
              <ImageGallery images={images}>
                <div className="grid grid-cols-4">
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
          {/* performer takle checkbox show hobe */}

          <div className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <Button
                onClick={() => updateState("isReport", true)}
                size="lg"
                variant="secondary"
                className="w-full text-figma-red"
              >
                Report User to Admin
              </Button>
              <Button
                onClick={() => updateState("isReject", true)}
                size="lg"
                variant="secondary"
                className="w-full text-figma-red"
              >
                Reject
              </Button>
            </div>
            <Button
              onClick={async () => {
                updateState("isPreview", false);
                await openSucc();
              }}
              size="lg"
              variant="primary"
              className="w-full"
            >
              Approve
            </Button>
          </div>
        </div>
      </Modal2>
      {/* ========User social======== */}
      <Modal2
        open={state.isSocail}
        setIsOpen={(v) => updateState("isSocail", v)}
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
            onClose={() => updateState("isSocail", false)}
          />
        </div>
      </Modal2>
      {/* ===== Cause of report======= */}
      <Modal2
        open={state.isReport}
        setIsOpen={(v) => updateState("isReport", v)}
        className="sm:max-w-sm"
      >
        <div className="space-y-4">
          <h1 className="font-medium text-xl">Cause of report</h1>
          <Textarea
            className="resize-none min-h-30 mt-3 bg-figma-blacks border-none"
            placeholder="Write additional note"
          />
          <CloseBtn onClose={() => updateState("isReport", false)} />
          <Button variant="primary" className="w-full">
            Send
          </Button>
        </div>
      </Modal2>
      {/* =====Cause of rejection======= */}
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
    </div>
  );
}
