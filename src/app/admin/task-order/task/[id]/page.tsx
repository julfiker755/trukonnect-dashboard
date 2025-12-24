"use client"
import { BackBtn } from '@/components/reuseable/back-btn';
import Navber from '@/components/view/common/dash/navber';
import { ImgBox } from '@/components/reuseable/Img-box';
import CopyBox from '@/components/reuseable/copy-box';
import { useSlgTaskQuery } from '@/redux/api/admin/taskApi';
import { DateBox, SocialBox } from '@/components/reuseable/social';
import FlagBox from '@/components/reuseable/flag-box';
import icons from 'currency-icons';
import FavIcon from '@/icon/favIcon';
import { IdParams } from '@/types';
import React, { use } from 'react';
import { helpers } from '@/lib';


export default function TaskDetails({ params }: IdParams) {
  const { id } = use(params);
  const { data: task } = useSlgTaskQuery(id)
  const { token_distributed, per_perform, performed, engagement, description, quantity, created_at, rejection_reason, country, link, social, progress, reviewer, status, total_price } = task?.data || {}

  const overviewItem = [
    {
      title: 'Total Performers',
      count: performed,
      bg: 'rgba(194, 255, 212, 0.10)',
      icon: <FavIcon className="size-14" name="totalperfomer" />,
    },
    {
      title: 'Total Tokens Distributed',
      count: token_distributed,
      bg: 'rgba(251, 190, 254, 0.10)',
      icon: <FavIcon className="size-14" name="totalTokens" />,
    },
  ];
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
          <div className="space-y-4">
            {/* ======== [completed]-Total Performers=========== */}
            {helpers.lowerCase(status) == "completed" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {overviewItem?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-center py-5 px-4 rounded-md"
                    style={{
                      background: item.bg,
                    }}
                  >
                    <div>
                      <div className="flex justify-center">{item.icon}</div>
                      <div className="text-figma-gray text-center">{item.title}</div>
                      <div className="text-2xl font-semibold text-center">{item.count || 0}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center">
              <h1 className="text-xl">{engagement?.engagement_name}</h1>
            </div>
            <p className="text-figma-gray">
              {description}
            </p>

            <ul className="space-y-2 [&>li]:flex [&>li]:items-center [&>li]:justify-between">
              <li>
                <span>Quantity</span>
                <span>{quantity || 0}</span>
              </li>
              <li>
                <span>Selected Audience</span>
                <FlagBox href={country?.flag} name={country?.name} />
              </li>
              <li>
                <span>Per user earned Tokens</span>
                <span className="flex items-center">
                  <FavIcon name="coin" className="mr-1 size-5" />
                  {per_perform || 0}
                </span>
              </li>
              <li>
                <span>Platform</span>
                <SocialBox href={social?.icon_url} name={social?.name} />
              </li>
              <li>
                <span>Creation Date</span>
                <DateBox date={created_at} />
              </li>
              <li className="flex justify-between items-center">
                <span>Total Cost</span>
                <span className="flex items-center">
                  <span className='text-figma-primary'>{icons[country?.currency_code]?.symbol}</span>
                  <span className="ml-1 text-figma-primary">{total_price}</span>
                </span>
              </li>
              <li>
                <span>Link</span>
                <CopyBox value={link} />
              </li>
            </ul>
          </div>
          {/* ======== [ongoing]-progress ber=========== */}
          {helpers.lowerCase(status) === "ongoing" && (
            <>
              <h1 className="text-lg mt-5">Progress of task</h1>
              <div className="w-full">
                <div>
                  <div className="text-xs font-semibold flex mb-2 justify-end">
                    <span className="text-figma-primary mr-1"> {progress}</span> / 100
                  </div>
                  <div className="bg-[#575757]/20  h-2 mb-2.5 rounded-md w-full">
                    <div className="bg-figma-primary  h-2 rounded-full" style={{ width: progress }}></div>
                  </div>
                </div>
              </div>
            </>
          )}
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
              <p className="text-figma-gray">{rejection_reason}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
