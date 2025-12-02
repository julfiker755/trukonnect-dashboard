'use client';
import { useFinanStatusUpMutation, useGetFinancialQuery } from '@/redux/api/admin/financialApi';
import { Badge, Button, Label, TableCell, TableRow } from '@/components/ui';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { CustomTable } from '@/components/reuseable/table';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import { Pagination } from '@/components/reuseable/pagination';
import RadioToggle from '@/components/reuseable/radio-toggle';
import Avatars from '@/components/reuseable/avater';
import { CloseIcon } from '@/components/reuseable/btn';
import { ImgBox } from '@/components/reuseable/Img-box';
import Modal2 from '@/components/reuseable/modal2';
import { buildResponse } from '@/lib/api-response';
import React, { useEffect, useState } from 'react';
import FavIcon from '@/icon/favIcon';
import { Arr } from '@/types';
import { useGlobalState } from '@/hooks';
import FlagBox from '@/components/reuseable/flag-box';
import { helpers } from '@/lib';

type filterProps = 'pending' | 'completed' | 'blocked';

const intGlobalState: any = {
  isPreview: false,
  isPage: 1,
  isStatus: '',
  item: {},
};

export default function FinancialControls() {
  const [global, setGlobal] = useGlobalState(intGlobalState);
  const [isSearch, setIsSearch] = useState('');
  const [isFilter, setIsFilter] = useState<filterProps>('pending');
  const headers: Arr<string> = ['User', 'Email', 'Purchased Task', 'Status', 'Action'];
  const query: Record<string, any> = {
    search: isSearch,
    page: global.isPage,
    status: isFilter,
  };

  const { data, isLoading } = useGetFinancialQuery({ ...query });
  const [finanStatusUp] = useFinanStatusUpMutation();
  // useEffect(() => {
  //   console.log('Updated data:', data);
  // }, [data]);
  // const item = !isLoading && buildResponse((data && data[isFilter as keyof typeof data]) || {});
  // console.log('item:', item);

  //  ==== handleStatus ====
  const handleStatus = async () => {
    const data = helpers.fromData({ status: global.isStatus });
    const res = await finanStatusUp({ id: global.item.id, data });
    if (res?.data?.status) {
      setGlobal('isPreview', false);
    }
  };

  // console.log(item);

  return (
    <div>
      <Navber
        title="Financial Controls"
        props={
          <>
            <SearchBox placeholder="Search here" onSearch={(text: any) => setIsSearch(text)} />
          </>
        }
      />
      <div className="flex items-center flex-wrap justify-between mb-4">
        <h1 className="text-lg font-medium">Select Option</h1>
        <RadioToggle
          value={isFilter as filterProps}
          onValueChange={(value) => setIsFilter(value as filterProps)}
          options={[
            { label: 'Pending Approval', value: 'pending' },
            { label: 'Completed', value: 'completed' },
            { label: 'Blocked', value: 'blocked' },
          ]}
        />
      </div>
      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} tdStyle="!pl-0" />
          ) : data && data?.data?.length > 0 ? (
            data.data.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={helpers.imgSource(item.performer?.avatar || '/blur.png')}
                      fallback={item.performer.name}
                      alt={item.performer.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item.performer.name}</span>
                  </div>
                </TableCell>

                <TableCell>{item.performer.email}</TableCell>
                <TableCell>{item?.task?.engagement?.engagement_name}</TableCell>
                <TableCell>
                  <Badge variant={helpers.lowerCase(item.status) as any}>
                    {helpers.capitalize(item.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <h1
                    onClick={() => {
                      setGlobal('isPreview', true);
                      setGlobal('item', item);
                    }}
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
        <Pagination onClick={(v: any) => setGlobal('isPage', v)} {...data?.meta} />
      </div>
      {/* ================== details Modal ========== */}
      {typeof window !== 'undefined' && (
        <Modal2
          open={global.isPreview}
          setIsOpen={(v) => setGlobal('isPreview', v)}
          className="sm:max-w-md"
        >
          <div className="space-y-4">
            <CloseIcon className="top-3 right-3" onClose={() => setGlobal('isPreview', false)} />
            <div className="mb-10">
              <ImgBox
                className="size-30 rounded-xl mx-auto"
                src={helpers.imgSource(global?.item?.performer?.avatar || '/blur.png')}
                alt="img"
              ></ImgBox>
            </div>
            <div className="space-y-8 mb-2">
              <div>
                <h1 className="font-medium text-xl mb-3">Basic Information</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FavIcon name="user" className="mr-2" />
                      <span className="text-figma-gray">{global?.item?.performer?.name}</span>
                    </div>
                    <div className="flex items-center">
                      <FavIcon name="email" className="mr-2" />
                      <span className="text-figma-gray">{global?.item?.performer?.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FlagBox href={global?.item?.task?.country?.flag} />
                      <span className="text-figma-gray ml-2">
                        {global?.item?.task?.country?.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FavIcon name="phone" className="mr-2" />
                      <span className="text-figma-gray">{global?.item?.performer?.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="font-medium text-xl mb-3">Purchased Task</h1>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FavIcon name="likeCount" className="mr-2" />
                    <span className="text-figma-gray">
                      {global?.item?.task?.engagement?.engagement_name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FavIcon name="tag" className="mr-2" />
                    <span className="text-figma-gray">${global?.item?.task?.total_price}</span>
                  </div>
                </div>
              </div>

              {global?.item?.status == 'pending' && (
                <>
                  <div>
                    <h1 className="font-medium text-xl mb-3">Change Action</h1>
                    <div className="space-y-2">
                      <RadioGroup
                        value={global.status}
                        onValueChange={(v) => setGlobal('isStatus', v)}
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
                            <Label
                              htmlFor={String(option.value)}
                              className="text-sm text-slate-300"
                            >
                              <Badge variant={option.value as any}>{option.label}</Badge>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <Button
                      onClick={() => {
                        setGlobal('isPreview', false);
                      }}
                      variant="secondary"
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => handleStatus()} variant="primary" className="w-full">
                      Send
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal2>
      )}
    </div>
  );
}
