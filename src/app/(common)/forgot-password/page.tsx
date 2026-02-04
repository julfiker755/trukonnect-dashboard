"use client";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import React from "react";

export default function VerifyOtp() {
  const router = useRouter();
  const from = useForm({
    // resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
    router.push("/verify-otp")
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative z-10">
      <div className="md:m-0 w-11/12 lg:w-0 lg:min-w-lg p-5 rounded-2xl bg-[#A7A7A7]/10 backdrop-blur-2xl">
        <div className="mb-6 space-y-2">
          <FavIcon className="w-[80px] h-[66px] mx-auto" name="logo" />
          <h1 className="text-2xl font-bold text-center">
           Forgot Password
          </h1>
          <h1 className="text-figma-gray text-center">
           Please provide valid information to access your account
          </h1>
        </div>
        <Form className="space-y-4 py-7" from={from} onSubmit={handleSubmit}>
          <FromInput
            className="h-10"
            label="Email"
            name="email"
            placeholder="Enter your email"
            icon={<FavIcon name="mail" className="size-4" color="#777777" />}
          />
          <Button
            variant="secondary"
            onClick={() => router.back()}
            className="w-full"
          >
            Back to log in
          </Button>
          <Button variant="primary" className="w-full">
            {" "}
            Verify
          </Button>
        </Form>
      </div>
    </div>
  );
}
