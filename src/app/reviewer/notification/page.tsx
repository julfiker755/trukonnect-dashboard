import Avatars from '@/components/reuseable/avater';
import { BackBtn } from '@/components/reuseable/back-btn';
import Navber from '@/components/view/common/dash/navber';
import React from 'react';

const activityLog = [
  { user: 'Marks', action: 'Added a task', time: '09:00 AM', active: true },
  { user: 'Daniel', action: 'Submitted proof for a task', time: '09:00 AM', active: true },
  { user: 'Marks', action: 'Added a task', time: '09:00 AM', active: false },
  { user: 'Daniel', action: 'Submitted proof for a task', time: '09:00 AM', active: true },
  { user: 'Yusuf', action: 'Added an account for verification', time: '09:00 AM', active: false },
  { user: 'Marks', action: 'Added a task', time: '09:00 AM', active: false },
  { user: 'Marks', action: 'Added a task', time: '09:00 AM', active: false },
  { user: 'Yusuf', action: 'Added an account for verification', time: '09:00 AM', active: false },
  { user: 'Marks', action: 'Added a task', time: '09:00 AM', active: true },
  { user: 'Yusuf', action: 'Added an account for verification', time: '09:00 AM', active: false },
];

export default function Ntification() {
  return (
    <div>
      <Navber
        isShow={false}
        className="py-4"
        backbtn={
          <div className="flex items-center">
            <BackBtn className="hidden lg:grid" iconStyle="text-figma-primary" />
            <h1 className="text-xl font-medium"> Notification</h1>
          </div>
        }
      />
      <div>
        <div className="space-y-4">
          {activityLog.map((item, index) => (
            <div
              key={index}
              className={`flex items-center ${item.active && 'bg-figma-chart'}  py-2 px-2 rounded-md justify-between space-x-2`}
            >
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
