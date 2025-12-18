'use client';
import Avatars from '@/components/reuseable/avater';
import { CloseBtn, CloseIcon } from '@/components/reuseable/btn';
import Form from '@/components/reuseable/from';
import { FromInput } from '@/components/reuseable/from-input';
import Modal2 from '@/components/reuseable/modal2';
import { Pagination } from '@/components/reuseable/pagination';
import RadioToggle from '@/components/reuseable/radio-toggle';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { Button, TableCell, TableRow } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import { SingleCalendar } from '@/components/view/common/single-calender';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhoneInput } from '@/components/reuseable/phone-input';
import { useGetReviewerQuery, useStoreReviewerMutation } from '@/redux/api/admin/reviewerApi';
import { ResponseApiErrors } from '@/lib/api-response';
import { useDebounce } from 'use-debounce';
import { reviewerSchema } from '@/schema';
import React, { useState } from 'react';
import FavIcon from '@/icon/favIcon';
import Link from 'next/link';
import { helpers } from '@/lib';
import { useGlobalState } from '@/hooks';


const intGlobal = {
  page: 1,
  search: "",
  countryId: "",
  status: ""
}

export default function ReviewerManagement() {
  const [isStore, setIsStore] = useState(false);
  const [date, setDate] = useState<any>(null);
  const [global, setGlobal] = useGlobalState(intGlobal)
  const [value] = useDebounce(global.search, 1000);
  const { data: reviewer, isLoading } = useGetReviewerQuery({
    page: global.page,
    ...(global.status && { status: global.status }),
    ...(date != null && { from_date: date?.from_date, to_date: date?.to_date }),
    ...(value && { search: value }),
  });

  const headers = ['Reviewer', 'Email', 'Account Re.', 'Task Re.', 'Performance Re.', 'Action'];
  const [storeReviewer, { isLoading: stIsLoading }] = useStoreReviewerMutation();
  const from = useForm({
    resolver: zodResolver(reviewerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
  });


  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    try {
      const value = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        country_id: global.countryId,
      };
      const data = helpers.fromData(value);
      const res = await storeReviewer(data).unwrap();
      if (res.status) {
        handleStReset();
      }
    } catch (err: any) {
      if (err?.data?.error) {
        ResponseApiErrors(err?.data, from);
      }
    }
  };
  const handleStReset = () => {
    from.reset();
    setIsStore(false);
  };

  return (
    <div>
      <Navber
        title="Reviewer Management"
        props={
          <>
            <SearchBox placeholder="Search here" onSearch={(text: any) => setGlobal("search", text)} />
          </>
        }
      />
      <div className="mb-5 flex justify-between items-center space-y-3 lg:space-y-0 flex-wrap">
        <div className="flex flex-wrap items-center">
          <h1 className="lg:mr-2">Select Reviewer:</h1>
          <RadioToggle
            value={global.status}
            onValueChange={(value) => setGlobal("status", value)}
            className="mt-1 lg:mt-0 "
            options={[
              { label: 'Not Banned', value: 'active' },
              { label: 'Banned Reviewer', value: 'banned' },
            ]}
          />
        </div>
        <div className="flex items-center flex-wrap space-y-3 lg:space-y-0 space-x-5">
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
          <Button onClick={() => setIsStore(!isStore)} variant="primary" className="rounded-md">
            Add Reviewer
          </Button>
        </div>
      </div>
      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} tdStyle="!pl-0" />
          ) : reviewer?.data?.length > 0 ? (
            reviewer?.data?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={helpers.imgSource(item?.avatar) || '/avater.png'}
                      fallback={item.name}
                      alt={item.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>

                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <h1 className="ml-3">{item?.verified_accounts_count}</h1>
                </TableCell>
                <TableCell>
                  <h1 className="ml-3">{item?.verified_tasks_count}</h1>
                </TableCell>
                <TableCell>
                  <h1 className="ml-4">{item?.verified_performance_count}</h1>
                </TableCell>

                <TableCell>
                  <Link href={`/admin/reviewer-management/${item.id}`}>
                    <h1 className="flex justify-center cursor-pointer">
                      {' '}
                      <FavIcon name="eye" />
                    </h1>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No Reviewer are available at the moment"
              className="bg-transparent"
            />
          )}
        </CustomTable>

        <Pagination onClick={(v: any) => setGlobal("page", v)} {...reviewer?.meta}></Pagination>
      </div>
      {/* ============= Add New Reviewer ========== */}
      <Modal2 open={isStore} setIsOpen={setIsStore}>
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-center">Add New Reviewer</h1>
          <h1 className="text-sm text-figma-gray text-center">
            Please provide reviewer email & name. Then create a password.
          </h1>
        </div>
        <CloseIcon className="mt-2 mr-3" onClose={() => handleStReset()} />
        <Form from={from} onSubmit={handleSubmit} className="space-y-4">
          <FromInput
            className="h-10"
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            icon={<FavIcon name="user" className="size-4" color="#777777" />}
          />
          <FromInput
            className="h-10"
            name="email"
            label="Email"
            placeholder="Enter your email"
            icon={<FavIcon name="mail" className="size-4" color="#777777" />}
          />
          <PhoneInput
            onChange={(v: any) => {
              setGlobal("countryId", v)
            }}
            label="Contact Number"
            name="phone"
          />
          <FromInput
            className="h-10"
            name="password"
            label="Password"
            placeholder="Password"
            eye={true}
            icon={<FavIcon name="password" className="size-5" color="#777777" />}
          />

          <CloseBtn onClose={() => handleStReset()} />
          <Button disabled={stIsLoading} variant="primary" className="w-full">
            Add
          </Button>
        </Form>
      </Modal2>
    </div>
  );
}
