"use client";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { FromTextArea } from "@/components/reuseable/from-textarea";
import { Button, Textarea } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import { bulkSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function Communication() {
  const from = useForm({
    // resolver: zodResolver(bulkSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };
  return (
    <div>
      <Navber title="Communication" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-figma-card p-4 rounded-lg pb-6">
          <h1 className="text-xl font-medium mb-4">Send Bulk Email</h1>
          <Form className="space-y-8" from={from} onSubmit={handleSubmit}>
            <FromInput
              className="h-10"
              name="subject"
              label="Subject"
              placeholder="Write the country name"
            />
            <FromTextArea
              name="message"
              label="Message"
              placeholder="Write the dialing code"
              className="min-h-[100px]"
            />

            <Button variant="primary" className="w-full">
              {" "}
              Send
            </Button>
          </Form>
        </div>
        <div className="bg-figma-card p-4 rounded-lg h-fit">
          <h1 className="text-xl font-medium mb-10">Send Bulk Notifications</h1>
          <div>
            <div className="mb-8">
              <h1 className="mb-2">Notification text</h1>
              <Textarea
                name="message"
                placeholder="Write the notification text"
                className="resize-none bg-figma-input min-h-[100px] border-none"
              />
            </div>
            <Button variant="primary" className="w-full">
              {" "}
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
