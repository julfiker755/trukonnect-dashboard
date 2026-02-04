"use client";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import React from "react";
import { useRouter } from "next/navigation";

export default function NewPassword() {
  const router=useRouter()
  const from = useForm({
    // resolver: zodResolver(authSchema),
    defaultValues: {
      password: "",
      retype_password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
    router.push("/")
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative z-10">
      <div className="md:m-0 w-11/12 lg:w-0 lg:min-w-lg p-5 rounded-2xl bg-[#A7A7A7]/10 backdrop-blur-2xl">
        <div className="mb-6 space-y-2">
          <FavIcon className="w-[80px] h-[66px] mx-auto" name="logo" />
          <h1 className="text-2xl font-bold text-center">
            Create New Password
          </h1>
          <h1 className="text-figma-gray text-center">
            You have to create a new password after reset password
          </h1>
        </div>
        <Form className="space-y-4 py-7" from={from} onSubmit={handleSubmit}>
          <FromInput
            className="h-10"
            name="password"
            label="Password"
            placeholder="Password"
            eye={true}
            icon={
              <FavIcon name="password" className="size-5" color="#777777" />
            }
          />
          <FromInput
            className="h-10"
            name="retype_password"
            label="Retype Password"
            placeholder="Retype Password"
            eye={true}
            icon={
              <FavIcon name="password" className="size-5" color="#777777" />
            }
          />

          <Button variant="primary" className="w-full">
            {" "}
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
