import Avatars from "@/components/reuseable/avater";
import { BackBtn } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import {Table, TableBody, TableCell, TableRow } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import UserManagementAction from "@/components/view/common/user-mange-action";
import FavIcon from "@/icon/favIcon";
import { PlaceholderImg } from "@/lib";
import { IdParams } from "@/types";
import Link from "next/link";
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
const overviewItem = [
  {
    icon: <FavIcon name="completed" />,
    title: "Completed Orders",
    count: 265,
    bg: "rgba(194, 255, 212, 0.10)",
    circle: "rgba(255, 218, 45, 0.10)",
  },
  {
    icon: <FavIcon name="ongoing" />,
    title: "Ongoing Orders",
    count: 6531.0,
    bg: "rgba(251, 190, 254, 0.10)",
    circle: "rgba(124, 179, 66, 0.10)",
  },
  {
    icon: <FavIcon name="paidUser" className="size-7" />,
    title: "Total Users Paid",
    count: 458,
    bg: "rgba(190, 223, 254, 0.10)",
    circle: "rgba(255, 172, 48, 0.10)",
  },
];

export default async function CreatorDetail({ params }: IdParams) {
  const { id } = await params;
  return (
    <div>
      <Navber
        isShow={false}
        className="py-4"
        backbtn={
          <div className="flex items-center">
            <BackBtn className="hidden lg:grid" iconStyle="text-figma-primary" />
            <h1 className="text-xl font-medium">Creator Details</h1>
          </div>
        }
      />
      <div className="bg-figma-chart p-5 rounded-xl mb-5">
        {/* Header Section */}
        <UserManagementAction isShow={false} />

        {/* User Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 2xl:gap-20 mt-10">
          {/* Left Side: User Info */}
          <div className="space-y-3">
           <div>
              <ImgBox
              className="size-30 rounded-xl mx-auto"
              src={PlaceholderImg()}
              alt="img"
            ></ImgBox>
            <h1 className="text-figma-green text-center mt-1">Not Banned</h1>
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

          <div className="space-y-4">
            {overviewItem?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-5 px-4 rounded-md"
                style={{
                  background: item.bg, // Dynamic background color from item
                }}
              >
                <div>
                  <div className="text-figma-gray">{item.title}</div>
                  <div className="text-2xl font-semibold">{item.count}</div>
                </div>

                {/* Image Icon */}
                <div style={{
                  background: item.circle,
                }}
                className="grid place-items-center size-13 rounded-full"
                >{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ul className="flex justify-between items-center">
        <li className="text-2xl font-medium">Referred Users</li>
        <li>
          <Link
            className="text-sm text-figma-primary"
            href={`/admin/user-management/88`}
          >
            See All
          </Link>
        </li>
      </ul>
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
