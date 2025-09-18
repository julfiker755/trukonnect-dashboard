"use client";
import useConfirmation from "@/components/context/delete-modal";
import { CloseBtn, CloseIcon } from "@/components/reuseable/btn";
import Modal2 from "@/components/reuseable/modal2";
import PlayerBox from "@/components/reuseable/player-box";
import { Button, Input } from "@/components/ui";
import Navber from "@/components/view/common/dash/navber";
import SearchBox from "@/components/view/common/search-box";
import React, { useState } from "react";

export default function MediaControl() {
  const { confirm } = useConfirmation();
  const [isStore, setIsStore] = useState(false);

  const handleDelete = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this video",
      description:
        "After deleting, users wont be able to find this video in your app",
    });
    if (con) {
      console.log(id);
    }
  };
  return (
    <div>
      <Navber title="Content & Media Control" />
      <div className="bg-figma-card p-6 rounded-xl">
        <ul className="flex justify-between items-center mb-8">
          <li className="text-2xl font-medium">Promo Video</li>
          <li>
            <Button
              onClick={() => handleDelete("123")}
              variant="primary"
              className="!px-10 rounded-md"
            >
              Delete
            </Button>
          </li>
        </ul>
        <PlayerBox />
      </div>
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => setIsStore(true)}
          variant="primary"
          className="w-fit lg:min-w-md rounded-md"
        >
          Add New Video
        </Button>
      </div>
      {/* ============= Add New Video ========== */}
      <Modal2 open={isStore} setIsOpen={setIsStore}>
        <div className="mb-10">
          <h1 className="text-xl font-semibold text-center">Add New Video</h1>
        </div>
        <CloseIcon
          className="mt-2 mr-3"
          onClose={() => {
            setIsStore(false);
          }}
        />
        <Input
          className="bg-figma-input h-10 border-none"
          placeholder="Video URL"
        />
        <div className="space-y-2 mt-10">
          <CloseBtn
            onClose={() => {
              setIsStore(false);
            }}
          />
          <Button variant="primary" className="w-full">
            Add
          </Button>
        </div>
      </Modal2>
    </div>
  );
}
