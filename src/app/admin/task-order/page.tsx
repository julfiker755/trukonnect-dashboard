'use client';
import Avatars from '@/components/reuseable/avater';
import { Pagination } from '@/components/reuseable/pagination';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { TableCell, TableRow } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import React, { Suspense, useEffect, useState } from 'react';
import RadioToggle from '@/components/reuseable/radio-toggle';
import { useGetTaskQuery } from '@/redux/api/admin/taskApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { useGlobalState } from '@/hooks';
import FavIcon from '@/icon/favIcon';
import { helpers } from '@/lib';
import Link from 'next/link';

const intState = {
  page: 1,
  search: '',
}

function TaskOrderChild() {
  const router = useRouter()
  const [global, setGlobal] = useGlobalState(intState)
  const params = useSearchParams();
  const [status, setIsStatus] = useState("ongoing")
  const [tab, setTab] = useState("task_management")
  const status_v = params.get('status') || 'ongoing';
  const tab_v = params.get('tab') || 'task_management';
  const [value] = useDebounce(global.search, 1000);
  const { data: task, isLoading } = useGetTaskQuery({
    page: global.page,
    tags: tab,
    status: status,
    ...(value && { search: value }),
  })

  //  tab  not reamove 
  useEffect(() => {
    setIsStatus(status_v)
    setTab(tab_v)
  }, [status_v, tab_v]);


  const getHeaders = () => {
    switch (tab) {
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
                className={`font-medium cursor-pointer border-b-3 border-b-transparent ${tab === item.value ? 'text-figma-primary !border-b-figma-primary' : ''
                  }`}
                onClick={() => {
                  setTab(item.value)
                  setIsStatus(item.status)
                  router.push(`?tab=${item.value}&status=${item.status}`);
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div>
            <RadioToggle
              value={status}
              onValueChange={(value) => {
                setIsStatus(value)
                router.push(`?tab=${tab}&status=${value}`);
              }}
              options={
                tab === 'task_management'
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
                  {tab == "task_management" && (
                    <>
                      <TableCell className="relative">
                        <div className="flex items-center gap-3">
                          <Avatars
                            src={helpers.imgSource(item?.creator?.avater) || '/avater.png'}
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
                  {tab == "order_management" && (
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
                          href={`/admin/task-order/${item?.id}`}
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




export default function TaskOrder() {
  return (
    <Suspense>
      <TaskOrderChild />
    </Suspense>
  )
}
