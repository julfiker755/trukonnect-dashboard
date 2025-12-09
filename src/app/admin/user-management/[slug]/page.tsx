'use client';
import Avatars from '@/components/reuseable/avater';
import { BackBtn } from '@/components/reuseable/back-btn';
import FlagBox from '@/components/reuseable/flag-box';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import { useGetReferralsQuery } from '@/redux/api/admin/userApi';
import { SlugParams } from '@/types';
import React, { use } from 'react';

export default function UserDetail({ params }: SlugParams) {
  const { slug } = use(params);
  const { data: referrals, isLoading } = useGetReferralsQuery(slug);

  return (
    <div>
      <Navber
        isShow={false}
        className="py-4"
        backbtn={
          <div className="flex items-center">
            <BackBtn className="hidden lg:grid" iconStyle="text-figma-primary" />
            <h1 className="text-xl font-medium">Referred Users</h1>
          </div>
        }
      />
      <div>
        <Table className="border-separate border-spacing-y-3 my-0">
          <TableBody>
            {isLoading ? (
              <TableSkeleton colSpan={4} tdStyle="!pl-0" />
            ) : referrals?.data?.length > 0 ? (
              referrals?.data?.map((item: any, index: any) => (
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
            ) : (
              <TableNoItem colSpan={4} title="No referred users are available at the moment" />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
