'use client';
import Avatars from '@/components/reuseable/avater';
import { BackBtn } from '@/components/reuseable/back-btn';
import FlagBox from '@/components/reuseable/flag-box';
import { ImgBox } from '@/components/reuseable/Img-box';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import UserManagementAction from '@/components/view/common/user-mange-action';
import FavIcon from '@/icon/favIcon';
import { helpers, PlaceholderImg } from '@/lib';
import { useGetuserManDtsQuery } from '@/redux/api/admin/userApi';
import { IdParams } from '@/types';
import Link from 'next/link';
import React, { use } from 'react';
import ReactCountryFlag from 'react-country-flag';

const item = [
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

function UserDetail({ params }: IdParams) {
  const { id } = use(params);
  console.log(id);
  const { data, isLoading } = useGetuserManDtsQuery(id);

  const overviewItem = [
    {
      icon: <FavIcon name="coin" />,
      title: 'Total earned tokens',
      count: data?.total_earned_toke,
      bg: 'rgba(194, 255, 212, 0.10)',
      circle: 'rgba(255, 218, 45, 0.10)',
    },
    {
      icon: <FavIcon name="withdrawals" />,
      title: 'Total withdrawals',
      count: data?.total_withdrawal,
      bg: 'rgba(251, 190, 254, 0.10)',
      circle: 'rgba(124, 179, 66, 0.10)',
    },
    {
      icon: <FavIcon name="totaltask" />,
      title: 'Total Perform Task',
      count: data?.total_task_perform,
      bg: 'rgba(190, 223, 254, 0.10)',
      circle: 'rgba(255, 172, 48, 0.10)',
    },
  ];

  return (
    <div>
      <Navber
        isShow={false}
        className="py-4"
        backbtn={
          <div className="flex items-center">
            <BackBtn className="hidden lg:grid" iconStyle="text-figma-primary" />
            <h1 className="text-xl font-medium">Performer Details</h1>
          </div>
        }
      />
      <div className="bg-figma-chart p-5 rounded-xl mb-5">
        <UserManagementAction />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 2xl:gap-20 mt-10">
          <div className="space-y-3">
            <div>
              <ImgBox
                className="size-30 rounded-xl mx-auto"
                src={helpers.imgSource(data?.user_details?.avatar)}
                alt="img"
              ></ImgBox>
              <h1 className="text-figma-green text-center mt-1">{data?.user_details?.status}</h1>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Full name</span>
              <span className="text-white">{data?.user_details?.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Email</span>
              <span className="text-white">{data?.user_details?.email}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Phone number</span>
              <span className="text-white">{data?.user_details?.phone}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Region</span>
              <span className="text-white">{data?.user_details?.country.name}</span>
            </div>
          </div>

          <div className="space-y-4">
            {overviewItem?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-5 px-4 rounded-md"
                style={{
                  background: item.bg,
                }}
              >
                <div>
                  <div className="text-figma-gray">{item.title}</div>
                  <div className="text-2xl font-semibold">{item.count || 0}</div>
                </div>
                <div
                  style={{
                    background: item.circle,
                  }}
                  className="grid place-items-center size-13 rounded-full"
                >
                  {item.icon}
                </div>
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
            href={`/admin/user-management/${data?.user_details?.id}`}
          >
            See All
          </Link>
        </li>
      </ul>
      <div>
        <Table className="border-separate border-spacing-y-3 my-0">
          <TableBody>
            {data?.referred_user.length > 0 ? (
              isLoading ? (
                <TableSkeleton colSpan={4} tdStyle="!pl-0" />
              ) : (
                data?.referred_user.map((item: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell className="relative">
                      <div className="flex items-center gap-3">
                        <Avatars
                          src={item?.avatar}
                          fallback={item.name}
                          alt={item.name}
                          fallbackStyle="avatar"
                        />
                        <span>{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      <FlagBox href={item?.country?.flag} name={item?.country?.name} />
                    </TableCell>
                  </TableRow>
                ))
              )
            ) : (
              <TableNoItem
                colSpan={4}
                title="No Referred User are available at the moment"
                tdStyle="!bg-background"
              />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default UserDetail;
