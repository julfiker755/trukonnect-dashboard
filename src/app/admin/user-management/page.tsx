"use client";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reuseable/avater";
import { Pagination } from "@/components/reuseable/pagination";
import RadioToggle from "@/components/reuseable/radio-toggle";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Badge, TableCell, TableRow } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import FavIcon from "@/icon/favIcon";
import { capitalize } from "@/lib";
import Link from "next/link";
import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";

const item = [
  {
    user: "Abir",
    role: "performer",
    email: "abid32@gmail.com",
    account: "Facebook",
    region: "Ghana",
    contact: "+233 5487542",
    countryFlag: "GH",
  },
  {
    user: "Maksud",
    role: "creator",
    email: "user123@example.com",
    account: "Instagram",
    region: "Italy",
    contact: "+234 5485684",
    countryFlag: "IT",
  },
  {
    user: "Arjun",
    role: "performer",
    email: "hello@creativeoutlook.com",
    account: "Tik Tok",
    region: "Ghana",
    contact: "+233 5487542",
    countryFlag: "GH",
  },
  {
    user: "Sita",
    role: "creator",
    email: "info@innovativeideas.com",
    account: "Twitter",
    region: "Nigeria",
    contact: "+234 5485684",
    countryFlag: "NG",
  },
  {
    user: "Kiran",
    role: "performer",
    email: "support@techsolutions.com",
    account: "Youtube",
    region: "Ghana",
    contact: "+233 5487542",
    countryFlag: "GH",
  },
  {
    user: "Ravi",
    role: "creator",
    email: "contact@brightfuture.com",
    account: "Facebook",
    region: "Ghana",
    contact: "+233 5487542",
    countryFlag: "GH",
  },
  {
    user: "Anita",
    role: "performer",
    email: "admin@yourdomain.com",
    account: "Instagram",
    region: "Italy",
    contact: "+234 5485684",
    countryFlag: "IT",
  },
  {
    user: "Deepak",
    role: "creator",
    email: "reachus@smartsolutions.com",
    account: "Twitter",
    region: "Ghana",
    contact: "+233 5487542",
    countryFlag: "GH",
  },
  {
    user: "Deepak",
    role: "performer",
    email: "reachus@smartsolutions.com",
    account: "Tik Tok",
    region: "Nigeria",
    contact: "+234 5485684",
    countryFlag: "NG",
  },
];

export default function UserManagement() {
  const [isValue, setIsValue] = useState("not_banned");
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

  const isLoading = false;
  return (
    <div>
      <Navber
        props={
          <>
            <h1 className="text-xl">User Management</h1>
            <SearchBox
              placeholder="Search by user name"
              onSearch={(text: any) => console.log(text)}
            />
          </>
        }
      />
      <div className="mb-3 flex justify-between">
        <h1 className="font-semibold text-xl">Select Users</h1>
        <RadioToggle
          value={isValue}
          onValueChange={(value) => setIsValue(value as any)}
          options={[
            { label: "Not Banned", value: "not_banned" },
            { label: "Banned Users", value: "banned_users" },
          ]}
        />
      </div>
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
                <TableCell>
                  <ReactCountryFlag
                    countryCode={item.countryFlag}
                    svg
                    style={{
                      width: "2em",
                      height: "1em",
                    }}
                    title={item.region}
                  />
                </TableCell>
                {/* Contact */}
                <TableCell>{item.contact}</TableCell>
                {/* Action Buttons */}
                <TableCell>
                  <Link
                    href={
                      item.role === "creator"
                        ? `/admin/user-management/creator/5`
                        : `/admin/user-management/performer/7`
                    }
                  >
                    <h1 className="flex justify-center cursor-pointer">
                      {" "}
                      <FavIcon name="eye" />
                    </h1>
                  </Link>
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
