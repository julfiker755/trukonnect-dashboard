"use client";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema } from "@/schema";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { helpers } from "@/lib";

function NewPasswordChild() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const id = searchParams.get("id");
  const [changePassword] = useChangePasswordMutation();
  const from = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      new_password: "",
      c_password: "",
    },
  });

  useEffect(() => {
    if (!email && !id) {
      router.push("/forgot-password");
    }
  }, [email, router, id]);

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      _method: "PUT",
      password: values.new_password,
      password_confirmation: values.c_password,
      user_id: id,
      user_email: email,
    };
    const data = helpers.fromData(value);
    const res = await changePassword(data).unwrap();
    if (res.status) {
      router.push("/");
      from.reset();
    }
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
            name="new_password"
            label="Password"
            placeholder="Password"
            eye={true}
            icon={
              <FavIcon name="password" className="size-5" color="#777777" />
            }
          />
          <FromInput
            className="h-10"
            name="c_password"
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

export default function NewPassword() {
  return (
    <Suspense>
      <NewPasswordChild />
    </Suspense>
  );
}
