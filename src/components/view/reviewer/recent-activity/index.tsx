import Avatars from "@/components/reuseable/avater";
import { ScrollArea } from "@/components/ui";
import React from "react";


const tasks = [
  { user: "Daniel", action: "submitted a task for proof." },
  { user: "Marks", action: "added a task." },
  { user: "Daniel", action: "submitted a task for proof." },
  { user: "Marks", action: "added a task." },
  { user: "Daniel", action: "submitted a task for proof." },
  { user: "Marks", action: "added a task." },
  { user: "Daniel", action: "submitted a task for proof." },
  { user: "Daniel", action: "submitted a task for proof." },
  { user: "Marks", action: "added a task." },
  { user: "Daniel", action: "submitted a task for proof." },
  { user: "Marks", action: "added a task." },
  { user: "Daniel", action: "submitted a task for proof." },
  { user: "Marks", action: "added a task." },
  { user: "Daniel", action: "submitted a task for proof." },
  { user: "Marks", action: "added a task." },
  { user: "Daniel", action: "submitted a task for proof." },
  { user: "Marks", action: "added a task." },
  { user: "Daniel", action: "submitted a task for proof." },
  { user: "Marks", action: "added a task." },
  { user: "Daniel", action: "submitted a task for proof." },
];



export default function RecentActivity() {
  return (
    <div className="bg-[#575757]/10 rounded-xl h-full p-5">
      <h1 className="font-medium text-2xl">Recent Activity</h1>
     <div className="mt-5">
          <ScrollArea styleber="bg-[#575757]/60 rounded-md" className="h-[350px]">
         <div className="space-y-4">
         {tasks.map((item,index) => (
            <div key={index} className="flex items-center space-x-2">
               <Avatars src="" fallback={item.user} alt={item.user} />
               <p className="text-figma-gray">{item.action}</p>
            </div>
         ))}
      </div>
      </ScrollArea>
     </div>
     
    </div>
  );
}
