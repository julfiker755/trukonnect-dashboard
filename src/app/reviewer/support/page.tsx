"use client";
import useSuccessModal from "@/components/context/sucess-box";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reuseable/avater";
import { CloseIcon } from "@/components/reuseable/btn";
import Modal2 from "@/components/reuseable/modal2";
import { Pagination } from "@/components/reuseable/pagination";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Badge, Button, TableCell, TableRow, Textarea } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import FavIcon from "@/icon/favIcon";
import { capitalize } from "@/lib";
import React, { useState } from "react";

const item = [
  {
    user: "Abir",
    role: "performer",
    email: "abid32@gmail.com",
    account: "Facebook",
    region: "Ghana",
    contact: "+233 5487542",
  },
  {
    user: "Maksud",
    role: "creator",
    email: "user123@example.com",
    account: "Instagram",
    region: "Italy",
    contact: "+234 5485684",
  },
  {
    user: "Arjun",
    role: "performer",
    email: "hello@creativeoutlook.com",
    account: "Tik Tok",
    region: "Ghana",
    contact: "+233 5487542",
  },
  {
    user: "Sita",
    role: "creator",
    email: "info@innovativeideas.com",
    account: "Twitter",
    region: "Nigeria",
    contact: "+234 5485684",
  },
  {
    user: "Kiran",
    role: "performer",
    email: "support@techsolutions.com",
    account: "Youtube",
    region: "Ghana",
    contact: "+233 5487542",
  },
  {
    user: "Ravi",
    role: "creator",
    email: "contact@brightfuture.com",
    account: "Facebook",
    region: "Ghana",
    contact: "+233 5487542",
  },
  {
    user: "Anita",
    role: "performer",
    email: "admin@yourdomain.com",
    account: "Instagram",
    region: "Italy",
    contact: "+234 5485684",
  },
  {
    user: "Deepak",
    role: "creator",
    email: "reachus@smartsolutions.com",
    account: "Twitter",
    region: "Ghana",
    contact: "+233 5487542",
  },
  {
    user: "Deepak",
    role: "performer",
    email: "reachus@smartsolutions.com",
    account: "Tik Tok",
    region: "Nigeria",
    contact: "+234 5485684",
  },
];

export default function Support() {
  const [isPreview, setIsPreview] = useState(false);
  const [isPage, setIsPage] = useState(1);
  const headers = [
    "User",
    "Role",
    "Email",
    "Account",
    "Region",
    "Contact",
    "Action",
  ];
  console.log(isPage);

  const isLoading = false;
  return (
    <div>
      <Navber
        title="Support"
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
            <TableSkeleton colSpan={headers?.length} tdStyle="!pl-0" />
          ) : item.length > 0 ? (
            item.map((item: any, index: any) => (
              <TableRow key={index}>
                {/* User */}
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item?.avatar}
                      fallback={item.user}
                      alt={item.user}
                      fallbackStyle="avatar"
                    />
                    <span>{item.user}</span>
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell>
                  <Badge variant={item.role}>{capitalize(item.role)}</Badge>
                </TableCell>
                {/* Email */}
                <TableCell>{item.email}</TableCell>
                {/* Account */}
                <TableCell>{item.account}</TableCell>
                {/* Region */}
                <TableCell>{item.region}</TableCell>
                {/* Contact */}
                <TableCell>{item.contact}</TableCell>
                {/* Action Buttons */}
                <TableCell>
                  <h1
                    onClick={() => setIsPreview(!isPreview)}
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
      <Modal2 open={isPreview} setIsOpen={setIsPreview}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-xl">Described Issue</h1>
            <CloseIcon className="static" onClose={() => setIsPreview(false)} />
          </div>
          <p className="text-figma-gray">
            Like the latest Star Bucks ad post on Instagram. Earn 2 tokens
            instantly for showing your support!
          </p>
          <ul className="*:text-lg *:leading-6 *:text-figma-gray">
            <li>- Tap in the link.</li>
            <li>- There have a light profile picture</li>
            <li>- React on this link</li>
          </ul>
          <div>
            <h1 className="font-medium text-lg mb-1">Your reply*</h1>
            <Textarea
              className="resize-none min-h-30 bg-figma-blacks border-none"
              placeholder="Write additional note"
            />
          </div>
          <Button variant="secondary" className="w-full">
            Escalate to admin
          </Button>
          <Button variant="primary" className="w-full">
            Send
          </Button>
        </div>
      </Modal2>
    </div>
  );
}
