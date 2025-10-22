"use client";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import ImgUpload from "@/components/reuseable/img-uplod";
import { Button, Skeleton } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import {
  useDeleteCountryMutation,
  useGetCountryQuery,
  useStoreCountryMutation,
  useUpdateCountryMutation,
} from "@/redux/api/countryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Upload } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import React, { useState } from "react";
import { countryEdit, countrystore } from "@/schema";
import { ResponseApiErrors } from "@/lib/api-response";
import useConfirmation from "@/components/context/delete-modal";
import { Pagination } from "@/components/reuseable/pagination";
import Image from "next/image";
import FavIcon from "@/icon/favIcon";
import { helpers } from "@/lib";

const intFlag = {
  preview: "",
};

export default function SystemSettings() {
  const { confirm } = useConfirmation();
  const [isSchema, setIsSchema] = useState(countrystore);
  const [page, setPage] = useState(1);
  const [flag, setIsFlag] = useState<any>(intFlag);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const { data: country, isLoading } = useGetCountryQuery({ page });
  const [deleteCountry] = useDeleteCountryMutation();
  const [storeCountry, { isLoading: storeLoading }] = useStoreCountryMutation();
  const [updateCountry, { isLoading: updateLoading }] =
    useUpdateCountryMutation();

  const from = useForm({
    resolver: zodResolver(isSchema),
    defaultValues: {
      flag: null,
      name: "",
      dial_code: "",
      currency: "",
      rate: "",
    },
  });

  //   handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      dial_code: values.dial_code,
      currency: values.currency,
      rate: values.rate,
      ...(values.flag && { flag: values.flag }),
      ...(selectedCountry?.id && { _method: "put" }),
    };

    const data = helpers.fromData(value);
    if (selectedCountry) {
      const res = await updateCountry({ id: selectedCountry.id, data });
      if (res?.data?.status) {
        handleCancel();
      }
    } else {
      try {
        await storeCountry(data).unwrap();
      } catch (err: any) {
        ResponseApiErrors(err?.data, from);
      } finally {
        handleCancel();
      }
    }
  };

  const handleEdit = (item: any) => {
    setIsSchema(countryEdit as any);
    setSelectedCountry(item);
    from.setValue("name", item.name);
    from.setValue("dial_code", item.dial_code);
    from.setValue("currency", item.currency_code);
    from.setValue("rate", item.token_rate);
    setIsFlag({ preview: helpers.imgSource(item.flag) });
  };

  // Handle Cancel button click
  const handleCancel = () => {
    setSelectedCountry(null);
    from.reset();
    setIsFlag(intFlag);
    setIsSchema(countrystore);
  };

  // hanlde delete
  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this Country",
      description:
        "After deleting, users wont be able to find this Country in your app",
    });
    if (con) {
      await deleteCountry(id).unwrap();
    }
  };

  return (
    <div>
      <Navber title="System Settings" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-figma-card p-4 rounded-lg pb-6">
          <h1 className="text-2xl font-semibold mb-4">
            {selectedCountry ? "Edit Country" : "Add New Country"}
          </h1>
          <Form from={from} onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h1 className="mb-2">Upload Flag (JPG/SVG)*</h1>
                <ImgUpload
                  onFileSelect={(file: File) => {
                    setIsFlag({ ...flag, preview: URL.createObjectURL(file) });
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
                type="number"
              />
              <FromInput
                label="Token Rate"
                name="rate"
                placeholder="Enter rate per token"
                className="h-10"
                type="number"
              />
              <FromInput
                label="Currency Code"
                name="currency"
                placeholder="Write the currency"
                className="h-10"
              />
              <div
                className={`grid grid-cols-1 ${
                  selectedCountry && "lg:grid-cols-2"
                } gap-5`}
              >
                {selectedCountry && (
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="w-full ml-2"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  disabled={storeLoading || updateLoading}
                  className="w-full"
                  variant="primary"
                >
                  {selectedCountry ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </Form>
        </div>
        <div className="bg-figma-card p-4 rounded-lg h-fit">
          <h1 className="text-2xl font-semibold mb-4">
            Current Supported Countries
          </h1>
          <div>
            <div className="table w-full">
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
                                className="w-[20px] h-[15px]"
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
                          <button
                            onClick={() => handleEdit(item)}
                            className="mr-2 cursor-pointer"
                          >
                            <FavIcon name="edit2" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="cursor-pointer"
                          >
                            <FavIcon name="delete" />
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {!isLoading && (
            <Pagination
              onClick={(v: any) => setPage(v)}
              {...country?.meta}
            ></Pagination>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== CounTeSkeleton ========
function CounTeSkeleton() {
  return [...Array(10)].map((_, index) => (
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
