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
import { useGetSuppTaskQuery } from '@/redux/api/admin/supportApi';
import React, { useState } from 'react';
import FavIcon from '@/icon/favIcon';
import { helpers } from '@/lib';
import Link from 'next/link';

export default function SupportDisputes() {
  const [isFilter, setIsFilter] = useState('task');
  const [page, setPage] = useState(1);
  const { data: item, isLoading } = useGetSuppTaskQuery({
    page: page,
    status: isFilter,
  });
  const getHeaders = () => {
    switch (isFilter) {
      case 'task':
        return ['Creator', 'Task Type', 'Quantity', 'Action'];
      case 'order':
        return ['Performers', 'Task Type', 'Action'];
      case 'user':
        return ['User', 'Role', 'Email', 'Region', 'Contact', 'Action'];
      default:
        return [];
    }
  };
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
          value={isFilter}
          onValueChange={(value) => setIsFilter(value as any)}
          options={[
            { label: 'Task  Support', value: 'task' },
            { label: 'Orders Support', value: 'order' },
            { label: 'User Support', value: 'user' },
          ]}
        />
      </div>
      <div>
        <CustomTable headers={getHeaders()}>
          {isLoading ? (
            <TableSkeleton colSpan={getHeaders()?.length} tdStyle="!pl-0" />
          ) : item?.data?.length > 0 ? (
            item?.data?.map((item: any, index: any) => (
              <TableRow key={index}>
                {item.status === 'task' ? (
                  <TableCell>
                    <Avater2 href={item?.reviewer?.avatar} name={item?.reviewer?.name} />
                  </TableCell>
                ) : item.status === 'order' ? (
                  <TableCell className="lg:max-w-[100px]">
                    <Avater2 href={item?.performer?.avatar} name={item?.performer?.name} />
                  </TableCell>
                ) : (
                  item.status === 'user' && (
                    <TableCell>
                      <Avater2
                        href={item?.ticketcreator?.avatar}
                        name={item?.ticketcreator?.name}
                      />
                    </TableCell>
                  )
                )}
                {item.status === 'task' ? (
                  <TableCell>{item?.engagement?.engagement_name}</TableCell>
                ) : (
                  item.status === 'order' && (
                    <TableCell>{item?.task?.engagement?.engagement_name}</TableCell>
                  )
                )}
                {item.status === 'task' && (
                  <TableCell>
                    <h1 className="ml-5">{item?.quantity}</h1>
                  </TableCell>
                )}

                {item.status === 'user' && (
                  <>
                    <TableCell>
                      {' '}
                      <Badge variant={item?.ticketcreator?.role}>
                        {helpers.capitalize(item?.ticketcreator?.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>{item?.ticketcreator?.email}</TableCell>
                    <TableCell>
                      {<FlagBox label={false} href={item?.ticketcreator?.country?.flag} />}
                    </TableCell>
                    <TableCell>{item?.ticketcreator?.phone}</TableCell>
                  </>
                )}

                <TableCell>
                  <Link
                    href={
                      item.status == 'task'
                        ? `/admin/support-disputes/support/task/${item?.id}`
                        : item.status == 'order'
                          ? `/admin/support-disputes/support/orders/${item?.id}`
                          : item.status == 'user'
                            ? `/admin/support-disputes/support/user/${item?.id}`
                            : ''
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
              colSpan={getHeaders()?.length}
              title="No Support & Disputes are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
        <Pagination onClick={(v: any) => setPage(v)} {...(item?.meta || {})}></Pagination>
      </div>
    </div>
  );
}

//  ========= Avater2 ===========
const Avater2 = ({ href, name }: { href: string; name: string }) => {
  return (
    <div className="flex items-center gap-3">
      <Avatars
        src={helpers.imgSource(href) || '/blur.png'}
        alt={'avater' + name}
        fallback={name}
        fallbackStyle="avatar"
      />
      <span>{name}</span>
    </div>
  );
};
