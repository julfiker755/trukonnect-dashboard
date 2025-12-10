'use client';
import useSuccessModal from '@/components/context/sucess-box';
import Avatars from '@/components/reuseable/avater';
import { CloseBtn, CloseIcon } from '@/components/reuseable/btn';
import FlagBox from '@/components/reuseable/flag-box';
import { ImgBox } from '@/components/reuseable/Img-box';
import Modal2 from '@/components/reuseable/modal2';
import { Pagination } from '@/components/reuseable/pagination';
import { CustomTable } from '@/components/reuseable/table';
import { TableNoItem } from '@/components/reuseable/table-no-item';
import { TableSkeleton } from '@/components/reuseable/table-skeleton';
import { Badge, Button, Checkbox, TableCell, TableRow, Textarea } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import SearchBox from '@/components/view/common/search-box';
import { useFormFields, useGlobalState } from '@/hooks';
import { useModalState } from '@/hooks/useModalState';
import { useAccApprovedMutation, useAccRejectMutation, useGetAccountQuery } from '@/redux/api/reviewer/accountApi';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import FavIcon from '@/icon/favIcon';
import { helpers } from '@/lib';


const initGlobal: any = {
  page: 1,
  search: "",
  details: {},
  withdrawal: false
}

export default function AccountVarificaton() {
  const [state, updateState] = useModalState({
    isReject: false,
    isPreview: false,
  });
  const [global, setGlobal] = useGlobalState(initGlobal)
  const [value] = useDebounce(global.search, 1000);
  const { openSucc } = useSuccessModal();
  const { data: account, isLoading } = useGetAccountQuery({
    page: global.page,
    ...(value && { search: value }),
  })
  const [accApproved, { isLoading: appLoading }] = useAccApprovedMutation()
  const [accReject, { isLoading: rejectLoading }] = useAccRejectMutation()
  const headers = ['User', 'Role', 'Email', 'Account', 'Region', 'Contact', 'Action'];
  const { formData, change, errors, validate, reset } = useFormFields({
    rejection_reason: '',
  });



  const SubmitReject = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate({
      rejection_reason: 'Rejection is required',
    });
    const data = helpers.fromData(formData)
    if (!isValid) return;
    const res = await accReject({ id: global?.details?.id, data })
    if (res?.data?.status) {
      reset()
      updateState("isReject", false)
    }
  }




  return (
    <div>
      <Navber
        title="Account Verification"
        props={
          <>
            <SearchBox placeholder="Search here" onSearch={(text: any) => setGlobal("search", text)} />
          </>
        }
      />
      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} tdStyle="!pl-0" />
          ) : account?.data?.length > 0 ? (
            account?.data?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item?.user?.avatar}
                      fallback={item.user?.name}
                      alt={item?.user?.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item?.user?.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={helpers.lowerCase(item.user?.role) as any}>
                    {helpers.capitalize(item?.user?.role)}
                  </Badge>
                </TableCell>
                <TableCell>{item?.user?.email}</TableCell>
                <TableCell>{item?.social?.name}</TableCell>
                <TableCell>
                  <FlagBox label={false} href={item?.user?.country?.flag} />
                </TableCell>
                <TableCell>{item?.user?.phone}</TableCell>
                <TableCell>
                  <h1
                    onClick={() => {
                      updateState('isPreview', true)
                      setGlobal("details", item)
                    }}
                    className="flex justify-center cursor-pointer"
                  >
                    {' '}
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
        <Pagination onClick={(v: any) => setGlobal("page", v)} {...account?.meta}></Pagination>
      </div>
      {/* ===== account varification prieview======= */}
      <Modal2
        open={state.isPreview}
        setIsOpen={(v) => updateState('isPreview', v)}
        style={`${state.isReject ? '!opacity-0' : ''}`}
      >
        <div>
          <ImgBox src={global?.details?.profile_image || '/blur.png'} className="w-full h-[250px]" alt="imgbox1">
            <CloseIcon onClose={() => updateState('isPreview', false)} />
          </ImgBox>
          <ul className="*:text-lg my-3">
            <li>
              <span className="text-figma-gray">Username: </span>{global?.details?.profile_name
              }
            </li>
            <li>
              {' '}
              <span className="text-figma-gray">Notes: </span>This is my facebook account
            </li>
          </ul>
          <div className="flex items-center space-x-2">
            <Checkbox checked={global.withdrawal}
              onCheckedChange={(checked) => {
                setGlobal("withdrawal", checked);
              }} />
            <span className="text-figma-gray">Approve for withdrawal</span>
          </div>
          <div className="space-y-3 pt-4">
            <CloseBtn onClose={() => updateState('isPreview', false)} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <Button
                onClick={() => updateState('isReject', true)}
                size="lg"
                variant="secondary"
                className="w-full text-figma-red"
              >
                Reject
              </Button>
              <Button
                disabled={appLoading}
                onClick={async () => {
                  const data1 = {
                    withdrawal: global.withdraw
                  }
                  const data = helpers.fromData(data1)
                  const res = await accApproved({ id: global?.details?.id, data }).unwrap();
                  if (res.status) {
                    const { close } = await openSucc({
                      title: 'Successfully',
                      description: 'You approved the account',
                    });
                    const timer = setTimeout(() => {
                      close();
                      updateState('isPreview', false);
                      setGlobal("withdrawal", false)
                      clearTimeout(timer);
                    }, 2000);
                  }
                }}
                size="lg"
                variant="primary"
                className="w-full"
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
      </Modal2>
      {/* ===== account varification reject======= */}
      <Modal2
        open={state.isReject}
        setIsOpen={(v) => updateState('isReject', v)}
        className="sm:max-w-sm"
      >
        <form onSubmit={SubmitReject} className="space-y-4">
          <h1 className="font-medium text-xl">Cause of rejection</h1>
          <div>
            <Textarea
              className="resize-none min-h-30 mt-3 bg-figma-blacks border-none"
              placeholder="Write additional note"
              value={formData.rejection_reason}
              onChange={(e) => change('rejection_reason', e.target.value)}
            />
            {errors.rejection_reason && <p className="text-red-500 text-right">{errors.rejection_reason}</p>}
          </div>
          <CloseBtn onClose={() => updateState('isReject', false)} />
          <Button disabled={rejectLoading} variant="primary" className="w-full">
            Send
          </Button>
        </form>
      </Modal2>
    </div>
  );
}
