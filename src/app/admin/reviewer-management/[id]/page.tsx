'use client';
import { useAcReviewerMutation, useSingleReviewerQuery } from '@/redux/api/admin/reviewerApi';
import AnalyticChart from '@/components/view/reviewer/chart/analytic-chart';
import sonner from '@/components/reuseable/sonner';
import Navber from '@/components/view/common/dash/navber';
import RadioToggle from '@/components/reuseable/radio-toggle';
import { BackBtn } from '@/components/reuseable/back-btn';
import { CloseBtn, CloseIcon } from '@/components/reuseable/btn';
import { ImgBox } from '@/components/reuseable/Img-box';
import Modal2 from '@/components/reuseable/modal2';
import { Button, Textarea } from '@/components/ui';
import { CircleAlert } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useFormFields } from '@/hooks';
import { helpers } from '@/lib';

export default function ReviewDetails() {
  const [isStatus, setIsStatus] = useState(false);
  const { id } = useParams();
  const { data } = useSingleReviewerQuery(id);
  const [acReviewer, { isLoading }] = useAcReviewerMutation();
  const { formData, change, errors, validate } = useFormFields({
    status: '',
    message: '',
  });
  const overviewItem = [
    {
      title: 'Total Verified Task',
      count: data?.totalVerifiedTask,
      bg: 'rgba(194, 255, 212, 0.10)',
    },
    {
      title: 'Total Verified Orders',
      count: data?.totalVerifiedOrder,
      bg: 'rgba(251, 190, 254, 0.10)',
    },
    {
      title: 'Total Verified Accounts',
      count: data?.totalVerifiedOrder,
      bg: 'rgba(190, 223, 254, 0.10)',
    },
  ];

  //   == handleSubmitStatus ==
  const handleSubmitStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate({
      status: 'Status is required',
      message: 'Message is required',
    });
    if (!isValid) return;

    const item = {
      status: formData.status,
      message: formData.message,
    };
    const data = helpers.fromData(item);
    const res = await acReviewer({ id, data }).unwrap();
    if (res.status) {
      sonner.success('Status Updated', 'The status was changed successfully');
      setIsStatus(false);
    }
  };

  return (
    <div>
      <Navber
        isShow={false}
        props={
          <>
            <div className="flex items-center">
              <BackBtn iconStyle="text-figma-primary" />
              <h1 className="text-xl font-medium">Reviewer Details</h1>
            </div>
          </>
        }
      />
      <div className="bg-figma-chart p-6 rounded-xl mb-5">
        <Button
          variant="primary"
          onClick={() => setIsStatus(!isStatus)}
          className="rounded-md float-right"
          type="button"
        >
          Action
        </Button>

        <div className="mt-10">
          <div className="space-y-3">
            <div>
              <ImgBox
                className="size-30 rounded-xl mx-auto"
                src={helpers.imgSource(data?.reviewer?.avatar || '/avater.png')}
                alt="img"
              ></ImgBox>
              <h1 className="text-figma-green text-center mt-1">{data?.reviewer?.status}</h1>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Full name</span>
              <span className="text-white">{data?.reviewer?.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Email</span>
              <span className="text-white">{data?.reviewer?.email}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Phone number</span>
              <span className="text-white">{data?.reviewer?.phone}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Region</span>
              <span className="text-white">{data?.reviewer?.country?.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <div className="space-y-4">
            {overviewItem?.map((item, index) => (
              <div
                key={index}
                className="flex justify-center py-5 px-4 rounded-md"
                style={{
                  background: item.bg,
                }}
              >
                <div>
                  <div className="text-figma-gray text-center">{item.title}</div>
                  <div className="text-2xl font-semibold text-center">{item.count || 0}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <AnalyticChart
            show={false}
            className="bg-transparent p-0"
            item={[
              { name: 'Orders Review', value: data?.totalPendingOrders || 0, color: '#FF6B9D' },
              { name: 'Task Review', value: data?.totalPendingTask || 0, color: '#4ECDC4' },
              {
                name: 'Account Review',
                value: data?.totalPendingAccounts || 0,
                color: '#6366F1',
              },
            ]}
          >
            <div className="mt-6 text-center">
              <p className="text-foreground font-semibold">
                Overall Performance: {data?.overallPerformance}
              </p>
            </div>
          </AnalyticChart>
        </div>
      </div>
      {/* ============== Change Status  ============== */}
      <Modal2 open={isStatus} setIsOpen={setIsStatus} className="sm:max-w-sm">
        <form onSubmit={handleSubmitStatus} className="space-y-4">
          <ul className="flex justify-between items-center">
            <li className="font-medium text-2xl">Select option</li>
            <li className="font-medium text-xl">
              <CloseIcon className="static" onClose={() => setIsStatus(false)} />
            </li>
          </ul>
          <div>
            <RadioToggle
              value={formData.status}
              onValueChange={(v) => change('status', v)}
              options={[
                { label: 'Ban Reviewer', value: 'banned' },
                { label: 'Unban Reviewer', value: 'active' },
              ]}
              className="flex-col items-start"
            />
            {errors.status && (
              <p className="text-red-500 flex justify-end items-center text-right">
                <span className="mr-1"> {errors.status}</span> <CircleAlert size={14} />
              </p>
            )}
          </div>
          <div>
            <h1 className="font-medium text-lg mb-1">Cause of ban/unbanned</h1>
            <Textarea
              value={formData.message}
              onChange={(e) => change('message', e.target.value)}
              className="resize-none   bg-figma-input scrollbar-hide min-h-30 border-none"
              placeholder="Write additional note"
            />
            {errors.message && (
              <p className="text-red-500 flex justify-end items-center text-right">
                <span className="mr-1"> {errors.message}</span> <CircleAlert size={14} />
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
            <CloseBtn onClose={() => setIsStatus(false)} />
            <Button disabled={isLoading} variant="primary" className="w-full">
              Confirm
            </Button>
          </div>
        </form>
      </Modal2>
    </div>
  );
}
