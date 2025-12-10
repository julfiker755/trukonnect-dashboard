"use client"
import Avatars from '@/components/reuseable/avater';
import { BackBtn } from '@/components/reuseable/back-btn';
import Navber from '@/components/view/common/dash/navber';
import { useGetNotifyQuery, useMarkAllNotifyMutation, useMarkNotifyMutation } from '@/redux/api/common/notificationApi';
import React from 'react';
import { helpers } from '@/lib';
import { Skeleton } from '@/components/ui';
import { NoItemData } from '@/components/reuseable/table-no-item';
import sonner from '@/components/reuseable/sonner';


export default function NotificationBox() {
    const { data: noti, isLoading } = useGetNotifyQuery({})
    const [markNotify] = useMarkNotifyMutation()
    const [markAllNotify] = useMarkAllNotifyMutation()

    return (
        <div>
            <Navber
                isShow={false}
                className="py-4"
                backbtn={
                    <div className='flex  w-full justify-between items-center'>
                        <div className="flex items-center">
                            <BackBtn className="hidden lg:grid" iconStyle="text-figma-primary" />
                            <h1 className="text-xl font-medium"> Notification</h1>
                        </div>
                        <h2 onClick={async () => {
                            const res = await markAllNotify({}).unwrap()
                            if (res.status) {
                                sonner.success("All marks are successful!", "You have successfully completed the notification", "bottom-right")
                            }
                        }} className='text-figma-red cursor-pointer underline font-medium text-lg'>Read all</h2>
                    </div>
                }
            />
            <div>
                <div className="space-y-4">
                    {isLoading ? (
                        Array.from({ length: 10 })?.map((_, index) => (
                            <Skeleton className='w-full h-12' key={index} />
                        ))
                    ) : noti?.data?.length > 0 ? (
                        noti?.data?.map((item: any, index: any) => (
                            <div
                                key={index}
                                onClick={async () => {
                                    await markNotify(item.id).unwrap()
                                }}
                                className={`flex cursor-pointer items-center ${item.read && 'bg-figma-chart'}   py-2 px-2 rounded-md justify-between space-x-2`}
                            >
                                <div className="flex space-x-2 items-center">
                                    <Avatars src={helpers.imgSource(item.avatar) || '/avater.png'} fallback={item.user_name} alt={item.title} />
                                    <p className="text-figma-gray">{item.title}</p>
                                </div>
                                <p className="text-figma-gray text-sm">{helpers.formatDate(item?.created_at)}</p>
                            </div>
                        ))
                    ) : (
                        <NoItemData title="No Notification at the monment" />
                    )}

                </div>
            </div>
        </div>
    );
}
