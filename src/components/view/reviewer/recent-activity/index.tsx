import Avatars from '@/components/reuseable/avater';
import { NoItemData } from '@/components/reuseable/table-no-item';
import { ScrollArea } from '@/components/ui';
import { helpers } from '@/lib';
import React from 'react';



const RecentActivity = ({ data }: any) => {
  return (
    <div className="bg-[#575757]/10 rounded-xl h-full p-5">
      <h1 className="font-medium text-2xl">Recent Activity</h1>
      <div className="mt-5">
        <ScrollArea styleber="bg-[#575757]/60 rounded-md" className="h-[350px]">
          <div className="space-y-4">
            {data?.length > 0 ? (
              data?.map((item: any, index: any) => (
                <div key={index} className="flex items-center space-x-2">
                  <Avatars src={helpers.imgSource(item?.sender?.avater)} fallback={item?.sender?.name} alt={item?.sender?.name} />
                  <p className="text-figma-gray">{item?.title}</p>
                </div>
              ))

            ) : (
              <NoItemData title="No Recent Activity at the monment" />
            )}

          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default RecentActivity;
