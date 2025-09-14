"use client";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reuseable/avater";
import { Pagination } from "@/components/reuseable/pagination";
import RadioToggle from "@/components/reuseable/radio-toggle";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Button, TableCell, TableRow } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import { SingleCalendar } from "@/components/view/common/single-calender";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";
import React, { useState } from "react";

const item = [
  {
    reviewer: "Abir Hossain",
    email: "abid32@gmail.com",
    accountRe: 21,
    taskRe: 21,
    performanceRe: 21,
  },
  {
    reviewer: "Maksud Bhuiya",
    email: "user123@example.com",
    accountRe: 10,
    taskRe: 10,
    performanceRe: 10,
  },
  {
    reviewer: "Arjun Patel",
    email: "hello@creativeoutlook.com",
    accountRe: 15,
    taskRe: 15,
    performanceRe: 15,
  },
  {
    reviewer: "Sita Sharma",
    email: "info@innovativeideas.com",
    accountRe: 2,
    taskRe: 2,
    performanceRe: 2,
  },
  {
    reviewer: "Kiran Mehta",
    email: "support@techsolutions.com",
    accountRe: 1,
    taskRe: 1,
    performanceRe: 1,
  },
  {
    reviewer: "Ravi Kumar",
    email: "contact@brightfuture.com",
    accountRe: 12,
    taskRe: 12,
    performanceRe: 12,
  },
  {
    reviewer: "Anita Desai",
    email: "admin@yourdomain.com",
    accountRe: 19,
    taskRe: 19,
    performanceRe: 19,
  },
  {
    reviewer: "Deepak Singh",
    email: "reachus@smartsolutions.com",
    accountRe: 6,
    taskRe: 6,
    performanceRe: 6,
  },
  {
    reviewer: "Deepak Verma",
    email: "reachus@smartsolutions.com",
    accountRe: 58,
    taskRe: 58,
    performanceRe: 58,
  },
  {
    reviewer: "Deepak Joshi",
    email: "reachus@smartsolutions.com",
    accountRe: 14,
    taskRe: 14,
    performanceRe: 14,
  },
];

export default function ReviewerManagement() {
  const [isValue, setIsValue] = useState("not_banned");
  const [isPage, setIsPage] = useState(1);
  const headers = [
    "Reviewer",
    "Email",
    "Account Re.",
    "Task Re.",
    "Performance Re.",
    "Action",
  ];

  const isLoading = false;
  return (
    <div>
      <Navber
        props={
          <>
            <h1 className="text-xl">Reviewer Management</h1>
            <SearchBox
              placeholder="Search by user name"
              onSearch={(text: any) => console.log(text)}
            />
          </>
        }
      />
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="mr-2">Select Reviewer:</h1>
          <RadioToggle
            value={isValue}
            onValueChange={(value) => setIsValue(value as any)}
            options={[
              { label: "Not Banned", value: "not_banned" },
              { label: "Banned Reviewer", value: "banned_reviewer" },
            ]}
          />
        </div>
        <div className="flex items-center space-x-5">
          <Button variant="primary" className="rounded-md">
            Add Reviewer
          </Button>
          <div className="flex items-center">
            <span className="text-lg mr-2">From: </span>
            <SingleCalendar onChange={(date: any) => console.log(date)} />
          </div>
          <div className="flex items-center">
            <span className="text-lg mr-2">To: </span>
            <SingleCalendar onChange={(date: any) => console.log(date)} />
          </div>
        </div>
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
                      src={""}
                      fallback={item.reviewer}
                      alt={item.reviewer}
                      fallbackStyle="avatar"
                    />
                    <span>{item.reviewer}</span>
                  </div>
                </TableCell>
                {/* Email */}
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.accountRe}</TableCell>
                <TableCell>{item.taskRe}</TableCell>
                <TableCell>{item.performanceRe}</TableCell>
                {/* Action Buttons */}
                <TableCell>
                  <Link href={`/admin/reviewer-management/9`}>
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
