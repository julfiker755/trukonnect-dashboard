'use client';
import assets from '@/assets';
import Navber from '@/components/view/common/dash/navber';
import RevenueChart from '@/components/view/reviewer/chart/reevenue-chart';
import { useAdminOverviewQuery } from '@/redux/api/admin/overview';
import Image from 'next/image';
import React from 'react';

export default function ReviewerHome() {
  const { data } = useAdminOverviewQuery({});

  const overview = [
    {
      icon: assets.admin.overview.performance,
      title: 'Total Users',
      count: data?.totaluser,
      bg: 'rgba(130, 255, 167, 0.10)',
    },
    {
      icon: assets.admin.overview.revenue,
      title: 'Total Revenue',
      count: data?.totalrevenue,
      bg: 'rgba(145, 137, 255, 0.10)',
    },
  ];
  return (
    <div>
      <Navber title="Dashboard" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {overview?.map((item, index) => (
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
            <div className="text-2xl font-semibold">{item.count || 0}</div>
          </div>
        ))}
      </div>
      <div>
        <RevenueChart data={data} />
      </div>
    </div>
  );
}
