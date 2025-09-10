"use client";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reuseable/avater";
import { Pagination } from "@/components/reuseable/pagination";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { TableCell, TableRow } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import FavIcon from "@/icon/favIcon";
import React, { useState } from "react";

const item = [
  {
    user: "Abir",
    role: "Performer",
    email: "abid32@gmail.com",
    account: "Facebook",
    region: "Ghana",
    contact: "+233 5487542",
  },
  {
    user: "Maksud",
    role: "Creator",
    email: "user123@example.com",
    account: "Instagram",
    region: "Italy",
    contact: "+234 5485684",
  },
  {
    user: "Arjun",
    role: "Performer",
    email: "hello@creativeoutlook.com",
    account: "Tik Tok",
    region: "Ghana",
    contact: "+233 5487542",
  },
  {
    user: "Sita",
    role: "Creator",
    email: "info@innovativeideas.com",
    account: "Twitter",
    region: "Nigeria",
    contact: "+234 5485684",
  },
  {
    user: "Kiran",
    role: "Performer",
    email: "support@techsolutions.com",
    account: "Youtube",
    region: "Ghana",
    contact: "+233 5487542",
  },
  {
    user: "Ravi",
    role: "Creator",
    email: "contact@brightfuture.com",
    account: "Facebook",
    region: "Ghana",
    contact: "+233 5487542",
  },
  {
    user: "Anita",
    role: "Performer",
    email: "admin@yourdomain.com",
    account: "Instagram",
    region: "Italy",
    contact: "+234 5485684",
  },
  {
    user: "Deepak",
    role: "Creator",
    email: "reachus@smartsolutions.com",
    account: "Twitter",
    region: "Ghana",
    contact: "+233 5487542",
  },
  {
    user: "Deepak",
    role: "Performer",
    email: "reachus@smartsolutions.com",
    account: "Tik Tok",
    region: "Nigeria",
    contact: "+234 5485684",
  },
  {
    user: "Deepak",
    role: "Creator",
    email: "reachus@smartsolutions.com",
    account: "Facebook",
    region: "Italy",
    contact: "+234 5485684",
  },
];

export default function AccountVarificaton() {
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
  console.log(isPage)

  const isLoading = false;
  return (
    <div>
      <Navber
        props={
          <>
            <h1 className="text-xl">Account Verification</h1>
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
                      src={item?.avatar}
                      fallback={item.user}
                      alt={item.user}
                      fallbackStyle="avatar"
                    />
                    <span>{item.user}</span>
                  </div>
                </TableCell>

                {/* Role */}
                <TableCell>{item.role}</TableCell>
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
                  <FavIcon name="eye" />
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
    </div>
  );
}
