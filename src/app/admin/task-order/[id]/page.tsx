"use client"
import Avatars from '@/components/reuseable/avater';
import { ImageGallery } from '@/components/reuseable/image-gallery';
import { ImgBox } from '@/components/reuseable/Img-box';
import Navber from '@/components/view/common/dash/navber';
import { BackBtn } from '@/components/reuseable/back-btn';
import CopyBox from '@/components/reuseable/copy-box';
import { useSlgOrderQuery } from '@/redux/api/admin/taskApi';
import FlagBox from '@/components/reuseable/flag-box';
import { DateBox, SocialBox } from '@/components/reuseable/social';
import { helpers } from '@/lib';
import FavIcon from '@/icon/favIcon';
import { IdParams } from '@/types';
import React, { use } from 'react';


export default function TaskDetails({ params }: IdParams) {
  const { id } = use(params);
  const { data: order } = useSlgOrderQuery(id)
  const { creator, engagement, task, reviewer, status, task_attached, country } = order?.data || {}

  return (
    <div className="mb-10">
      <Navber
        className="py-4"
        backbtn={
          <div className="items-center hidden lg:flex">
            <BackBtn iconStyle="text-figma-primary" />
            <h1 className="text-xl relative -ml-2">Back</h1>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-figma-chart p-6 rounded-xl">
          <h1 className="text-lg mb-4">Task Details</h1>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Avatars src={helpers.imgSource(creator?.avatar) || '/avater.png'} fallback={creator?.name} alt={creator?.name} fallbackStyle="avatar" />
                <ul className="*:leading-5">
                  <li className="text-xl">{creator?.name}</li>
                  <li className="text-sm text-figma-gray">{helpers.formatDate(creator?.created_at)}</li>
                </ul>
              </div>
            </div>
            <h1 className="text-lg font-medium mb-2">{engagement?.engagement_name}</h1>
            <p className="text-figma-gray">
              {task?.description}
            </p>

            <ul className="space-y-2 [&>li]:flex [&>li]:items-center [&>li]:justify-between">
              <li>
                <span>Quantity</span>
                <span>{task?.quantity || 0}</span>
              </li>
              <li>
                <span>Selected Audience</span>
                <FlagBox href={helpers.imgSource(country?.flag) || '/blur.png'} name={country?.name} />
              </li>
              <li>
                <span>Total tokens</span>
                <span className="flex items-center">
                  <FavIcon name="coin" className="mr-1 size-5" />
                  {task?.total_token || 0}
                </span>
              </li>
              <li>
                <span>Platform</span>
                <SocialBox href={task?.social?.icon_url} name={task?.social?.name} />
              </li>
              <li>
                <span>Creation Date</span>
                <DateBox date={task?.created_at} />
              </li>
              <li>
                <span>Link</span>
                <CopyBox value={task?.link} />
              </li>
              {task_attached?.length > 0 && (
                <li className='mt-4'>
                  <ImageGallery images={task_attached?.map((img: any) => img?.file_url)}>
                    <div className="grid grid-cols-4 gap-10">
                      {task_attached?.slice(0, 4)?.map((item: any, index: any) => (
                        <ImgBox key={index} src={helpers.imgSource(item?.file_url) || "/blur.png"} alt="photo2" className="w-[70px] h-[100px] mx-auto" />
                      ))}
                    </div>
                  </ImageGallery>
                </li>
              )}

            </ul>
          </div>
        </div>
        <div>
          <div className="bg-figma-chart p-6 h-fit rounded-xl">
            <h1 className="text-lg mb-4">Reviewed By</h1>
            <div className="space-y-3">
              <div className="mb-10">
                <ImgBox
                  className="size-30 rounded-xl mx-auto"
                  src={helpers.imgSource(reviewer?.avatar) || '/avater.png'}
                  alt="img"
                ></ImgBox>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-figma-gray">Full name</span>
                <span className="text-white">{reviewer?.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-figma-gray">Email</span>
                <span className="text-white">{reviewer?.email}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-figma-gray">Phone number</span>
                <span className="text-white">{reviewer?.phone}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-figma-gray">Region</span>
                <span className="text-white">{reviewer?.country?.name}</span>
              </div>
            </div>
          </div>
          {/* ======== [rejected]-Issue =========== */}
          {helpers.lowerCase(status) === "rejected" && (
            <div className="bg-figma-chart p-6 h-fit mt-4 rounded-xl">
              <h1 className="text-lg mb-2">Issue</h1>
              <p className="text-figma-gray">{task?.rejection_reason}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
