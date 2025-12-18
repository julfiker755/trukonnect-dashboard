'use client';
import Avatars from '@/components/reuseable/avater';
import FlagBox from '@/components/reuseable/flag-box';
import { Pagination } from '@/components/reuseable/pagination';
import RadioToggle from '@/components/reuseable/radio-toggle';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { Badge, TableCell, TableRow } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import { useGetUserQuery } from '@/redux/api/admin/userApi';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import FavIcon from '@/icon/favIcon';
import { helpers } from '@/lib';
import Link from 'next/link';


export default function UserManagement() {
  const [isStatus, setIsStatus] = useState('active');
  const [isPage, setIsPage] = useState(1);
  const headers = ['User', 'Role', 'Email', 'Region', 'Contact', 'Referral', 'Action'];
  const [search, setSearch] = useState('');
  const [value] = useDebounce(search, 1000);
  const { data: user, isLoading } = useGetUserQuery({
    page: isPage,
    ...(isStatus && { status: isStatus }),
    ...(value && { search: value }),
  });

  return (
    <div>
      <Navber
        title="User Management"
        props={
          <>
            <SearchBox placeholder="Search here" onSearch={(text: any) => setSearch(text)} />
          </>
        }
      />
      <div className="mb-3 flex flex-wrap justify-between">
        <h1 className="font-medium lg:font-semibold  text-xl">Select Users</h1>
        <RadioToggle
          value={isStatus}
          onValueChange={(value) => setIsStatus(value as any)}
          options={[
            { label: 'Not Banned', value: 'active' },
            { label: 'Banned Reviewer', value: 'banned' },
          ]}
        />
      </div>
      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} tdStyle="!pl-0" />
          ) : user?.data?.length > 0 ? (
            user?.data?.map((item: any, index: any) => (
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

                <TableCell>
                  <Badge variant={helpers.lowerCase(item.role) as any}>
                    {helpers.capitalize(item.role)}
                  </Badge>
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <FlagBox label={false} href={item?.country?.flag} />
                </TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                  <h1 className="ml-3">{item.referral_count}</h1>
                </TableCell>
                <TableCell>
                  <Link
                    href={
                      item.role === 'brand'
                        ? `/admin/user-management/creator/${item.id}`
                        : `/admin/user-management/performer/${item.id}`
                    }
                  >
                    <h1 className="flex justify-center cursor-pointer">
                      <FavIcon name="eye" />
                    </h1>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No users are available at the moment"
            />
          )}
        </CustomTable>
        <Pagination onClick={(v: any) => setIsPage(v)} {...user?.meta}></Pagination>
      </div>
    </div>
  );
}
