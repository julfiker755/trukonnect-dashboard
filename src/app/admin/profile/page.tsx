'use client';
import Avatars from '@/components/reuseable/avater';
import { BackBtn } from '@/components/reuseable/back-btn';
import { CloseIcon } from '@/components/reuseable/btn';
import Form from '@/components/reuseable/from';
import { FromInput } from '@/components/reuseable/from-input';
import ImgUpload from '@/components/reuseable/img-uplod';
import Modal2 from '@/components/reuseable/modal2';
import { Pagination } from '@/components/reuseable/pagination';
import sonner from '@/components/reuseable/sonner';
import { TableNoItem2, TableSkeleton2 } from '@/components/reuseable/table-skeleton2';
import TextEditor from '@/components/reuseable/text-editor';
import { Button } from '@/components/ui';
import Navber from '@/components/view/common/dash/navber';
import UpdatePassword from '@/components/view/common/update-password';
import { ResponseApiErrors } from '@/lib/api-response';
import {
  useAdminStoreMutation,
  useGetAdminQuery,
  useGetPrivacyQuery,
  useGetTermsQuery,
  usePrivacyStoreMutation,
  useTermsStoreMutation,
} from '@/redux/api/admin/profileApi';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/api/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, SquarePen } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { adminSchema } from '@/schema';
import FavIcon from '@/icon/favIcon';
import Image from 'next/image';
import { helpers } from '@/lib';

function ProfileChild() {
  const [isTab, setIsTab] = useState('information');
  const params = useSearchParams();
  const router = useRouter()
  const tab = params.get('tab') || 'information';


  useEffect(() => {
    setIsTab(tab)
  }, [tab]);

  const renderContent = () => {
    switch (isTab) {
      case 'information':
        return <PersonalInformation />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsAndConditions />;
      case 'admin':
        return <AdminList />;
      default:
        return <PersonalInformation />;
    }
  };
  return (
    <div>
      <Navber
        isShow={false}
        className="py-3"
        backbtn={
          <div className="items-center flex">
            <BackBtn className="hidden lg:grid" iconStyle="text-figma-primary" />
            <h1 className="text-xl relative -ml-2"> My Profile</h1>
          </div>
        }
      />
      <ul className="flex flex-wrap space-x-5">
        {[
          { label: 'Personal Information', value: 'information' },
          { label: 'Privacy Policy', value: 'privacy' },
          { label: 'Terms & Conditions', value: 'terms' },
          { label: 'Admin List', value: 'admin' },
        ].map((item) => (
          <li
            key={item.label}
            className={`font-medium cursor-pointer border-b-3 border-b-transparent ${isTab === item.value ? 'text-figma-primary !border-b-figma-primary' : ''
              }`}
            onClick={() => {
              setIsTab(item?.value)
              router.push(`?tab=${item?.value}`);
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div className="mt-10 mx-auto rounded-md">{renderContent()}</div>
    </div>
  );
}


export default function Profile() {
  return (
    <Suspense>
      <ProfileChild />
    </Suspense>
  )
}


// =======================PersonalInformation==================
const intAva = {
  file: null,
  preview: null,
};

const PersonalInformation = () => {
  const [avatar, setAvatar] = useState<any>(intAva);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const { data: profile } = useGetProfileQuery({});
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const from = useForm({
    defaultValues: {
      name: '',
      contact_number: '',
    },
  });

  useEffect(() => {
    if (profile) {
      from.reset({
        name: profile?.data?.name,
        contact_number: profile?.data?.phone,
      });
    }
  }, [profile, from]);

  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      phone: values.contact_number,
      ...(avatar?.file && { avatar: avatar?.file }),
    };
    const data = helpers.fromData(value);
    const res = await updateProfile(data).unwrap();
    if (res.status) {
      sonner.success('Update Successful', 'Profile has been updated successfully');
    }
  };

  return (
    <div className="bg-figma-card">
      <div className="py-5 pb-10 max-w-xl mx-auto">
        <Form from={from} onSubmit={handleSubmit}>
          <div className="space-y-6 pt-5">
            <div className="relative mx-auto size-28 rounded-full">
              <Image
                src={avatar.preview || helpers.imgSource(profile?.data?.avatar) || '/avater.png'}
                alt={'title'}
                fill
                className={'object-cover rounded-full'}
              />
              <ImgUpload
                className="grid place-items-center shadow-md  rounded-full absolute bottom-[6px] -right-1 cursor-pointer"
                onFileSelect={(file: File) => {
                  setAvatar({
                    ...avatar,
                    file,
                    preview: URL.createObjectURL(file),
                  });
                }}
              >
                <div className="size-8 grid place-items-center bg-white  rounded-full">
                  <SquarePen className="text-figma-primary size-5" />
                </div>
              </ImgUpload>
            </div>
            <FromInput
              label="Your Full Name"
              name="name"
              placeholder="Enter Your Name"
              className="h-10"
              icon={<FavIcon color="#A4A4A4" name="user" />}
            />
            <FromInput
              label="Contact Number"
              name="contact_number"
              placeholder="Write Your Contact Number"
              className="h-10"
              icon={<FavIcon color="#A4A4A4" className="size-4" name="phone" />}
              type="number"
            />
            <div className="grid grid-cols-2 gap-5">
              <Button
                variant="secondary"
                type="button"
                className="text-figma-red font-semibold"
                onClick={() => setIsUpdatePassword(true)}
              >
                Update Password
              </Button>
              <Button disabled={isLoading} className="w-full" variant="primary">
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
        {/* ============ update password modal ============ */}
        <Modal2 open={isUpdatePassword} setIsOpen={setIsUpdatePassword}>
          <UpdatePassword setIsUpdatePassword={setIsUpdatePassword} />
        </Modal2>
      </div>
    </div>
  );
};
// ============== privacy policy ==============
const PrivacyPolicy = () => {
  const [content, setContent] = useState<string>('');
  const { data: privacy, isLoading } = useGetPrivacyQuery({});
  const [privacyStore, { isLoading: storeLoading }] = usePrivacyStoreMutation();

  useEffect(() => {
    if (privacy) {
      setContent(privacy?.[0]?.policy || '');
    }
  }, [privacy]);

  //   == handleSave ==
  const handleSave = async () => {
    try {
      const value = {
        policy: content,
      };
      const data = helpers.fromData(value);
      const res = await privacyStore(data).unwrap();

      if (res.status) {
        sonner.success('Update Successful', 'Privacy Policy have been updated');
      }
    } catch (error) {
      sonner.error('Update Failed', 'Failed to update Privacy Policy');
    }
  };

  return (
    <div className="bg-figma-card p-3 rounded-md">
      {isLoading ? (
        <div className="mx-auto min-h-[280px] flex items-center justify-center">
          <Loader className="animate-spin text-reds" />
        </div>
      ) : (
        <TextEditor id="privacy-policy" value={content} onChange={setContent} />
      )}
      <div className="py-5 flex justify-end mx-4">
        <Button
          onClick={() => handleSave()}
          disabled={storeLoading}
          variant="primary"
          className="w-fit"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

// ===============Terms & Conditions============
const TermsAndConditions = () => {
  const [content, setContent] = useState<string>('');
  const { data: terams, isLoading } = useGetTermsQuery({});
  const [termsStore, { isLoading: storeLoading }] = useTermsStoreMutation();

  useEffect(() => {
    if (terams) {
      setContent(terams?.[0]?.terms_conditions || '');
    }
  }, [terams]);

  //   == handleSave ==
  const handleSave = async () => {
    try {
      const value = {
        terms_conditions: content,
      };
      const data = helpers.fromData(value);
      const res = await termsStore(data).unwrap();

      if (res.status) {
        sonner.success('Update Successful', 'Terms & Conditions have been updated');
      }
    } catch (error) {
      sonner.error('Update Failed', 'Failed to update Terms & Conditions');
    }
  };
  return (
    <div className="bg-figma-card p-3 rounded-md">
      {isLoading ? (
        <div className="mx-auto min-h-[280px] flex items-center justify-center">
          <Loader className="animate-spin text-reds" />
        </div>
      ) : (
        <TextEditor id="terms-conditions" value={content} onChange={setContent} />
      )}
      <div className="py-5 flex justify-end mx-4">
        <Button
          onClick={() => handleSave()}
          disabled={storeLoading}
          variant="primary"
          className="w-fit"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

// ===============Admin List============
const AdminList = () => {
  const [page, setIsPage] = useState(1)
  const { data: admin, isLoading } = useGetAdminQuery({
    page: page
  });
  const [adminStore, { isLoading: storeLoading }] = useAdminStoreMutation();
  const [isStore, setIsStore] = useState(false);

  const from = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const handleAdminSubmit = async (values: FieldValues) => {
    try {
      const data = helpers.fromData(values);
      const res = await adminStore(data).unwrap();
      if (res.status) {
        sonner.success('Admin Added Successfully', 'You can now login with new admin');
        from.reset();
        setIsStore(false);
      }
    } catch (err: any) {
      if (err?.data) {
        ResponseApiErrors(err.data, from);
      }
    }
  };
  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => setIsStore(true)} variant="primary" className="rounded-md">
          Add New Admin
        </Button>
      </div>
      <div className="mt-5 bg-figma-card p-4 rounded-md mb-10">
        <table className="w-full">
          <thead className="table-header-group">
            <tr className="table-row">
              <th className="px-6 table-cell py-4 text-left text-sm font-semibold text-white">
                Admin List
              </th>
              <th className="px-6 whitespace-nowrap table-cell py-4 text-center text-sm font-semibold text-white">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="table-row-group">
            {isLoading ? (
              <TableSkeleton2 len={5} colSpan={2} />
            ) : admin?.data?.length > 0 ? (
              admin?.data?.map((item: any) => (
                <tr key={item.id} className="transition-colors table-row">
                  <td className="px-6 py-4 table-cell text-sm">
                    <div className="flex items-center space-x-2">
                      <Avatars
                        src={helpers.imgSource(item.avatar) || ''}
                        fallback={item.name}
                        alt={item.name}
                        fallbackStyle="avatar"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 table-cell text-sm text-center">{item.email}</td>
                </tr>
              ))
            ) : (
              <TableNoItem2 colSpan={2} title="Not Admin Found" />
            )}
          </tbody>
        </table>
        <Pagination onClick={(v: any) => setIsPage(v)} {...admin?.meta}></Pagination>
      </div>
      {/* ============ Add New Admin modal ============ */}
      <Modal2 open={isStore} setIsOpen={setIsStore}>
        <ul className="flex items-center justify-between">
          <li className="opacity-0">0</li>
          <li className="text-2xl font-medium">Add New Admin</li>
          <li>
            <CloseIcon
              className="static"
              onClose={() => {
                from.reset();
                setIsStore(false);
              }}
            />
          </li>
        </ul>
        <Form from={from} onSubmit={handleAdminSubmit}>
          <div className="space-y-6 pt-5">
            <FromInput
              label="Full Name"
              name="name"
              placeholder="Enter Name"
              className="h-10"
              icon={<FavIcon name="user" className="size-5" color="#777777" />}
            />
            <FromInput
              label="Email"
              name="email"
              placeholder="Enter Email"
              className="h-10"
              icon={<FavIcon name="email" className="size-5" color="#777777" />}
            />

            <FromInput
              label="New Password"
              name="password"
              placeholder="Enter Password"
              className="h-10"
              icon={<FavIcon name="password" className="size-5" color="#777777" />}
              eye={true}
            />
            <FromInput
              label="Confirm Password"
              name="password_confirmation"
              placeholder="Enter Password"
              className="h-10"
              icon={<FavIcon name="password" className="size-5" color="#777777" />}
              eye={true}
            />

            <div className="space-y-2">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => {
                  from.reset();
                  setIsStore(false);
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={storeLoading} className="w-full" variant="primary">
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
      </Modal2>
    </div>
  );
};
