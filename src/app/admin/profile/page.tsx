"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { CloseBtn, CloseIcon } from "@/components/reuseable/btn";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { ImgBox } from "@/components/reuseable/Img-box";
import ImgUpload from "@/components/reuseable/img-uplod";
import Modal2 from "@/components/reuseable/modal2";
import { Button } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import FavIcon from "@/icon/favIcon";
import { PlaceholderImg } from "@/lib";
import Image from "next/image";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const overviewItem = [
  {
    icon: <FavIcon className="size-12" name="review_acounts" />,
    title: "Pending Accounts",
    count: 10,
    bg: "rgba(130, 255, 167, 0.10)",
  },
  {
    icon: <FavIcon className="size-12" name="review_task" />,
    title: "Pending Orders",
    count: 45,
    bg: "rgba(245, 131, 255, 0.10)",
  },
  {
    icon: <FavIcon className="size-12" name="review_performance" />,
    title: "Pending Task",
    count: 45,
    bg: "rgba(145, 137, 255, 0.10)",
  },
];

const intAva = {
  file: null,
  preview: null,
};

export default function Profile() {
  const [avatar, setAvatar] = useState<any>(intAva);
  const [isUpdate, setIsUpdate] = useState(false);
  const from = useForm({
    defaultValues: {
      name: "Suuu Ronaldo",
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
      <div className="bg-[#5E5E5E]/20 p-5 rounded-xl mb-5 py-9">
        <ImgBox
          className="size-30 mx-auto rounded-full"
          src={PlaceholderImg() || "/blur.png"}
          alt="img1"
        />
        <div>
          <h1 className="text-xl">Personal information</h1>
          <ul className="*:text-lg space-y-1 py-3">
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <FavIcon name="user" className="size-4 mr-2" />
                Full Name
              </span>
              <span className="text-figma-gray">Suuu Ronaldo</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <FavIcon name="email" className="size-4 mr-2" />
                Email
              </span>
              <span className="text-figma-gray">suuu.ronaldo@example.com</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="flex items-center">
                <FavIcon name="phone" className="size-4 mr-2" />
                Contact Number
              </span>
              <span className="text-figma-gray">081234567890</span>
            </li>
          </ul>
        </div>
        <div className="mt-5">
          <Button
            onClick={() => setIsUpdate(!isUpdate)}
            size="lg"
            variant="primary"
            className="w-full text-lg"
          >
            Edit <FavIcon className="size-5" name="edit" />
          </Button>
        </div>
      </div>
      <h1 className="font-medium text-lg mb-2">Work Overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {overviewItem?.map((item, index) => (
          <div
            style={{
              background: item.bg,
            }}
            key={index}
            className="p-8 rounded-lg shadow-md text-center space-y-3"
          >
            <div className="flex justify-center">{item.icon}</div>
            <div className="text-figma-gray">{item.title}</div>
            <div className="text-2xl font-semibold">{item.count}</div>
          </div>
        ))}
      </div>
      {/* =========== Profile Update Modal========== */}
      <Modal2 open={isUpdate} setIsOpen={setIsUpdate}>
        <ul className="flex items-center justify-between">
          <li className="opacity-0">0</li>
          <li className="text-xl font-medium">Edit profile</li>
          <li>
            <CloseIcon className="static" onClose={() => setIsUpdate(false)} />
          </li>
        </ul>
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
                <div className="size-8 grid place-items-center bg-white rounded-full">
                  <FavIcon name="upload" />
                </div>
              </ImgUpload>
            </div>
            <FromInput
              label="Your Full Name"
              name="name"
              placeholder="Enter Your title"
              className="h-10"
            />
            <div className="space-y-2">
              <CloseBtn onClose={() => setIsUpdate(false)} />
              <Button className="w-full" variant="primary">
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
      </Modal2>
    </div>
  );
}
