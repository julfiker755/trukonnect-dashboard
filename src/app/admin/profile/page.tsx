"use client";
import Avatars from "@/components/reuseable/avater";
import { BackBtn } from "@/components/reuseable/back-btn";
import { CloseIcon } from "@/components/reuseable/btn";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import ImgUpload from "@/components/reuseable/img-uplod";
import Modal2 from "@/components/reuseable/modal2";
import TextEditor from "@/components/reuseable/text-editor";
import { Button } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import FavIcon from "@/icon/favIcon";
import { PlaceholderImg } from "@/lib";
import { adminSchema, passwordChangeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function Profile() {
  const [isTab, setIsTab] = useState("personal_information");

  const renderContent = () => {
    switch (isTab) {
      case "personal_information":
        return <PersonalInformation />;
      case "privacy_policy":
        return <PrivacyPolicy />;
      case "terms_conditions":
        return <TermsAndConditions />;
      case "admin_list":
        return <AdminList />;
      default:
        return <PersonalInformation />;
    }
  };
  return (
    <div>
      <Navber
        isShow={false}
        props={
          <>
            <h1 className="text-xl flex items-center">
              <BackBtn />
              My Profile
            </h1>
          </>
        }
      />
      <ul className="flex space-x-5">
        {[
          { label: "Personal Information", value: "personal_information" },
          { label: "Privacy Policy", value: "privacy_policy" },
          { label: "Terms & Conditions", value: "terms_conditions" },
          { label: "Admin List", value: "admin_list" },
        ].map((item) => (
          <li
            key={item.label}
            className={`font-medium cursor-pointer border-b-3 border-b-transparent ${
              isTab === item.value
                ? "text-figma-primary !border-b-figma-primary"
                : ""
            }`}
            onClick={() => setIsTab(item.value)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div className="mt-10 mx-auto rounded-md">
        {renderContent()}
      </div>
    </div>
  );
}

// =======================PersonalInformation==================
const intAva = {
  file: null,
  preview: null,
};

const PersonalInformation = () => {
  const [avatar, setAvatar] = useState<any>(intAva);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const from = useForm({
    defaultValues: {
      name: "Suuu Ronaldo",
      contact_number: "01741703755",
      thumbnail: null,
    },
  });

  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(avatar?.file && { image: avatar?.file }),
    };
    console.log(value);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
  };

  const from2 = useForm({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      c_password: "",
    },
  });

  const handlePasswordSubmit = async (values: FieldValues) => {
    console.log(values);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
  };
  return (
    <div className="bg-figma-card">
       <div className="py-5 pb-10 max-w-xl mx-auto">
      <Form from={from} onSubmit={handleSubmit}>
        <div className="space-y-6 pt-5">
          <div className="relative mx-auto size-28 rounded-full">
            <Image
              src={avatar.preview || PlaceholderImg() || "/blur.png"}
              alt={"title"}
              fill
              className={"object-cover rounded-full"}
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
              className="text-figma-red font-semibold"
              onClick={() => setIsUpdatePassword(true)}
            >
              Update Password
            </Button>
            <Button className="w-full" variant="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </Form>
      {/* ============ update password modal ============ */}
      <Modal2 open={isUpdatePassword} setIsOpen={setIsUpdatePassword}>
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
              placeholder="***********"
              className="h-10"
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
              eye={true}
            />
            <FromInput
              label="New Password"
              name="new_password"
              placeholder="***********"
              className="h-10"
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
              eye={true}
            />
            <FromInput
              label="Retype New Password"
              name="c_password"
              placeholder="***********"
              className="h-10"
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
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
      </Modal2>
    </div>
    </div>
  );
};
// ============== privacy policy ==============
const PrivacyPolicy = () => {
  const [content, setContent] = useState<string>("");
  return (
    <div className="bg-figma-card">
      {/* {termsLoading ? (
        <div className="mx-auto min-h-[280px] flex items-center justify-center">
          <Loader className="animate-spin text-reds" />
        </div>
      ) : (
        <TextEditor value={content} onChange={setContent} />
      )} */}
      <TextEditor value={content} onChange={setContent} />
      <div className="py-5 flex justify-end mx-4">
        <Button variant="primary" className="w-fit">
          Save Changes
        </Button>
      </div>
    </div>
  );
};
// ===============Terms & Conditions============
const TermsAndConditions = () => {
  const [content, setContent] = useState<string>("");
  return (
    <div className="bg-figma-card">
      {/* {termsLoading ? (
        <div className="mx-auto min-h-[280px] flex items-center justify-center">
          <Loader className="animate-spin text-reds" />
        </div>
      ) : (
        <TextEditor value={content} onChange={setContent} />
      )} */}
      <TextEditor value={content} onChange={setContent} />
      <div className="py-5 flex justify-end mx-4">
        <Button variant="primary" className="w-fit">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

// ===============Admin List============
const adminData = [
  { name: "Abu Hossain", email: "abu123@gmail.com" },
  { name: "Mukibul Bhuiya", email: "user123@example.com" },
  { name: "Arjun Patel", email: "hello@smartfuturelabs.co" },
  { name: "Gita Sharma", email: "info@innovativeworkdesk.com" },
  { name: "Kiran Mehta", email: "support@smartsolutions.com" },
  { name: "Ravi Kumar", email: "contact@agrifuture.com" },
  { name: "Anita Desai", email: "admin@yourdomain.com" },
  { name: "Deepak Singh", email: "reach@smartsolutions.com" },
  { name: "Deepak Verma", email: "reach@smartsolutions.com" },
  { name: "Deepak Joshi", email: "reach@smartsolutions.com" },
];

const AdminList = () => {
  const [isStore, setIsStore] = useState(false);
  const from = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleAdminSubmit = async (values: FieldValues) => {
    console.log(values);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
  };
  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => setIsStore(true)}
          variant="primary"
          className="rounded-md"
        >
          Add New Admin
        </Button>
      </div>
      <div className="mt-5 bg-figma-card p-4 rounded-md mb-10">
        <div className="table w-full">
          {/* Table Header */}
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell px-6 py-4 text-left text-sm font-semibold text-white">
                Admin List
              </div>
              <div className="table-cell px-6 py-4 text-center text-sm font-semibold text-white">
                Email
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="table-row-group">
            {adminData.map((item, index) => (
              <div key={index} className="table-row transition-colors">
                <div className="table-cell px-6 py-4 text-sm">
                   <div className="flex items-center space-x-2">
                    <Avatars
                    src={""}
                    fallback={item.name}
                    alt={item.name}
                    fallbackStyle="avatar"
                  />
                  <span>{item.name}</span>
                    </div>
                </div>
                <div className="table-cell px-6 py-4 text-sm text-center">
                  {item.email}
                </div>
              </div>
            ))}
          </div>
        </div>
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
              placeholder="Enter Your Name"
              className="h-10"
              icon={<FavIcon name="user" className="size-5" color="#777777" />}
            />
            <FromInput
              label="Email"
              name="email"
              placeholder="Enter Your Email"
              className="h-10"
              icon={<FavIcon name="email" className="size-5" color="#777777" />}
            />
            <FromInput
              label="New Password"
              name="password"
              placeholder="Enter New Password"
              className="h-10"
              icon={
                <FavIcon name="password" className="size-5" color="#777777" />
              }
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
              <Button className="w-full" variant="primary">
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
      </Modal2>
    </div>
  );
};
