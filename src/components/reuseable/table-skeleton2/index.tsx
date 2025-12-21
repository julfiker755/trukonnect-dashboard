import { Skeleton } from '@/components/ui';
import FavIcon from '@/icon/favIcon';
import { cn } from '@/lib';
import { tableItemProps } from '../table-no-item';


interface TableSkeletonRowsProps {
  colSpan: number;
  len?: number;
  className?: string;
  tdStyle?: string;
}

// /TableSkeleton2
export function TableSkeleton2({ len = 10, className, tdStyle, colSpan }: TableSkeletonRowsProps) {
  const countNum = Array.from({ length: len });
  return (
    <>
      {countNum.map((_, index) => (
        <tr key={index} className="mx-10">
          <td colSpan={colSpan} className={cn('text-center py-3', tdStyle)}>
            <Skeleton
              key={index}
              className={cn('h-[53px] w-full rounded-md bg-[#F2F2F2]/20', className)}
            />
          </td>
        </tr>
      ))}
    </>
  );
}

// TableNoItem2
export function TableNoItem2({ title = 'No Data Found', colSpan, className, tdStyle }: tableItemProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={cn('text-center', tdStyle)}>
        <div className={cn('py-24 2xl:py-30 text-center', className)}>
          <div className="flex justify-center">
            <FavIcon color="#99a1af" name="svgFile" />
          </div>
          <h3 className="text-sm font-medium text-gray-400 mt-5">{title}</h3>
        </div>
      </td>
    </tr>
  );
}
