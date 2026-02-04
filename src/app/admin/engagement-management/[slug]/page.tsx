"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { CloseBtn, CloseIcon } from "@/components/reuseable/btn";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { FromTextArea } from "@/components/reuseable/from-textarea";
import Modal2 from "@/components/reuseable/modal2";
import { Button } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import { useModalState } from "@/hooks/useModalState";
import { engagementSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import React from "react";
import useConfirmation from "@/components/context/delete-modal";

const facebookServices = [
  {
    id: 1,
    name: "Facebook Page Likes",
    minimumRequired: 100,
    price: 3,
  },
  {
    id: 2,
    name: "Facebook Follows",
    minimumRequired: 150,
    price: 2,
  },
  {
    id: 3,
    name: "Facebook Post Likes",
    minimumRequired: 200,
    price: 4,
  },
  {
    id: 4,
    name: "Facebook Comments",
    minimumRequired: 50,
    price: 8,
  },
  {
    id: 5,
    name: "Facebook Shares",
    minimumRequired: 100,
    price: 2,
  },
];

export default function PlatformSingle() {
  const { confirm } = useConfirmation();
  const [state, updateState] = useModalState({
    isAdd: false,
    isEdit: false,
  });
  const { slug } = useParams();
  const addFrom = useForm({
    resolver: zodResolver(engagementSchema),
    defaultValues: {
      name: "",
      minimum: "",
      price: "",
      description: "",
    },
  });

  // handleSubmit
  const handleAddSubmit = async (values: FieldValues) => {
    console.log(values);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
  };

  // editFrom
  const editFrom = useForm({
    resolver: zodResolver(engagementSchema),
    defaultValues: {
      name: "",
      minimum: "",
      price: "",
      description: "",
    },
  });

  // handleEditSubmit
  const handleEditSubmit = async (values: FieldValues) => {
    console.log(values);
    // toast.success("Update Successful", {
    //   description: "Your profile has been updated successfully",
    // });
  };

  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this engagement",
      description:
        "After deleting, users wont be able to find this engagement in your app",
    });
    if (con) {
      console.log(id);
    }
  };
  return (
    <div>
      <Navber
        className="py-4"
        backbtn={
          <div className="items-center hidden lg:flex">
            <BackBtn iconStyle="text-figma-primary" />
            <h1 className="text-xl relative -ml-2">Back</h1>
          </div>
        }
      />
      <ul className="flex flex-wrap justify-between items-center">
        <li className="text-xl">Engagement types</li>
        <li className="space-x-4 flex items-center flex-wrap">
          <span className="text-lg">Selected Currency:</span>
           <div className="space-x-4 mt-3 lg:mt-0">
           <span className="border p-1 btn-shadow rounded-md">
            <ReactCountryFlag
              countryCode={"GH"}
              svg
              style={{
                width: "1em",
                height: "1em",
              }}
              title={"Ghana"}
            />
            <span className="ml-1"> Ghana</span>
          </span>
          <span className="border p-1 btn-shadow rounded-md">
            <ReactCountryFlag
              countryCode={"NG"}
              svg
              style={{
                width: "1em",
                height: "1em",
              }}
              title={"Nigeria"}
            />
            <span className="ml-1">Nigeria</span>
          </span>
           </div>
        </li>
      </ul>
      <div className="bg-[#575757]/10 rounded-md mt-8">
        <div className="table w-full">
          {/* Table Header */}
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell px-6 py-4 text-left text-sm font-semibold text-white">
                Name
              </div>
              <div className="table-cell px-6 py-4 text-center text-sm font-semibold text-white">
                Minimum Required
              </div>
              <div className="table-cell px-6 py-4 text-center text-sm font-semibold text-white">
                Each Eng. Price
              </div>
              <div className="table-cell px-6 py-4 text-center text-sm font-semibold text-white">
                Action
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="table-row-group">
            {facebookServices.map((service) => (
              <div key={service.id} className="table-row transition-colors">
                <div className="table-cell px-6 py-4 text-sm">
                  {service.name}
                </div>
                <div className="table-cell px-6 py-4 text-sm text-center">
                  {service.minimumRequired}
                </div>
                <div className="table-cell px-6 py-4 text-sm text-center">
                  ₡ {service.price}
                </div>
                <div className="table-cell px-6 py-4 text-center">
                  <button
                    onClick={() => updateState("isEdit", true)}
                    className="mr-2 cursor-pointer"
                  >
                    <FavIcon name="edit2" />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() => handleDelete("55")}
                  >
                    <FavIcon name="delete" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 flex justify-center mt-10">
          <Button
            onClick={() => updateState("isAdd", true)}
            variant="primary"
            className="w-fit lg:w-1/2"
          >
            Add New Engagement Type
          </Button>
        </div>
      </div>
      {/* =========== Add New Engagement ========== */}
      <Modal2 open={state.isAdd} setIsOpen={(v) => updateState("isAdd", v)}>
        <ul className="flex items-center pt-1 justify-between">
          <li className="opacity-0">0</li>
          <li>
            <h1 className="text-xl font-medium text-center">
              Add New Engagement
            </h1>
          </li>
          <li>
            <CloseIcon
              className="top-4 right-3"
              onClose={() => {
                addFrom.reset();
                updateState("isAdd", false);
              }}
            />
          </li>
        </ul>
        <Form from={addFrom} onSubmit={handleAddSubmit}>
          <div className="space-y-6 pt-10">
            <FromInput
              label="Engagement Name"
              name="name"
              placeholder="Enter Engagement name"
              className="h-10"
            />
            <FromInput
              label="Minimum Required"
              name="minimum"
              placeholder="Enter Minimum Quantity Required"
              className="h-10"
            />
            <FromInput
              label="Price"
              name="price"
              placeholder="Enter Engagement price"
              className="h-10"
              type="number"
            />
            <FromTextArea
              label="Description"
              name="description"
              placeholder="Enter Engagement description"
              className="min-h-25"
            />
            <div className="space-y-2">
              <CloseBtn
                onClose={() => {
                  addFrom.reset();
                  updateState("isAdd", false);
                }}
              />
              <Button className="w-full" variant="primary">
                Add
              </Button>
            </div>
          </div>
        </Form>
      </Modal2>
      {/* =========== Edit New Engagement ========== */}
      <Modal2 open={state.isEdit} setIsOpen={(v) => updateState("isEdit", v)}>
        <ul className="flex items-center pt-1 justify-between">
          <li className="opacity-0">0</li>
          <li>
            <h1 className="text-xl font-medium text-center">Edit Engagement</h1>
          </li>
          <li>
            <CloseIcon
              className="top-4 right-3"
              onClose={() => {
                editFrom.reset();
                updateState("isEdit", false);
              }}
            />
          </li>
        </ul>
        <Form from={editFrom} onSubmit={handleEditSubmit}>
          <div className="space-y-6 pt-10">
            <FromInput
              label="Engagement Name"
              name="name"
              placeholder="Enter Engagement name"
              className="h-10"
            />
            <FromInput
              label="Minimum Required"
              name="minimum"
              placeholder="Enter Minimum Quantity Required"
              className="h-10"
            />
            <FromInput
              label="Price"
              name="price"
              placeholder="Enter Engagement price"
              className="h-10"
              type="number"
            />
            <FromTextArea
              label="Description"
              name="description"
              placeholder="Enter Engagement description"
              className="min-h-25"
            />
            <div className="space-y-2">
              <CloseBtn
                onClose={() => {
                  editFrom.reset();
                  updateState("isEdit", false);
                }}
              />
              <Button className="w-full" variant="primary">
                Edit
              </Button>
            </div>
          </div>
        </Form>
      </Modal2>
    </div>
  );
}
