"use client";
import { Button } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import AnalyticChart from "@/components/view/reviewer/chart/analytic-chart";
import RecentActivity from "@/components/view/reviewer/recent-activity";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";
import React from "react";

const overviewItem = [
  {
    icon: <FavIcon className="size-12" name="review_acounts" />,
    title: "Pending Accounts",
    count: 10,
    btn_name: "Review accounts",
    href: "/reviewer/account-verification",
    bg: "rgba(130, 255, 167, 0.10)",
  },
  {
    icon: <FavIcon className="size-12" name="review_task" />,
    title: "Pending Orders",
    count: 45,
    btn_name: "Review task",
    href: "/reviewer/task-review",
    bg: "rgba(245, 131, 255, 0.10)",
  },
  {
    icon: <FavIcon className="size-12" name="review_performance" />,
    title: "Pending Task",
    count: 45,
    btn_name: "Review performance",
    href: "/reviewer/performance-review",
    bg: "rgba(145, 137, 255, 0.10)",
  },
];


export default function ReviewerHome() {
  return (
    <div>
      <Navber title="Dashboard" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {overviewItem?.map((item, index) => (
          <div
            style={{
              background: item.bg,
            }}
            key={index}
            className="p-8 rounded-lg shadow-md text-center space-y-3"
          >
            <div className="flex justify-center">{item.icon}</div>
            <div className="text-figma-gray">{item.title}</div>
            <div className="text-2xl font-semibold">{item.count}</div>

            <div className="mt-4">
              <Link href={item.href}>
                <Button
                  variant="primary"
                  className="bg-[#000000]/20 w-full text-figma-primary py-5"
                >
                  {item.btn_name}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="grid mt-10 gap-8 grid-cols-1 lg:grid-cols-2 ">
        <div>
          <RecentActivity />
        </div>
        <div>
          <AnalyticChart />
        </div>
      </div>
    </div>
  );
}
