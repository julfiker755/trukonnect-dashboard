import Avatars from "@/components/reuseable/avater";
import { BackBtn } from "@/components/reuseable/back-btn";
import {Table, TableBody, TableCell, TableRow } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import {SlugParams } from "@/types";
import React from "react";
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


export default async function UserDetail({ params }: SlugParams) {
  const { slug } = await params;
  return (
    <div>
      <Navber
        isShow={false}
        props={
          <>
            <div className="flex items-center">
              <BackBtn iconStyle="text-figma-primary" />
              <h1 className="text-xl font-medium">Referred Users</h1>
            </div>
          </>
        }
      />
      <div>
        <Table className="border-separate border-spacing-y-3 my-0">
          <TableBody>
            {item.map((item: any, index: any) => (
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
                {/* Email */}
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.contact}</TableCell>
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
                  <span>{item.region}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
