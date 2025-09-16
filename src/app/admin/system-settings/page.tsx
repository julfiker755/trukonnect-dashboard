"use client";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import ImgUpload from "@/components/reuseable/img-uplod";
import { Button } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import FavIcon from "@/icon/favIcon";
import { CircleAlert, Upload } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { FieldValues, useForm } from "react-hook-form";

const intAva = {
  preview: null,
};

export default function SystemSettings() {
  const [platform, setPlatform] = useState<any>(intAva);
  const from = useForm({
    // resolver: zodResolver(platformSchema),
    defaultValues: {
      icon: null,
      country_name: "",
      dialing_code: "",
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
  return (
    <div>
      <Navber
        props={
          <>
            <h1 className="text-xl">System Settings</h1>
            <SearchBox
              placeholder="Search by user name"
              onSearch={(text: any) => console.log(text)}
            />
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-figma-card p-4 rounded-lg pb-6">
          <h1 className="text-2xl font-semibold mb-4">Add New Country</h1>
          <Form from={from} onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h1 className="mb-2">Upload Logo (JPG/SVG)*</h1>
                <ImgUpload
                  onFileSelect={(file: File) => {
                    setPlatform({
                      ...platform,
                      preview: URL.createObjectURL(file),
                    });
                    from.setValue("icon", file as any);
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
                label="Country Name"
                name="country_name"
                placeholder="Write the country name"
                className="h-10"
              />
              <FromInput
                label="Dialing Code"
                name="dialing_name"
                placeholder="Write the dialing code"
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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span>
                  <ReactCountryFlag
                    countryCode={"GH"}
                    svg
                    style={{
                      width: "1em",
                      height: "1em",
                    }}
                    title={"item.region"}
                  />
                  <span className="ml-1"> Ghana</span>
                </span>
              </div>
              <div>+233</div>
              <div>
                {" "}
                <button className="mr-2 cursor-pointer">
                  <FavIcon name="edit2" />
                </button>
                <button className="cursor-pointer">
                  <FavIcon name="delete" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span>
                  <ReactCountryFlag
                    countryCode={"NI"}
                    svg
                    style={{
                      width: "1em",
                      height: "1em",
                    }}
                    title={"item.region"}
                  />
                  <span className="ml-1"> Nigeria</span>
                </span>
              </div>
              <div>+233</div>
              <div>
                {" "}
                <button className="mr-2 cursor-pointer">
                  <FavIcon name="edit2" />
                </button>
                <button className="cursor-pointer">
                  <FavIcon name="delete" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
