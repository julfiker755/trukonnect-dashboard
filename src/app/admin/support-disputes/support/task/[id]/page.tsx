'use client';
import useSuccessModal from '@/components/context/sucess-box';
import {
  useApproveStoreMutation,
  useGetSuppDtsQuery,
  useRejectStoreMutation,
} from '@/redux/api/admin/supportApi';
import FlagBox from '@/components/reuseable/flag-box';
import { DateBox, SocialBox } from '@/components/reuseable/social';
import { CloseBtn } from '@/components/reuseable/btn';
import { BackBtn } from '@/components/reuseable/back-btn';
import Navber from '@/components/view/common/dash/navber';
import { ImgBox } from '@/components/reuseable/Img-box';
import CopyBox from '@/components/reuseable/copy-box';
import { Button, Textarea } from '@/components/ui';
import Modal2 from '@/components/reuseable/modal2';
import { useParams, useRouter } from 'next/navigation';
import { helpers } from '@/lib';
import FavIcon from '@/icon/favIcon';
import React, { useState } from 'react';
import { useFormFields } from '@/hooks';

export default function TaskDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [isReject, setIsReject] = useState(false);
  const { openSucc } = useSuccessModal();
  const { data } = useGetSuppDtsQuery({ id });
  const [rejectStore, { isLoading: isRejecting }] = useRejectStoreMutation();
  const [approveStore, { isLoading: isApproving }] = useApproveStoreMutation();
  const { formData, change, errors, validate, reset, setError } = useFormFields({
    node: '',
  });
  const {
    engagement,
    description,
    quantity,
    country,
    total_token,
    link,
    created_at,
    social,
    reviewer,
    note,
  } = data || {};


  //   == SubmitReject ==
  const SubmitReject = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate({
      node: 'Rejection is required',
    });
    if (!isValid) return;
    try {
      const data = {
        rejection_reason: formData.node,
        _method: 'PUT',
      };
      const res = await rejectStore({ id, data }).unwrap();
      if (res.status) {
        setIsReject(false);
        router.back();
        reset();
      }
    } catch (err: any) {
      setError('node', err?.data?.message);
    }
  };

  return (
    <div className="mb-10">
      <Navber
        className="py-3"
        backbtn={
          <div className="items-center hidden lg:flex">
            <BackBtn iconStyle="text-figma-primary" />
            <h1 className="text-lg relative -ml-2 mb-[2px]">Back</h1>
          </div>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-figma-chart p-6 h-fit rounded-xl">
          <h1 className="text-xl mb-4">Task Details</h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg">{engagement?.engagement_name}</h1>
            </div>
            <p className="text-figma-gray">{description || 'N/A'}</p>
            <ul className="space-y-2 [&>li]:flex [&>li]:items-center [&>li]:justify-between">
              <li>
                <span>Quantity</span>
                <span>{quantity || 0}</span>
              </li>
              <li>
                <span>Selected Audience</span>
                <FlagBox href={country?.flag} name={country?.name} />
              </li>
              <li>
                <span>Per user earned Tokens</span>
                <span className="flex items-center">
                  <FavIcon name="coin" className="mr-1 size-5" />
                  {total_token || 0}
                </span>
              </li>
              <li>
                <span>Platform</span>
                <SocialBox href={social?.icon_url} name={social?.name} />
              </li>
              <li>
                <span>Creation Date</span>
                <DateBox date={created_at} />
              </li>
              <li>
                <span>Link</span>
                <CopyBox value={link} />
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10 mt-5">
            <Button onClick={() => setIsReject(true)} variant="secondary">
              Reject
            </Button>
            <Button
              disabled={isApproving}
              onClick={async () => {
                const res = await approveStore({ id }).unwrap();
                if (res.status) {
                  const { close } = await openSucc({
                    title: 'Successfully',
                    description: 'Task approved successfully',
                  });
                  const timer = setTimeout(() => {
                    close();
                    router.back();
                    clearTimeout(timer);
                  }, 2500);
                }
              }}
              variant="primary"
            >
              Approve
            </Button>
          </div>
        </div>
        <div className="bg-figma-chart p-6 h-fit rounded-xl">
          <div>
            <h1 className="text-xl">Issue</h1>
            <p className="text-figma-gray">{note || 'N/A'}</p>
          </div>
          <h1 className="text-xl my-4">Reviewed By</h1>
          <div className="space-y-3">
            <div className="mb-10">
              <ImgBox
                className="size-30 rounded-xl mx-auto"
                src={helpers.imgSource(reviewer?.avatar) || '/avater.png'}
                alt="img"
              ></ImgBox>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Full Name</span>
              <span className="text-white">{reviewer?.name || 'N/A'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Email</span>
              <span className="text-white">{reviewer?.email || 'N/A'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Phone number</span>
              <span className="text-white">{reviewer?.phone || 'N/A'}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Region</span>
              <span className="text-white">{reviewer?.country?.name || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
      {/* ===== account varification reject======= */}
      <Modal2 open={isReject} setIsOpen={setIsReject} className="sm:max-w-sm">
        <form onSubmit={SubmitReject} className="space-y-4">
          <h1 className="font-medium text-xl">Cause of rejection</h1>
          <div>
            <Textarea
              className="resize-none min-h-30 mt-3 bg-figma-blacks border-none"
              placeholder="Write additional note"
              value={formData.node}
              onChange={(e) => change('node', e.target.value)}
            />
            {errors.node && <p className="text-red-500 text-right">{errors.node}</p>}
          </div>
          <CloseBtn
            onClose={() => {
              setIsReject(false);
              reset();
            }}
          />
          <Button disabled={isRejecting} variant="primary" className="w-full">
            Send
          </Button>
        </form>
      </Modal2>
    </div>
  );
}
