"use client";
import { dummyJson } from "@/components/dummy-json";
import Avatars from "@/components/reuseable/avater";
import { CloseBtn, CloseIcon } from "@/components/reuseable/btn";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import Modal2 from "@/components/reuseable/modal2";
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
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewerSchema } from "@/schema";
import { CircleAlert } from "lucide-react";
import { PhoneInput } from "@/components/reuseable/phone-input";

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
  const [isStore, setIsStore] = useState(false);
  const [isPage, setIsPage] = useState(1);
  const from = useForm({
    resolver: zodResolver(reviewerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const headers = [
    "Reviewer",
    "Email",
    "Account Re.",
    "Task Re.",
    "Performance Re.",
    "Action",
  ];

  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
    from.reset();
  };
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
          <Button
            onClick={() => setIsStore(!isStore)}
            variant="primary"
            className="rounded-md"
          >
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
      {/* ============= Add New Reviewer ========== */}
      <Modal2 open={isStore} setIsOpen={setIsStore}>
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-center">
            Add New Reviewer
          </h1>
          <h1 className="text-sm text-figma-gray text-center">
            Please provide reviewer email & name. Then create a password.
          </h1>
        </div>
        <CloseIcon className="mt-2 mr-3" onClose={() => setIsStore(!isStore)} />
        <Form from={from} onSubmit={handleSubmit} className="space-y-4">
          <FromInput
            className="h-10"
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            icon={<FavIcon name="user" className="size-4" color="#777777" />}
          />
          <FromInput
            className="h-10"
            name="email"
            label="Email"
            placeholder="Enter your email"
            icon={<FavIcon name="mail" className="size-4" color="#777777" />}
          />
          <div>
            <div className="text-blacks text-base font-medium pb-1">
              Contact Number
            </div>
            <PhoneInput
              onChange={(v) => {
                from.setValue("phone", v);
              }}
              placeholder="Enter a phone number"
            />
            {from?.formState?.errors?.phone && (
              <p className="text-reds justify-end  text-[#f73f4e]  flex items-center gap-1 text-sm">
                {from?.formState?.errors?.phone?.message as string}
                <CircleAlert size={14} />
              </p>
            )}
          </div>

          <FromInput
            className="h-10"
            name="password"
            label="Password"
            placeholder="Password"
            eye={true}
            icon={
              <FavIcon name="password" className="size-5" color="#777777" />
            }
          />

          <CloseBtn onClose={() => setIsStore(!isStore)} />
          <Button variant="primary" className="w-full">
            Add
          </Button>
        </Form>
      </Modal2>
    </div>
  );
}
