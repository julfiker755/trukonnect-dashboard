'use client';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import { SingleCalendar } from '@/components/view/common/single-calender';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';

const data = [
  {
    label: 'Total Performers',
    value: '45898452',
    selectedPeriod: '58462',
    icon: '👨‍💼',
  },
  {
    label: 'Total Creators',
    value: '45898452',
    selectedPeriod: '58462',
    icon: '👩‍🎨',
  },
  { label: 'Total Reviewers', value: '54', selectedPeriod: '20', icon: '👨‍🏫' },
  { label: 'Total Tasks', value: '652', selectedPeriod: '25', icon: '📄' },
  {
    label: 'Total Orders',
    value: '45898452',
    selectedPeriod: '58462',
    icon: '📝',
  },
  {
    label: 'Total Token Conversion',
    value: '985635',
    selectedPeriod: '14235',
    icon: '💰',
  },
  {
    label: 'Total Revenue',
    value: '45898452',
    selectedPeriod: '58462',
    icon: '💵',
  },
  {
    label: 'Total Revenue Distribution',
    value: '45898452',
    selectedPeriod: '58462',
    icon: '💸',
  },
  { label: 'Total Withdraw', value: '54', selectedPeriod: '20', icon: '💳' },
];

export default function SupportDisputes() {
  return (
    <div className="mb-10">
      <Navber title="Performance & Analytics" />
      <ul className="flex flex-wrap justify-between items-center mt-4">
        <li className="flex items-center space-x-3">
          <div className="flex items-center">
            <span className="text-lg mr-2">Date: </span>
            <SingleCalendar onChange={(date: any) => console.log(date)} />
          </div>
        </li>
        <li className="space-x-4 flex items-center flex-wrap">
          <span className="text-lg">Selected Currency:</span>
          <div className="space-x-4 mt-3 lg:mt-0">
            <span className="border p-1 btn-shadow rounded-md">
              <ReactCountryFlag
                countryCode={'GH'}
                svg
                style={{
                  width: '1em',
                  height: '1em',
                }}
                title={'Ghana'}
              />
              <span className="ml-1"> Ghana</span>
            </span>
            <span className="border p-1 btn-shadow rounded-md">
              <ReactCountryFlag
                countryCode={'NG'}
                svg
                style={{
                  width: '1em',
                  height: '1em',
                }}
                title={'Nigeria'}
              />
              <span className="ml-1">Nigeria</span>
            </span>
          </div>
        </li>
      </ul>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {data.map((item, index) => (
            <div key={index} className="p-6 bg-figma-card text-white rounded-lg text-center">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-figma-gray">{item.label}</h3>
                  <p className="text-figma-gray text-start">{item.value}</p>
                </div>
                <div className="text-4xl">{item.icon}</div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <h1>Selected Period:</h1>
                <h1 className="font-medium text-xl">{item.selectedPeriod}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
