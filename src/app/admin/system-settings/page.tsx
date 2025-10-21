"use client";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import ImgUpload from "@/components/reuseable/img-uplod";
import { Button, Skeleton } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import { useGetCountryQuery } from "@/redux/api/countryApi";
import { countrySchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Upload } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import React, { useState } from "react";
import Image from "next/image";
import FavIcon from "@/icon/favIcon";
import { helpers } from "@/lib";

const intFlag = {
  preview: null,
};

export default function SystemSettings() {
  const [flag, setIsFlag] = useState<any>(intFlag);
  const { data: country, isLoading } = useGetCountryQuery({});
  const from = useForm({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      flag: null,
      name: "",
      dial_code: "",
      currency_code: "",
      token_rate: "",
    },
  });

  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      ...(values.flag && { flag: values?.flag }),
    };
    console.log(value);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
  };

  return (
    <div>
      <Navber title="System Settings" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-figma-card p-4 rounded-lg pb-6">
          <h1 className="text-2xl font-semibold mb-4">Add New Country</h1>
          <Form from={from} onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h1 className="mb-2">Upload Flag (JPG/SVG)*</h1>
                <ImgUpload
                  onFileSelect={(file: File) => {
                    setIsFlag({
                      ...flag,
                      preview: URL.createObjectURL(file),
                    });
                    from.setValue("flag", file as any);
                  }}
                >
                  <div className="h-22 bg-figma-chart rounded-md flex flex-col justify-center items-center">
                    {flag.preview ? (
                      <div className="w-[60px] relative h-full my-3">
                        <Image
                          src={flag.preview || "/blur.png"}
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
                {from?.formState?.errors?.flag && (
                  <p className="text-[#f73f4e] flex justify-end items-center gap-1 text-sm">
                    {from?.formState?.errors?.flag?.message as string}
                    <CircleAlert size={14} />
                  </p>
                )}
              </div>
              <FromInput
                label="Country Name"
                name="name"
                placeholder="Write the country name"
                className="h-10"
              />
              <FromInput
                label="Dialing Code"
                name="dial_code"
                placeholder="Write the dialing code"
                className="h-10"
              />

              <FromInput
                label="Token Rate"
                name="token_rate"
                placeholder="Enter rate per token"
                className="h-10"
                type="number"
              />
              <FromInput
                label="Currency Code"
                name="currency_code"
                placeholder="Write the currency"
                className="h-10"
              />
              <Button className="w-full" variant="primary">
                Add
              </Button>
            </div>
          </Form>
        </div>
        <div className="bg-figma-card p-4 rounded-lg h-fit">
          <h1 className="text-2xl font-semibold mb-4">
            Current Supported Countries
          </h1>
          <div>
            <div className="table w-full">
              {/* Table Header */}
              <div className="table-header-group">
                <div className="table-row">
                  <div className="table-cell px-6 py-4 text-left text-sm font-semibold text-white">
                    Country
                  </div>
                  <div className="table-cell px-6 py-4 text-center text-sm font-semibold text-white">
                    Dialing Code
                  </div>
                  <div className="table-cell px-6 py-4 text-center text-sm font-semibold text-white">
                    Token Rate
                  </div>
                  <div className="table-cell px-6 py-4 text-center text-sm font-semibold text-white">
                    Currency Code
                  </div>
                  <div className="table-cell px-6 py-4 text-center text-sm font-semibold text-white">
                    Action
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="table-row-group">
                {isLoading
                  ? CounTeSkeleton()
                  : country?.data?.map((item: any) => (
                      <div
                        key={item.id}
                        className="table-row transition-colors"
                      >
                        <div className="table-cell px-6 py-4 text-sm">
                          <div className="flex items-center">
                            <picture>
                              <img
                                src={helpers.imgSource(item?.flag)}
                                alt="flag"
                                className="w-[20px] h-[20px]"
                              />
                            </picture>
                            <span className="ml-2"> {item?.name}</span>
                          </div>
                        </div>
                        <div className="table-cell px-6 py-4 text-sm text-center">
                          {item?.dial_code}
                        </div>
                        <div className="table-cell px-6 py-4 text-sm text-center">
                          {item?.token_rate}
                        </div>
                        <div className="table-cell px-6 py-4 text-sm text-center">
                          {item?.currency_code}
                        </div>
                        <div className="table-cell px-6 py-4 text-center">
                          <button className="mr-2 cursor-pointer">
                            <FavIcon name="edit2" />
                          </button>
                          <button className="cursor-pointer">
                            <FavIcon name="delete" />
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== CounTeSkeleton ========
function CounTeSkeleton() {
  return [...Array(7)].map((_, index) => (
    <div key={index} className="table-row">
      <div className="table-cell px-1 py-3 text-center text-sm">
        <Skeleton className="w-[100px] mx-auto rounded-sm text-center h-[20px]" />
      </div>
      <div className="table-cell px-1 py-3 text-sm">
        <Skeleton className="w-[100px] mx-auto rounded-sm h-[20px]" />
      </div>
      <div className="table-cell px-1 py-3 text-sm">
        <Skeleton className="w-[100px] mx-auto rounded-sm h-[20px]" />
      </div>
      <div className="table-cell px-1 py-3 text-sm">
        <Skeleton className="w-[100px] mx-auto rounded-sm h-[20px]" />
      </div>
      <div className="table-cell px-1 py-3 text-sm">
        <Skeleton className="w-[100px] mx-auto rounded-sm h-[20px]" />
      </div>
    </div>
  ));
}
