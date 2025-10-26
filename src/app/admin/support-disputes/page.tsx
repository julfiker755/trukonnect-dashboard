'use client';
import { dummyJson } from '@/components/dummy-json';
import Avatars from '@/components/reuseable/avater';
import { Pagination } from '@/components/reuseable/pagination';
import RadioToggle from '@/components/reuseable/radio-toggle';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { Badge, TableCell, TableRow } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import FavIcon from '@/icon/favIcon';
import { helpers } from '@/lib';
import Link from 'next/link';
import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

const item = [
  { creator: 'Abir', taskType: 'Instagram Follows', quantity: 150 },
  { creator: 'Maksud', taskType: 'TikTok Shares', quantity: 100 },
  { creator: 'Arjun', taskType: 'Facebook Post Likes', quantity: 250 },
  { creator: 'Sita', taskType: 'Twitter Retweets', quantity: 100 },
  { creator: 'Kiran', taskType: 'YouTube Comments', quantity: 250 },
  { creator: 'Ravi', taskType: 'Instagram Shares', quantity: 300 },
  { creator: 'Anita', taskType: 'YouTube Video Views', quantity: 50 },
  { creator: 'Deepak', taskType: 'TikTok Comments', quantity: 150 },
  { creator: 'Deepak', taskType: 'Twitter Follows', quantity: 350 },
  { creator: 'Deepak', taskType: 'YouTube Shares', quantity: 400 },
  { creator: 'Anita', taskType: 'Instagram Likes', quantity: 600 },
];

const item2 = [
  {
    user: 'Abir',
    role: 'performer',
    email: 'abid32@gmail.com',
    account: 'Facebook',
    region: 'Ghana',
    contact: '+233 5487542',
    countryFlag: 'GH',
  },
  {
    user: 'Maksud',
    role: 'creator',
    email: 'user123@example.com',
    account: 'Instagram',
    region: 'Italy',
    contact: '+234 5485684',
    countryFlag: 'IT',
  },
  {
    user: 'Arjun',
    role: 'performer',
    email: 'hello@creativeoutlook.com',
    account: 'Tik Tok',
    region: 'Ghana',
    contact: '+233 5487542',
    countryFlag: 'GH',
  },
  {
    user: 'Sita',
    role: 'creator',
    email: 'info@innovativeideas.com',
    account: 'Twitter',
    region: 'Nigeria',
    contact: '+234 5485684',
    countryFlag: 'NG',
  },
  {
    user: 'Kiran',
    role: 'performer',
    email: 'support@techsolutions.com',
    account: 'Youtube',
    region: 'Ghana',
    contact: '+233 5487542',
    countryFlag: 'GH',
  },
  {
    user: 'Ravi',
    role: 'creator',
    email: 'contact@brightfuture.com',
    account: 'Facebook',
    region: 'Ghana',
    contact: '+233 5487542',
    countryFlag: 'GH',
  },
  {
    user: 'Anita',
    role: 'performer',
    email: 'admin@yourdomain.com',
    account: 'Instagram',
    region: 'Italy',
    contact: '+234 5485684',
    countryFlag: 'IT',
  },
  {
    user: 'Deepak',
    role: 'creator',
    email: 'reachus@smartsolutions.com',
    account: 'Twitter',
    region: 'Ghana',
    contact: '+233 5487542',
    countryFlag: 'GH',
  },
  {
    user: 'Deepak',
    role: 'performer',
    email: 'reachus@smartsolutions.com',
    account: 'Tik Tok',
    region: 'Nigeria',
    contact: '+234 5485684',
    countryFlag: 'NG',
  },
];

export default function SupportDisputes() {
  const [isValue, setIsValue] = useState('task _support');
  const headers2 = ['Creator', 'Task Type', 'Quantity', 'Action'];
  const isLoading = false;
  return (
    <div>
      <Navber
        title="Support & Disputes"
        props={
          <>
            <SearchBox placeholder="Search here" onSearch={(text: any) => console.log(text)} />
          </>
        }
      />
      <div className="flex items-center flex-wrap justify-between mb-4">
        <h1 className="text-lg">Select Option</h1>
        <RadioToggle
          value={isValue}
          onValueChange={(value) => setIsValue(value as any)}
          options={[
            { label: 'Task  support', value: 'task _support' },
            { label: 'Orders support', value: 'orders_support' },
            { label: 'User support', value: 'user_support' },
          ]}
        />
      </div>
      {isValue === 'task _support' || isValue === 'orders_support' ? (
        <TaskOrderTable isLoading={isLoading} item={item} urlValue={isValue} />
      ) : (
        <UsersSupportTable isLoading={isLoading} item={item2} />
      )}
    </div>
  );
}

// TaskOrderTable
const TaskOrderTable = ({ isLoading, item, urlValue }: any) => {
  const headers = ['Creator', 'Task Type', 'Quantity', 'Action'];
  return (
    <div>
      <CustomTable headers={headers}>
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-0 !bg-background" />
        ) : item.length > 0 ? (
          item.map((item: any, index: any) => (
            <TableRow key={index}>
              {/* User */}
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={''}
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
                    urlValue === 'task _support'
                      ? `/admin/support-disputes/support/task/3`
                      : '/admin/support-disputes/support/orders/6'
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

const UsersSupportTable = ({ isLoading, item }: any) => {
  const headers = ['User', 'Role', 'Email', 'Account', 'Region', 'Contact', 'Action'];
  return (
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
                    src={item?.avatar}
                    fallback={item.user}
                    alt={item.user}
                    fallbackStyle="avatar"
                  />
                  <span>{item.user}</span>
                </div>
              </TableCell>

              {/* Role */}
              <TableCell>
                <Badge variant={item.role}>{helpers.capitalize(item.role)}</Badge>
              </TableCell>
              {/* Email */}
              <TableCell>{item.email}</TableCell>
              {/* Account */}
              <TableCell>{item.account}</TableCell>
              {/* Region */}
              <TableCell>
                <ReactCountryFlag
                  countryCode={item.countryFlag}
                  svg
                  style={{
                    width: '2em',
                    height: '1em',
                  }}
                  title={item.region}
                />
              </TableCell>
              {/* Contact */}
              <TableCell>{item.contact}</TableCell>
              {/* Action Buttons */}
              <TableCell>
                <Link
                  href={`/admin/support-disputes/support/user/88`}
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
      <Pagination onClick={(v: any) => console.log(v)} {...dummyJson.meta}></Pagination>
    </div>
  );
};
