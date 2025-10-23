"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { CloseBtn, CloseIcon } from "@/components/reuseable/btn";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { FromTextArea } from "@/components/reuseable/from-textarea";
import Modal2 from "@/components/reuseable/modal2";
import { Button, Table } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import { useModalState } from "@/hooks/useModalState";
import { engagementSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import React, { useState } from "react";
import useConfirmation from "@/components/context/delete-modal";
import {
  TableNoItem2,
  TableSkeleton2,
} from "@/components/reuseable/table-skeleton2";
import { useGetCountryQuery } from "@/redux/api/admin/countryApi";
import FlagBox from "@/components/reuseable/flag-box";
import {
  useDeleteEngmentMutation,
  useGetEngmentQuery,
  useStoreEngmentMutation,
  useUpdateEngmentMutation,
} from "@/redux/api/admin/engagementApi";
import { ResponseApiErrors } from "@/lib/api-response";
import { helpers } from "@/lib";
import { FakeInput } from "@/components/reuseable/fake-input";

export default function PlatformSingle() {
  const { confirm } = useConfirmation();
  const { slug } = useParams();
  const [state, updateState] = useModalState({
    isAdd: false,
    isEdit: false,
  });
  const [countryId, setCountryId] = useState(1);
  const { data: engagement, isLoading } = useGetEngmentQuery(slug);
  const { data: country } = useGetCountryQuery({});
  const [storeEngment, { isLoading: storeLoading }] = useStoreEngmentMutation();
  const [updateEngment, { isLoading: updateLoading }] =
    useUpdateEngmentMutation();
  const [deleteEngment] = useDeleteEngmentMutation();
  const addFrom = useForm({
    resolver: zodResolver(engagementSchema.partial()),
    defaultValues: {
      name: "",
      minimum_qty: "",
      price: "",
      description: "",
    },
  });

  // handleSubmit
  const handleAddSubmit = async (values: FieldValues) => {
    try {
      const value = {
        sm_id: slug,
        country_id: countryId,
        engagement_name: values.name,
        description: values.description,
        min_quantity: values.minimum_qty,
        unit_price: values.price,
      };
      const data = helpers.fromData(value);
      const res = await storeEngment(data).unwrap();
      if (res.status) {
        handleAddReset();
      }
    } catch (err: any) {
      if (err?.data?.errors) {
        ResponseApiErrors(err?.data, addFrom);
      }
    }
  };

  const handleAddReset = () => {
    addFrom.reset();
    updateState("isAdd", false);
  };

  // == editFrom ==
  const editFrom = useForm({
    resolver: zodResolver(engagementSchema.partial()),
    defaultValues: {
      id: "",
      name: "",
      minimum_qty: "",
      price: "",
      description: "",
    },
  });

  const handleEditSubmit = async (values: FieldValues) => {
    try {
      const value = {
        _method: "put",
        engagement_name: values.name,
        description: values.description,
        min_quantity: values.minimum_qty,
        unit_price: values.price,
      };
      const data = helpers.fromData(value);
      const res = await updateEngment({ id: values.id, data });
      if (res?.data?.status) {
        handleEditReset();
      }
    } catch (err: any) {
      if (err?.data?.errors) {
        ResponseApiErrors(err?.data, editFrom);
      }
    }
  };

  const handleEdit = (item: any) => {
    updateState("isEdit", true);
    editFrom.setValue("name", item?.engagement_name);
    editFrom.setValue("minimum_qty", item?.min_quantity?.toString());
    editFrom.setValue("price", item?.unit_price?.toString());
    editFrom.setValue("description", item?.description);
    editFrom.setValue("id", item?.id?.toString());
  };

  const handleEditReset = () => {
    editFrom.reset();
    updateState("isEdit", false);
  };

  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this engagement",
      description:
        "After deleting, users wont be able to find this engagement in your app",
    });
    if (con) {
      await deleteEngment(id).unwrap();
    }
  };

  //  == filter by country wase data ==
  const engItem = engagement?.data?.filter(
    (cty: any) => cty?.country?.id == countryId
  );

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
          <span className="text-lg">Selected Country:</span>
          <div className="space-x-4 flex mt-3 lg:mt-0">
            {/* btn-shadow */}
            {country?.data?.map((item: any) => (
              <FlagBox
                className={`border-1 cursor-pointer p-1 ${
                  item.id == countryId && "btn-shadow"
                } rounded-md`}
                key={item.id}
                href={item.flag}
                name={item.name}
                onClick={() => setCountryId(item.id)}
              />
            ))}
          </div>
        </li>
      </ul>
      <div className="bg-[#575757]/10 rounded-md mt-8">
        <Table>
          {/* Table Header */}
          <thead className="table-header-group">
            <tr className="table-row">
              <th className="px-6 table-cell py-4 text-left text-sm font-semibold text-white">
                Name
              </th>
              <th className="px-6 table-cell py-4 text-center text-sm font-semibold text-white">
                Minimum Required
              </th>
              <th className="px-6 table-cell  py-4 text-center text-sm font-semibold text-white">
                Each Eng. Price
              </th>
              <th className="px-6 table-cell py-4 text-center text-sm font-semibold text-white">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="table-row-group">
            {isLoading ? (
              <TableSkeleton2 colSpan={4} />
            ) : engagement?.data?.length > 0 ? (
              engItem?.length > 0 ? (
                engItem.map((item: any) => (
                  <tr key={item.id} className="transition-colors table-row">
                    <td className="px-6 py-4 table-cell text-sm">
                      {item.engagement_name}
                    </td>
                    <td className="px-6 py-4  table-cell text-sm text-center">
                      {item.min_quantity}
                    </td>
                    <td className="px-6 py-4 table-cell text-sm text-center">
                      {item?.unit_price}
                    </td>
                    <td className="px-6 py-4 table-cell text-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="mr-2 cursor-pointer"
                      >
                        <FavIcon name="edit2" />
                      </button>
                      <button
                        className="cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FavIcon name="delete" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <TableNoItem2 colSpan={4} title="Not Engagement Found" />
              )
            ) : (
              <TableNoItem2 colSpan={4} title="Not Engagement Found" />
            )}
          </tbody>
        </Table>

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
              onClose={() => handleAddReset()}
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
              name="minimum_qty"
              placeholder="Enter Minimum Quantity Required"
              className="h-10"
              type="number"
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
              <CloseBtn onClose={() => handleAddReset()} />
              <Button
                disabled={storeLoading}
                className="w-full"
                variant="primary"
              >
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
              onClose={() => handleEditReset()}
            />
          </li>
        </ul>
        <Form from={editFrom} onSubmit={handleEditSubmit}>
          <div className="space-y-6 pt-10">
            <FakeInput name="id" />
            <FromInput
              label="Engagement Name"
              name="name"
              placeholder="Enter Engagement name"
              className="h-10"
            />
            <FromInput
              label="Minimum Required"
              name="minimum_qty"
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
              <CloseBtn onClose={() => handleEditReset()} />
              <Button
                disabled={updateLoading}
                className="w-full"
                variant="primary"
              >
                Edit
              </Button>
            </div>
          </div>
        </Form>
      </Modal2>
    </div>
  );
}
