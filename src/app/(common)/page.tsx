"use client";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  const router = useRouter();
  const from = useForm({
    // resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    router.push("/reviewer");
    console.log(values);
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative z-10">
      <div className="md:m-0 w-11/12 lg:w-0 lg:min-w-lg p-5 rounded-2xl bg-[#A7A7A7]/10 backdrop-blur-2xl">
        <div className="mb-6 space-y-2">
          <FavIcon className="w-[80px] h-[66px] mx-auto" name="logo" />
          <h1 className="text-2xl font-bold text-center">Log In</h1>
          <h1 className="text-figma-gray text-center">
            Please provide valid information to access your account
          </h1>
        </div>
        <Form className="space-y-4 py-7" from={from} onSubmit={handleSubmit}>
          <FromInput
            className="h-10"
            name="email"
            label="Email"
            placeholder="Enter your email"
            icon={<FavIcon name="mail" className="size-4" color="#777777" />}
          />

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

          <Link
            className="text-figma-primary float-right underline"
            href="/forgot-password"
          >
            {" "}
            <h1 className="text-sm">Forgot password ?</h1>
          </Link>
          <Button variant="primary" className="w-full">
            {" "}
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
}
