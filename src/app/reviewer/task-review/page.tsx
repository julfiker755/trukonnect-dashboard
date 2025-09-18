"use client";
import { CloseBtn, CloseIcon } from "@/components/reuseable/btn";
import useSuccessModal from "@/components/context/sucess-box";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reuseable/avater";
import Modal2 from "@/components/reuseable/modal2";
import { Pagination } from "@/components/reuseable/pagination";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Button, TableCell, TableRow, Textarea } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import { useModalState } from "@/hooks/useModalState";
import React, { useState } from "react";
import calendar from "@/assets/calendar.svg";
import { getSocial } from "@/icon/utils";
import FavIcon from "@/icon/favIcon";
import { Files } from "lucide-react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import CopyBox from "@/components/reuseable/copy-box";

const item = [
  { creator: "Abir", taskType: "Instagram Follows", quantity: 150 },
  { creator: "Maksud", taskType: "TikTok Shares", quantity: 100 },
  { creator: "Arjun", taskType: "Facebook Post Likes", quantity: 250 },
  { creator: "Sita", taskType: "Twitter Retweets", quantity: 100 },
  { creator: "Kiran", taskType: "YouTube Comments", quantity: 250 },
  { creator: "Ravi", taskType: "Instagram Shares", quantity: 300 },
  { creator: "Anita", taskType: "YouTube Video Views", quantity: 50 },
  { creator: "Deepak", taskType: "TikTok Comments", quantity: 150 },
  { creator: "Deepak", taskType: "Twitter Follows", quantity: 350 },
  { creator: "Deepak", taskType: "YouTube Shares", quantity: 400 },
  { creator: "Anita", taskType: "Instagram Likes", quantity: 600 },
];

export default function TaskReview() {
  const [state, updateState] = useModalState({
    isReject: false,
    isReport: false,
    isPreview: false,
  });
  const [isPage, setIsPage] = useState(1);
  const { openSucc } = useSuccessModal();

  const headers = ["Creator", "Task Type", "Quantity", "Action"];

  const isLoading = false;
  return (
    <div>
      <Navber
      title="Task Review"
        props={
          <>
            <SearchBox
              placeholder="Search hare"
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
                      fallback={item.creator}
                      alt={item.creator}
                      fallbackStyle="avatar"
                    />
                    <span>{item.creator}</span>
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell>{item.taskType}</TableCell>
                {/* Email */}
                <TableCell>{item.quantity}</TableCell>
                {/* Action Buttons */}
                <TableCell>
                  <h1
                    onClick={() => updateState("isPreview", true)}
                    className="flex justify-center cursor-pointer"
                  >
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
      {/* ===== account verification preview======= */}
      <Modal2
        open={state.isPreview}
        setIsOpen={(v) => updateState("isPreview", v)}
      >
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">Instagram Likes</h1>
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
              <CopyBox value=" https://hdurbakjdfb.com" />
            </li>
          </ul>

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

      {/* ===== Cause of rejection======= */}
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
