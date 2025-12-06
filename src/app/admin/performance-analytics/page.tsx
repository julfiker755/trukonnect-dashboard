'use client';
import assets from '@/assets';
import FlagBox from '@/components/reuseable/flag-box';
import Navber from '@/components/view/common/dash/navber';
import { SingleCalendar } from '@/components/view/common/single-calender';
import { useGetCountryQuery } from '@/redux/api/admin/countryApi';
import { useGetPerformanceQuery } from '@/redux/api/admin/dashboardApi';
import React, { useState } from 'react';
import Image from 'next/image';
import { helpers } from '@/lib';

export default function SupportDisputes() {
  const [countryId, setCountryId] = useState(1);
  const [date, setDate] = useState<any>(null);
  const { data: country } = useGetCountryQuery({});
  const { data } = useGetPerformanceQuery({
    country_id: countryId,
    ...(date != null && { from_date: date?.from_date, to_date: date?.to_date }),
  });

  return (
    <div className="mb-10">
      <Navber title="Performance & Analytics" />
      <ul className="flex flex-wrap justify-between items-center mt-4">
        <li className="flex items-center space-x-3">
          <div className="flex items-center">
            <span className="text-lg mr-2">Date: </span>
            <SingleCalendar
              onChange={(date: any) => {
                const data = {
                  from_date: date.startDate ? helpers.formatDate(date.startDate, 'YYYY-MM-DD') : '',
                  to_date: date.endDate ? helpers.formatDate(date.endDate, 'YYYY-MM-DD') : '',
                };
                if (data.from_date && data.to_date) setDate(data);
              }}
            />
          </div>
        </li>
        <li className="space-x-4 flex items-center flex-wrap">
          <span className="text-lg">Selected Country:</span>
          <div className="space-x-4 flex mt-3 lg:mt-0">
            {/* btn-shadow */}
            {country?.data?.map((item: any) => (
              <FlagBox
                className={`border-1 cursor-pointer p-1 ${
                  item.id == countryId && 'btn-shadow'
                } rounded-md`}
                key={item.id}
                href={item.flag}
                name={item.name}
                onClick={() => setCountryId(item.id)}
              />
            ))}
          </div>
        </li>
      </ul>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <AnalyticsCdard
            label="Total Performers"
            value={data?.total_performers || 0}
            period={data?.total_performers_period || 0}
            imghref={assets.analaytics.performer}
          />
          <AnalyticsCdard
            label="Total Creators"
            value={data?.total_creators || 0}
            period={data?.total_creators_period || 0}
            imghref={assets.analaytics.creator}
          />
          <AnalyticsCdard
            label="Total Reviewers"
            value={data?.total_reviewers || 0}
            period={data?.total_reviewers_period || 0}
            imghref={assets.analaytics.reviewer}
          />
          <AnalyticsCdard
            label="Total Tasks"
            value={data?.total_tasks || 0}
            period={data?.total_tasks_period || 0}
            imghref={assets.analaytics.task}
          />
          <AnalyticsCdard
            label="Total Orders"
            value={data?.total_orders || 0}
            period={data?.total_orders_period || 0}
            imghref={assets.analaytics.orders}
          />
          <AnalyticsCdard
            label="Total Token Conversion"
            value={data?.total_token_conversion || 0}
            period={data?.total_token_conversion_period || 0}
            imghref={assets.analaytics.token}
          />
          <AnalyticsCdard
            label="Total Revenue"
            value={data?.total_revenue || 0}
            period={data?.total_revenue_period || 0}
            imghref={assets.analaytics.revenu}
          />
          <AnalyticsCdard
            label="Total Revenue Distribution"
            value={data?.total_revenue_distribution || 0}
            period={data?.total_revenue_distribution_period || 0}
            imghref={assets.analaytics.distribution}
          />
          <AnalyticsCdard
            label="Total Withdraw"
            value={data?.total_withdrawals || 0}
            period={data?.total_withdrawals_period || 0}
            imghref={assets.analaytics.withdraw}
          />
        </div>
      </div>
    </div>
  );
}

function AnalyticsCdard({ label, value, imghref, period }: any) {
  return (
    <div className="p-6 bg-figma-card text-white rounded-lg text-center">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-figma-gray">{label}</h3>
          <p className="text-figma-gray text-start">{value}</p>
        </div>
        <div className="text-4xl">
          <Image src={imghref} alt={label} width={50} height={50} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <h1>Selected Period:</h1>
        <h1 className="font-medium text-xl">{period}</h1>
      </div>
    </div>
  );
}
