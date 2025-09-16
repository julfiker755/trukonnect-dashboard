"use client";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reuseable/avater";
import { Pagination } from "@/components/reuseable/pagination";
import { CustomTable } from "@/components/reuseable/table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import {TableCell, TableRow} from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import React, { useEffect, useState } from "react";
import FavIcon from "@/icon/favIcon";
import RadioToggle from "@/components/reuseable/radio-toggle";
import Link from "next/link";

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

// item2
const item2 = [
  { creator: "Ravi", taskType: "Instagram Likes", quantity: 180 },
  { creator: "Maya", taskType: "TikTok Comments", quantity: 220 },
  { creator: "Sanjay", taskType: "Facebook Shares", quantity: 300 },
  { creator: "Priya", taskType: "Twitter Retweets", quantity: 150 },
  { creator: "Kiran", taskType: "YouTube Follows", quantity: 120 },
  { creator: "Zara", taskType: "Instagram Shares", quantity: 450 },
  { creator: "Anish", taskType: "YouTube Views", quantity: 80 },
  { creator: "Sita", taskType: "TikTok Shares", quantity: 250 },
  { creator: "Ravi", taskType: "Twitter Comments", quantity: 380 },
  { creator: "Maksud", taskType: "Facebook Post Likes", quantity: 500 },
  { creator: "Anita", taskType: "Instagram Follows", quantity: 700 },
];

export default function TaskOrder() {
  const [isValue, setIsValue] = useState("active_task");
  const [isTab, setIsTab] = useState("task_management");
  const headers = ["Creator", "Task Type", "Quantity", "Action"];

  const isLoading = false;

  useEffect(() => {
    if (isTab) {
      setIsValue(
        isTab === "task_management" ? "active_task" : "completed_order"
      );
    }
  }, [isTab]);
  return (
    <div>
      <Navber
        props={
          <>
            <h1 className="text-xl">Task & Order Management</h1>
            <SearchBox
              placeholder="Search by user name"
              onSearch={(text: any) => console.log(text)}
            />
          </>
        }
      />
      <div>
        <div className="flex items-center justify-between my-5">
          <ul className="flex space-x-5">
            {[
              { label: "Task Management", value: "task_management" },
              { label: "Order Management", value: "order_management" },
            ].map((item) => (
              <li
                key={item.label}
                className={`font-medium cursor-pointer border-b-3 border-b-transparent ${
                  isTab === item.value
                    ? "text-figma-primary !border-b-figma-primary"
                    : ""
                }`}
                onClick={() => setIsTab(item.value)}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div>
            <RadioToggle
              value={isValue}
              onValueChange={(value) => setIsValue(value as any)}
              options={
                isTab === "task_management"
                  ? [
                      { label: "Active Task", value: "active_task" },
                      { label: "Completed Task", value: "completed_task" },
                      { label: "Rejected Task", value: "rejected_task" },
                    ]
                  : [
                      { label: "Completed Order", value: "completed_order" },
                      { label: "Rejected Order", value: "rejected_order" },
                    ]
              }
            />
          </div>
        </div>
        {isTab === "task_management" ? (
          <TaskManagement
            key="task_management"
            headers={headers}
            item={item}
            isLoading={isLoading}
            isValue={isValue}
          />
        ) : (
          <OrderManagement
            key="order_management"
            headers={headers}
            item={item2}
            isLoading={isLoading}
            isValue={isValue}
          />
        )}
      </div>
    </div>
  );
}

// TaskManagement
const TaskManagement = ({ headers, isLoading, item, isValue }: any) => {
  return (
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
                <Link
                  href={
                    isValue === "active_task"
                      ? `/admin/task-order/task/active/3`
                      : isValue === "completed_task"
                      ? `/admin/task-order/task/completed/6`
                      : `/admin/task-order/task/rejected/7`
                  }
                  className="flex justify-center cursor-pointer"
                >
                  <FavIcon name="eye" />
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
      <Pagination onClick={(v: any) => {}} {...dummyJson.meta}></Pagination>
    </div>
  );
};

// OrderManagement
const OrderManagement = ({ headers, isLoading, item }: any) => {
  return (
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
                <Link
                  href={`/admin/task-order/77`}
                  className="flex justify-center cursor-pointer"
                >
                  <FavIcon name="eye" />
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
      <Pagination onClick={(v: any) => {}} {...dummyJson.meta}></Pagination>
    </div>
  );
};
