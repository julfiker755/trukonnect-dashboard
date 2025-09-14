"use client";
import assets from "@/assets";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import RevenueChart from "@/components/view/reviewer/chart/reevenue-chart";
import Image from "next/image";
import React from "react";

const overviewItem = [
  {
    icon: assets.admin.overview.performance,
    title: "Total Performers",
    count: 10,
    bg: "rgba(130, 255, 167, 0.10)",
  },
  {
    icon: assets.admin.overview.brands,
    title: "Total Brands",
    count: 45,
    bg: "rgba(245, 131, 255, 0.10)",
  },
  {
    icon: assets.admin.overview.revenue,
    title: "Total Revenue",
    count: 45,
    bg: "rgba(145, 137, 255, 0.10)",
  },
];

export default function ReviewerHome() {
  return (
    <div>
      <Navber
        props={
          <>
            <h1 className="text-xl">Dashboard</h1>
            <SearchBox
              placeholder="Search by user name"
              onSearch={(text: any) => console.log(text)}
            />
          </>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {overviewItem?.map((item, index) => (
          <div
            key={index}
            className="p-8 rounded-lg shadow-md text-center space-y-3"
            style={{
              background: item.bg,
            }}
          >
            <div className="flex justify-center">
              <Image src={item.icon} alt={item.title} width={60} height={100} />
            </div>
            <div className="text-figma-gray">{item.title}</div>
            <div className="text-2xl font-semibold">{item.count}</div>
          </div>
        ))}
      </div>
      <div>
        <RevenueChart />
      </div>
    </div>
  );
}
