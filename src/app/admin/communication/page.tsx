'use client';
import { useBulkEmailStoreMutation, useBulkNotiStoreMutation } from '@/redux/api/admin/comtionApi';
import { FromTextArea } from '@/components/reuseable/from-textarea';
import { FromInput } from '@/components/reuseable/from-input';
import { zodResolver } from '@hookform/resolvers/zod';
import Navber from '@/components/view/common/dash/navber';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, Textarea } from '@/components/ui';
import Form from '@/components/reuseable/from';
import sonner from '@/components/reuseable/sonner';
import { useFormFields } from '@/hooks';
import { bulkSchema } from '@/schema';
import { CircleAlert } from 'lucide-react';
import { delay, helpers } from '@/lib';
import React from 'react';

export default function Communication() {
  const [bulkEmailStore, { isLoading: isEmailLoading }] = useBulkEmailStoreMutation();
  const [bulkNotiStore, { isLoading: isNotiLoading }] = useBulkNotiStoreMutation();
  const { formData, change, errors, validate, reset } = useFormFields({
    message: '',
  });

  const handleSubmitNoti = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate({
      message: 'Message is required',
    });
    if (!isValid) return;
    const item = {
      message: formData.message,
    };
    const data = helpers.fromData(item);
    await bulkNotiStore(data).unwrap();
    await delay(2000)
    sonner.success('Notification Sent', 'Notification sent successfully', 'bottom-right');
    reset()
  };

  // == from ==
  const from = useForm({
    resolver: zodResolver(bulkSchema),
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const item = {
      subject: values.subject,
      body: values.message,
    };
    const data = helpers.fromData(item);
    await bulkEmailStore(data).unwrap();
    await delay(2000)
    sonner.success('Email Sent', 'Email sent successfully', 'bottom-right');
    from.reset()
  };

  return (
    <div>
      <Navber title="Communication" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-figma-card p-4 rounded-lg pb-6 relative">
          <h1 className="text-xl font-medium mb-4">Send Bulk Email</h1>
          <Form className="space-y-8" from={from} onSubmit={handleSubmit}>
            <FromInput
              className="h-10"
              name="subject"
              label="Subject"
              placeholder="Write the Subject"
            />
            <FromTextArea
              name="message"
              label="Message"
              placeholder="Write the Message"
              className="min-h-[100px]"
            />

            <Button disabled={isEmailLoading} variant="primary" className="w-full">
              {isEmailLoading ? "Sending..." : "Send"}
            </Button>
          </Form>
        </div>
        <div className="bg-figma-card p-4 rounded-lg h-fit">
          <h1 className="text-xl font-medium mb-10">Send Bulk Notifications</h1>
          <form onSubmit={handleSubmitNoti}>
            <div className="mb-8">
              <h1 className="mb-2">Notification text</h1>
              <Textarea
                value={formData.message}
                onChange={(e) => change('message', e.target.value)}
                name="message"
                placeholder="Write the notification text"
                className="resize-none  field-sizing-content bg-figma-input min-h-[100px] border-none"
              />
              {errors.message && (
                <p className="text-red-500 flex justify-end items-center text-right">
                  <span className="mr-1"> {errors.message}</span> <CircleAlert size={14} />
                </p>
              )}
            </div>
            <Button disabled={isNotiLoading} variant="primary" className="w-full">
              {isNotiLoading ? "Sending.." : " Send"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
