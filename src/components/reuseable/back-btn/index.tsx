'use client';
import { cn } from '@/lib';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackBtn({ className, iconStyle }: any) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className={cn(`size-10 2xl:size-11 cursor-pointer grid place-items-center`, className)}
    >
      <ChevronLeft className={iconStyle} />
    </div>
  );
}

// BackBtn2
// export function BackBtn2({ className }: any) {
//   const router = useRouter();
//   return (
//     <div
//       onClick={() => router.back()}
//       className={cn(
//         `cursor-pointer border h-10 px-2 rounded-md grid place-items-center`,
//         className
//       )}
//     >
//       <span className="flex gap-x-2">
//         {" "}
//         <ArrowLeft /> Back
//       </span>
//     </div>
//   );
// }
