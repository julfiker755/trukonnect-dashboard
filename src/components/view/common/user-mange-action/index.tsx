'use client';
import { CloseBtn, CloseIcon } from '@/components/reuseable/btn';
import Modal2 from '@/components/reuseable/modal2';
import RadioToggle from '@/components/reuseable/radio-toggle';
import sonner from '@/components/reuseable/sonner';
import { Button, Input, Textarea } from '@/components/ui';
import { useChangeStatusMutation, useSendTokenMutation } from '@/redux/api/admin/userApi';
import { useModalState } from '@/hooks/useModalState';
import { CircleAlert } from 'lucide-react';
import { useFormFields } from '@/hooks';
import FavIcon from '@/icon/favIcon';
import { helpers } from '@/lib';
import React from 'react';

export default function UserManagementAction({ isShow = true, id }: any) {
  const [state, updateState] = useModalState({
    isStatus: false,
    isToken: false,
  });
  const [sendToken, { isLoading: tokenLoading }] = useSendTokenMutation();
  const [changeStatus, { isLoading: statusLoading }] = useChangeStatusMutation();
  //  ===  statusForm ===
  const statusForm = useFormFields({
    status: '',
    rejection_reason: '',
  });
  const handleSubmitStatus = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = statusForm.validate({
      status: 'Status is required',
      rejection_reason: 'Reason is required',
    });

    if (!ok) return;
    const data = helpers.fromData({ rejection_reason: statusForm.formData.rejection_reason });
    const res = await changeStatus({ id, data }).unwrap();
    if (res.status) {
      sonner.success('Status Updated successfully', 'The status was changed successfully');
      updateState('isStatus', false);
      statusForm.reset();
    }
  };
  //  ===  tokenForm ===
  const tokenForm = useFormFields({
    earn_token: '',
  });

  const handleSubmitToken = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = tokenForm.validate({
      earn_token: 'Token is required',
    });

    if (!ok) return;
    const data = helpers.fromData(tokenForm?.formData);
    const res = await sendToken({ id, data }).unwrap();
    if (res.status) {
      sonner.success('Token Sent successfully', 'Please check your gift token');
      updateState('isToken', false);
      tokenForm.reset();
    }
  };

  return (
    <div>
      <ul className="flex flex-wrap  space-y-3 lg:space-y-0 justify-between items-center">
        <li className="text-xl font-medium">Basic Information</li>
        <li className="flex items-center space-x-2">
          {isShow && (
            <Button
              variant="secondary"
              type="button"
              className="rounded-md"
              onClick={() => updateState('isToken', true)}
              disabled={tokenLoading}
            >
              Send Token
            </Button>
          )}
          <Button
            variant="primary"
            onClick={() => updateState('isStatus', true)}
            className="rounded-md"
            type="button"
          >
            Change Status
          </Button>
        </li>
      </ul>
      {/* ============== Change Status  ============== */}
      <Modal2
        open={state.isStatus}
        setIsOpen={(v) => updateState('isStatus', v)}
        className="sm:max-w-sm"
      >
        <form onSubmit={handleSubmitStatus} className="space-y-4">
          <ul className="flex justify-between items-center">
            <li className="font-medium text-2xl">Select option</li>
            <li className="font-medium text-xl">
              <CloseIcon
                className="static"
                onClose={() => {
                  updateState('isStatus', false);
                  statusForm.reset();
                }}
              />
            </li>
          </ul>
          <div>
            <RadioToggle
              value={statusForm.formData.status}
              onValueChange={(v) => statusForm.change('status', v)}
              options={[
                { label: 'Ban User', value: 'banned' },
                { label: 'Not Banned', value: 'active' },
              ]}
              className="flex-col items-start"
            />
            {statusForm.errors.status && (
              <p className="text-red-500 flex justify-end items-center text-right">
                <span className="mr-1"> {statusForm.errors.status}</span> <CircleAlert size={14} />
              </p>
            )}
          </div>
          <div>
            <h1 className="font-medium text-lg mb-1">Cause of ban/unbanned</h1>
            <Textarea
              value={statusForm.formData.rejection_reason}
              onChange={(e) => statusForm.change('rejection_reason', e.target.value)}
              className="resize-none   bg-figma-input scrollbar-hide min-h-30 border-none"
              placeholder="Write additional note"
            />
            {statusForm.errors.rejection_reason && (
              <p className="text-red-500 flex justify-end items-center text-right">
                <span className="mr-1"> {statusForm.errors.rejection_reason}</span>{' '}
                <CircleAlert size={14} />
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <CloseBtn
              onClose={() => {
                updateState('isStatus', false);
                statusForm.reset();
              }}
            />
            <Button disabled={statusLoading} variant="primary" className="w-full">
              Confirm
            </Button>
          </div>
        </form>
      </Modal2>
      {/* ============== Send token as gift  ============== */}
      <Modal2
        open={state.isToken}
        setIsOpen={(v) => updateState('isToken', v)}
        className="sm:max-w-sm"
      >
        <form onSubmit={handleSubmitToken} className="space-y-4">
          <ul className="flex justify-between items-center">
            <li className="font-medium text-2xl">Send token as gift</li>
            <li className="font-medium text-xl">
              <CloseIcon
                className="static"
                onClose={() => {
                  updateState('isToken', false);
                  tokenForm.reset();
                }}
              />
            </li>
          </ul>
          <div>
            <div className="relative">
              <Input
                className="h-10 w-full border-none bg-[#5E5E5E]/20 rounded-sm pl-7"
                placeholder="Enter the number of token"
                value={tokenForm.formData.earn_token}
                onChange={(e) => tokenForm.change('earn_token', e.target.value)}
              />
              <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
                <FavIcon name="coin" className="size-4" />
              </span>
            </div>
            {tokenForm.errors.earn_token && (
              <p className="text-red-500 flex justify-end items-center text-right">
                <span className="mr-1"> {tokenForm.errors.earn_token}</span>{' '}
                <CircleAlert size={14} />
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <CloseBtn
              onClose={() => {
                updateState('isToken', false);
                tokenForm.reset();
              }}
            />
            <Button disabled={tokenLoading} variant="primary" className="w-full">
              Send
            </Button>
          </div>
        </form>
      </Modal2>
    </div>
  );
}
