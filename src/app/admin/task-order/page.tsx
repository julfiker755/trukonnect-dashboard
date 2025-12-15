'use client';
import Avatars from '@/components/reuseable/avater';
import { Pagination } from '@/components/reuseable/pagination';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { TableCell, TableRow } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import React from 'react';
import FavIcon from '@/icon/favIcon';
import RadioToggle from '@/components/reuseable/radio-toggle';
import { helpers } from '@/lib';
import Link from 'next/link';
import { useGlobalState } from '@/hooks';
import { useDebounce } from 'use-debounce';
import { useGetTaskQuery } from '@/redux/api/admin/taskApi';


const intState = {
  page: 1,
  search: '',
  status: "ongoing",
  tab: 'task_management'
}

export default function TaskOrder() {
  const [global, setGlobal] = useGlobalState(intState)
  const [value] = useDebounce(global.search, 1000);
  const { data: task, isLoading } = useGetTaskQuery({
    page: global.page,
    tags: global.tab,
    status: global.status,
    ...(value && { search: value }),
  })


  const getHeaders = () => {
    switch (global?.tab) {
      case 'task_management':
        return ['Creator', 'Task Type', 'Quantity', 'Action'];
      case 'order_management':
        return ['Performers', 'Task Type', 'Action'];
      default:
        return [];
    }
  };


  return (
    <div>
      <Navber
        title="Task & Order Management"
        props={
          <>
            <SearchBox placeholder="Search here" onSearch={(text: any) => setGlobal("search", text)} />
          </>
        }
      />

      <div>
        <div className="flex space-y-2 flex-wrap items-center justify-between my-5">
          <ul className="flex space-x-5">
            {[
              { label: 'Task Management', value: 'task_management', status: "ongoing" },
              { label: 'Order Management', value: 'order_management', status: "completed_order" },
            ].map((item) => (
              <li
                key={item.label}
                className={`font-medium cursor-pointer border-b-3 border-b-transparent ${global.tab === item.value ? 'text-figma-primary !border-b-figma-primary' : ''
                  }`}
                onClick={() => {
                  setGlobal("tab", item.value)
                  setGlobal("status", item.status)
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div>
            <RadioToggle
              value={global.status}
              onValueChange={(value) => setGlobal("status", value)}
              options={
                global.tab === 'task_management'
                  ? [
                    { label: 'Active Task', value: 'ongoing' },
                    { label: 'Completed Task', value: 'completed' },
                    { label: 'Rejected Task', value: 'rejected' },
                  ]
                  : [
                    { label: 'Completed Order', value: 'completed_order' },
                    { label: 'Rejected Order', value: 'rejected_order' },
                  ]
              }
            />
          </div>
        </div>
        <div>
          <CustomTable headers={getHeaders()}>
            {isLoading ? (
              <TableSkeleton colSpan={getHeaders()?.length} tdStyle="!pl-0" />
            ) : task?.data?.length > 0 ? (
              task?.data?.map((item: any, index: any) => (
                <TableRow key={index}>
                  {/*  ================ task_management ================ */}
                  {global?.tab == "task_management" && (
                    <>
                      <TableCell className="relative">
                        <div className="flex items-center gap-3">
                          <Avatars
                            src={helpers.imgSource(item?.creator.avater) || '/avater.png'}
                            fallback={item?.creator?.name}
                            alt={item?.creator?.name}
                            fallbackStyle="avatar"
                          />
                          <span>{item?.creator?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item?.engagement?.engagement_name}</TableCell>
                      <TableCell>{item?.quantity}</TableCell>
                      <TableCell>
                        <Link
                          href={`/admin/task-order/task/${item?.id}`}
                          className="flex justify-center cursor-pointer"
                        >
                          <FavIcon name="eye" />
                        </Link>
                      </TableCell>
                    </>
                  )}
                  {/*  =========== order_management ========== */}
                  {global?.tab == "order_management" && (
                    <>
                      <TableCell className="relative">
                        <div className="flex items-center gap-3">
                          <Avatars
                            src={helpers.imgSource(item?.performer?.avater) || '/blur.png'}
                            fallback={item?.performer?.name}
                            alt={item?.performer?.name}
                            fallbackStyle="avatar"
                          />
                          <span>{item?.performer?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item?.task?.engagement?.engagement_name}</TableCell>
                      <TableCell>
                        <Link
                          href={"#"}
                          className="flex justify-center cursor-pointer"
                        >
                          <FavIcon name="eye" />
                        </Link>
                      </TableCell>
                    </>
                  )}

                </TableRow>
              ))
            ) : (
              <TableNoItem
                colSpan={getHeaders()?.length}
                title="No Task are available at the moment"
              />
            )}
          </CustomTable>
          <Pagination onClick={(v: any) => setGlobal("page", v)} {...task?.meta}></Pagination>
        </div>
      </div>
    </div>
  );
}



