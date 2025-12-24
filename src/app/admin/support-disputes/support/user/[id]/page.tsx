'use client';
import { BackBtn } from '@/components/reuseable/back-btn';
import Navber from '@/components/view/common/dash/navber';
import React from 'react';
import { helpers } from '@/lib';
import { ImgBox } from '@/components/reuseable/Img-box';
import { useParams, useRouter } from 'next/navigation';
import { Button, Textarea } from '@/components/ui';
import { useGetSuppDtsQuery, useReplayStoreMutation } from '@/redux/api/admin/supportApi';
import { CircleAlert } from 'lucide-react';
import { useFormFields } from '@/hooks';
import sonner from '@/components/reuseable/sonner';

export default function UsersDetails() {
  const { id } = useParams();
  const router = useRouter()
  const { data } = useGetSuppDtsQuery({ id, arg: { type: 'user' } });
  const {
    issue,
    reviewer
  } = data || {};
  const [replayStore, { isLoading }] = useReplayStoreMutation()

  const replayForm = useFormFields({
    reply: '',
  });

  const handleSubmitReplay = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = replayForm.validate({
      reply: 'Reply is required',
    });
    if (!ok) return;
    const value = {
      reply: replayForm.formData.reply,
      _method: 'PUT',
    }
    const data = helpers.fromData(value);
    const res = await replayStore({ id, data }).unwrap();
    if (res.status) {
      replayForm.reset();
      router.back()
      sonner.success("Reply Successful", "Your reply has been successfully.", "bottom-right");;
    }
  };

  console.log(data)

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
        <div className="bg-figma-chart p-6 rounded-xl">
          <h1 className="text-xl mb-4">Issue</h1>
          <div className="space-y-4">
            <p className="text-figma-gray">
              {issue}
            </p>

          </div>
          <form onSubmit={handleSubmitReplay} className="mt-10">
            <h1 className="text-lg">Your reply*</h1>
            <div className='mb-7'>
              <Textarea
                className="resize-none min-h-30 mt-3 bg-figma-blacks border-none"
                placeholder="Write additional note"
                value={replayForm.formData.reply}
                onChange={(e) => replayForm.change('reply', e.target.value)}
              />
              {replayForm?.errors?.reply && (
                <p className="text-red-500 flex justify-end items-center text-right">
                  <span className="mr-1"> {replayForm?.errors?.reply}</span>{' '}
                  <CircleAlert size={14} />
                </p>
              )}
            </div>
            <Button disabled={isLoading} variant="primary" className="w-full">
              Send
            </Button>
          </form>
        </div>
        <div className="bg-figma-chart p-6 h-fit rounded-xl">
          <h1 className="text-xl mb-4">Reviewed By</h1>
          <div className="space-y-3">
            <div className="mb-10">
              <ImgBox
                className="size-30 rounded-xl mx-auto"
                src={helpers.imgSource(reviewer?.avatar) || '/avater.png'}
                alt="img"
              ></ImgBox>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Full name</span>
              <span className="text-white">{reviewer?.name}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Email</span>
              <span className="text-white">{reviewer?.email}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Phone number</span>
              <span className="text-white">{reviewer?.phone}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-figma-gray">Region</span>
              <span className="text-white">Ghana</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
