"use client";
import { CloseBtn, CloseIcon } from "@/components/reuseable/btn";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import ImgUpload from "@/components/reuseable/img-uplod";
import Modal2 from "@/components/reuseable/modal2";
import { Button } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import { useModalState } from "@/hooks/useModalState";
import FavIcon from "@/icon/favIcon";
import { platformSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const item = [
  { label: "Facebook", icon: "facebook" },
  { label: "Twitter", icon: "twitter" },
  { label: "Instagram", icon: "instagram" },
  { label: "Tiktok", icon: "tiktok" },
  { label: "Youtube", icon: "youtube" },
];

const intAva = {
  preview: null,
};

export default function Engagement() {
  const [platform, setPlatform] = useState<any>(intAva);
  const [state, updateState] = useModalState({
    isStore: false,
  });
  const from = useForm({
    resolver: zodResolver(platformSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(values.icon && { icon: values?.icon }),
    };
    console.log(value);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
  };

  // hanlde reset
  const handleReset = () => {
    from.reset();
    setPlatform(intAva);
  };
  return (
    <div>
      <Navber
        props={
          <>
            <h1 className="text-xl">Engagement Management</h1>
            <SearchBox
              placeholder="Search by user name"
              onSearch={(text: any) => console.log(text)}
            />
          </>
        }
      />
      <ul className="flex justify-between mt-10 mb-4">
        <li>
          {" "}
          <h1 className="text-2xl font-medium">Available Platform</h1>
        </li>
        <li>
          {" "}
          <Button
            onClick={() => updateState("isStore", true)}
            variant="primary"
            className="rounded-md"
          >
            Add New Platform
          </Button>
        </li>
      </ul>

      <div className="flex  flex-wrap gap-10">
        {item.map((item, index) => (
          <Link
            href={`/admin/engagement-management/${item.label}`}
            key={index}
            className="bg-figma-chart w-[200px] py-4 rounded-md grid place-items-center"
          >
            <FavIcon name={item.icon as any} />
            <h1 className="mt-3">{item.label}</h1>
          </Link>
        ))}
      </div>
      {/* =========== Add the Platform Modal========== */}
      <Modal2 open={state.isStore} setIsOpen={(v) => updateState("isStore", v)}>
        <ul className="flex items-center pt-1 justify-between">
          <li className="opacity-0">0</li>
          <li>
            <h1 className="text-xl font-medium text-center">
              Add New Platform
            </h1>
            <h1 className="text-figma-gray text-center">
              You have to provide the logo & name of the platform
            </h1>
          </li>
          <li>
            <CloseIcon
              className="top-4 right-3"
              onClose={() => {
                handleReset();
                updateState("isStore", false);
              }}
            />
          </li>
        </ul>
        <Form from={from} onSubmit={handleSubmit}>
          <div className="space-y-6 pt-10">
            <div>
              <h1 className="mb-2">Upload Logo (JPG/SVG)*</h1>
              <ImgUpload
                onFileSelect={(file: File) => {
                  setPlatform({
                    ...platform,
                    preview: URL.createObjectURL(file),
                  });
                  from.setValue("icon", file);
                }}
              >
                <div className="h-22 bg-figma-chart rounded-md flex flex-col justify-center items-center">
                  {platform.preview ? (
                    <div className="w-[60px] relative h-full my-3">
                      <Image
                        src={platform.preview || "/blur.png"}
                        alt={"alt"}
                        fill
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-center mb-1">
                        <Upload className="text-figma-primary" />
                      </div>
                      <h1 className="text-center text-figma-gray">Upload</h1>
                    </div>
                  )}
                </div>
              </ImgUpload>
              {from?.formState?.errors?.icon && (
                <p className="text-[#f73f4e] flex justify-end items-center gap-1 text-sm">
                  {from?.formState?.errors?.icon?.message as string}
                  <CircleAlert size={14} />
                </p>
              )}
            </div>
            <FromInput
              label="Name"
              name="name"
              placeholder="Enter platform name"
              className="h-10"
            />
            <div className="space-y-2">
              <CloseBtn
                onClose={() => {
                  handleReset();
                  updateState("isStore", false);
                }}
              />
              <Button className="w-full" variant="primary">
                Add
              </Button>
            </div>
          </div>
        </Form>
      </Modal2>
    </div>
  );
}
