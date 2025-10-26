'use client';
import { dummyJson } from '@/components/dummy-json';
import Avatars from '@/components/reuseable/avater';
import { CloseBtn, CloseIcon } from '@/components/reuseable/btn';
import { ImgBox } from '@/components/reuseable/Img-box';
import Modal2 from '@/components/reuseable/modal2';
import { Pagination } from '@/components/reuseable/pagination';
import RadioToggle from '@/components/reuseable/radio-toggle';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { Badge, Button, Label, TableCell, TableRow } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import FavIcon from '@/icon/favIcon';
import { PlaceholderImg } from '@/lib';
import Link from 'next/link';
import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const item = [
  {
    user: 'Abir Hossain',
    email: 'abid32@gmail.com',
    purchasedTask: 'Instagram Follows',
    status: 'Pending',
  },
  {
    user: 'Maksud Bhuiya',
    email: 'user123@example.com',
    purchasedTask: 'TikTok Shares',
    status: 'Blocked',
  },
  {
    user: 'Arjun Patel',
    email: 'hello@creativeoutlook.com',
    purchasedTask: 'Facebook Post Likes',
    status: 'Pending',
  },
  {
    user: 'Sita Sharma',
    email: 'info@innovativeideas.com',
    purchasedTask: 'Twitter Retweets',
    status: 'Completed',
  },
  {
    user: 'Kiran Mehta',
    email: 'support@techsolutions.com',
    purchasedTask: 'YouTube Comments',
    status: 'Blocked',
  },
  {
    user: 'Deepak Joshi',
    email: 'reachus@smartsolutions.com',
    purchasedTask: 'YouTube Shares',
    status: 'Completed',
  },
  {
    user: 'Ravi Kumar',
    email: 'contact@brightfuture.com',
    purchasedTask: 'Instagram Shares',
    status: 'Pending',
  },
  {
    user: 'Anita Desai',
    email: 'admin@yourdomain.com',
    purchasedTask: 'YouTube Video Views',
    status: 'Completed',
  },
  {
    user: 'Deepak Singh',
    email: 'reachus@smartsolutions.com',
    purchasedTask: 'TikTok Comments',
    status: 'Blocked',
  },
  {
    user: 'Deepak Verma',
    email: 'reachus@smartsolutions.com',
    purchasedTask: 'Twitter Follows',
    status: 'Blocked',
  },
];

export default function FinancialControls() {
  const [isPreview, setIsPreview] = useState(false);
  const [isValue, setIsValue] = useState('pending');
  const headers = ['User', 'Email', 'Purchased Task', 'Status', 'Action'];
  const [isAction, setIsAction] = useState('');
  const isLoading = false;
  return (
    <div>
      <Navber
        title="Financial Controls"
        props={
          <>
            <SearchBox placeholder="Search here" onSearch={(text: any) => console.log(text)} />
          </>
        }
      />
      <div className="flex items-center flex-wrap justify-between mb-4">
        <h1 className="text-lg font-medium">Select Option</h1>
        <RadioToggle
          value={isValue}
          onValueChange={(value) => setIsValue(value as any)}
          options={[
            { label: 'Pending approval', value: 'pending' },
            { label: 'Completed', value: 'completed' },
            { label: 'Blocked', value: 'blocked' },
          ]}
        />
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
                {/* Account */}
                <TableCell>{item.purchasedTask}</TableCell>
                {/* Contact */}
                <TableCell>
                  <Badge variant={item.status.toLowerCase()}>{item.status}</Badge>
                </TableCell>
                {/* Action Buttons */}
                <TableCell>
                  <h1
                    onClick={() => setIsPreview(true)}
                    className="flex justify-center cursor-pointer"
                  >
                    <FavIcon name="eye" />
                  </h1>
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
      {/* ================== details Modal ========== */}
      <Modal2 open={isPreview} setIsOpen={(v) => setIsPreview(v)} className="sm:max-w-md">
        <div className="space-y-4">
          <CloseIcon className="top-3 right-3" onClose={() => setIsPreview(false)} />
          <div className="mb-10">
            <ImgBox
              className="size-30 rounded-xl mx-auto"
              src={PlaceholderImg()}
              alt="img"
            ></ImgBox>
          </div>
          <div className="space-y-8 mb-6">
            <div>
              <h1 className="font-medium text-xl mb-3">Basic Information</h1>
              <div className="grid grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FavIcon name="user" className="mr-2" />
                    <span className="text-figma-gray">Kevin Piterson</span>
                  </div>
                  <div className="flex items-center">
                    <FavIcon name="email" className="mr-2" />
                    <span className="text-figma-gray">kevin@example.com</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ReactCountryFlag
                      countryCode={'CH'}
                      svg
                      style={{
                        width: '1em',
                        height: '1em',
                      }}
                      title={'Ghana'}
                    />
                    <span className="text-figma-gray ml-2">Ghana</span>
                  </div>
                  <div className="flex items-center">
                    <FavIcon name="phone" className="mr-2" />
                    <span className="text-figma-gray">+1234567890</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-medium text-xl mb-3">Purchased Task</h1>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FavIcon name="likeCount" className="mr-2" />
                  <span className="text-figma-gray">Facebook Likes</span>
                </div>
                <div className="flex items-center">
                  <FavIcon name="tag" className="mr-2" />
                  <span className="text-figma-gray">$56984</span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-medium text-xl mb-3">Change action</h1>
              <div className="space-y-2">
                <RadioGroup
                  value={isAction}
                  onValueChange={(val) => setIsAction(val)}
                  className="flex items-center space-x-2"
                >
                  {[
                    { label: 'Completed', value: 'completed' },
                    { label: 'Blocked', value: 'blocked' },
                  ].map((option) => (
                    <div key={String(option.value)} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={String(option.value)}
                        id={String(option.value)}
                        className="data-[state=checked]:border-figma-primary cursor-pointer data-[state=checked]:bg-figma-primary data-[state=checked]:text-figma-primary"
                      />
                      <Label htmlFor={String(option.value)} className="text-sm text-slate-300">
                        <Badge variant={option.value as any}>{option.label}</Badge>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Button onClick={() => setIsPreview(false)} variant="secondary">
              Cancel
            </Button>
            <Button variant="primary" className="w-full">
              Send
            </Button>
          </div>
        </div>
      </Modal2>
    </div>
  );
}
