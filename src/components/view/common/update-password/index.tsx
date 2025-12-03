import { FromInput } from '@/components/reuseable/from-input';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import { ResponseApiErrors } from '@/lib/api-response';
import { CloseIcon } from '@/components/reuseable/btn';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import sonner from '@/components/reuseable/sonner';
import Form from '@/components/reuseable/from';
import { passwordChangeSchema } from '@/schema';
import { Button } from '@/components/ui';
import FavIcon from '@/icon/favIcon';
import { authKey, helpers } from '@/lib';
import React from 'react';

export default function UpdatePassword({ setIsUpdatePassword }: any) {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [isError, setIsError] = React.useState<string | null>(null);
  const from2 = useForm({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      c_password: '',
    },
  });

  const handlePasswordSubmit = async (values: FieldValues) => {
    setIsError('');
    const value = {
      current_password: values.current_password,
      password: values.new_password,
      password_confirmation: values.c_password,
    };
    try {
      const data = helpers.fromData(value);
      const res = await changePassword(data).unwrap();
      if (res.status) {
        sonner.success(
          'Password Changed Successfully',
          'You can now login with new password',
          'top-right'
        );
        helpers.setAuthCookie(authKey, res?.data?.new_token);
        setIsUpdatePassword(false);
        from2.reset();
      }
    } catch (err: any) {
      if (err?.data?.message) {
        setIsError(err?.data?.message);
      } else {
        ResponseApiErrors(err.data, from2);
      }
    }
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
          <div>
            <FromInput
              label="Retype New Password"
              name="c_password"
              placeholder="Enter retype new password"
              className="h-10"
              icon={<FavIcon name="password" className="size-5" color="#777777" />}
              eye={true}
            />
            {isError && <p className="text-red-400 mt-3 text-center">{isError}</p>}
          </div>
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
            <Button disabled={isLoading} className="w-full" variant="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
