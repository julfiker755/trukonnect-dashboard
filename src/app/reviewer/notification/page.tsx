import Avatars from "@/components/reuseable/avater";
import { BackBtn } from "@/components/reuseable/back-btn";
import Navber from "@/components/view/common/dash/navber";
import React from "react";

const activityLog = [
  { user: "Marks", action: "added a task.", time: "09:00 AM",active:true },
  { user: "Daniel", action: "submitted a task for proof.", time: "09:00 AM",active:true },
  { user: "Marks", action: "added a task.", time: "09:00 AM",active:false },
  { user: "Daniel", action: "submitted a task for proof.", time: "09:00 AM",active:true },
  { user: "Yusuf", action: "added an account for verify.", time: "09:00 AM",active:false },
  { user: "Marks", action: "added a task.", time: "09:00 AM",active:false },    
  { user: "Marks", action: "added a task.", time: "09:00 AM",active:false },
  { user: "Yusuf", action: "added an account for verify.", time: "09:00 AM",active:false },
  { user: "Marks", action: "added a task.", time: "09:00 AM",active:true },
  { user: "Yusuf", action: "added an account for verify.", time: "09:00 AM",active:false },
];

export default function Ntification() {
  return (
    <div>
      <Navber
        isShow={false}
        props={
          <>
            <h1 className="text-xl flex items-center">
              <BackBtn />
              Notification
            </h1>
            <h1 className="text-figma-red underline cursor-pointer">
              Read all
            </h1>
          </>
        }
      />
      <div>
        <div className="space-y-4">
          {activityLog.map((item, index) => (
            <div key={index} className={`flex items-center ${item.active && "bg-figma-chart"}  py-2 px-2 rounded-md justify-between space-x-2`}>
              <div className="flex space-x-2 items-center">
                <Avatars src="" fallback={item.user} alt={item.user} />
                <p className="text-figma-gray">{item.action}</p>
              </div>
              <p className="text-figma-gray text-sm">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
