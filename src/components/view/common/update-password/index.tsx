import { CloseIcon } from '@/components/reuseable/btn';
import Form from '@/components/reuseable/from';
import { FromInput } from '@/components/reuseable/from-input';
import { Button } from '@/components/ui';
import FavIcon from '@/icon/favIcon';
import { passwordChangeSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export default function UpdatePassword({ setIsUpdatePassword }: any) {
  const from2 = useForm({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      c_password: '',
    },
  });

  const handlePasswordSubmit = async (values: FieldValues) => {
    console.log(values);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
  };
  return (
    <div>
      <ul className="flex items-center justify-between">
        <li className="opacity-0">0</li>
        <li className="text-2xl font-medium">Update Password</li>
        <li>
          <CloseIcon
            className="static"
            onClose={() => {
              from2.reset();
              setIsUpdatePassword(false);
            }}
          />
        </li>
      </ul>
      <Form from={from2} onSubmit={handlePasswordSubmit}>
        <div className="space-y-6 pt-5">
          <FromInput
            label="Current Password"
            name="current_password"
            placeholder="Enter current password"
            className="h-10"
            icon={<FavIcon name="password" className="size-5" color="#777777" />}
            eye={true}
          />
          <FromInput
            label="New Password"
            name="new_password"
            placeholder="Enter new password"
            className="h-10"
            icon={<FavIcon name="password" className="size-5" color="#777777" />}
            eye={true}
          />
          <FromInput
            label="Retype New Password"
            name="c_password"
            placeholder="Enter retype new password"
            className="h-10"
            icon={<FavIcon name="password" className="size-5" color="#777777" />}
            eye={true}
          />
          <div className="space-y-2">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                from2.reset();
                setIsUpdatePassword(false);
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button className="w-full" variant="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
