import React from 'react';
import { TableCell, TableRow } from '@/components/ui';
import { cn } from '@/lib/utils';
import FavIcon from '@/icon/favIcon';

export interface tableItemProps {
  title?: string;
  colSpan: number;
  className?: string;
  tdStyle?: string;
}

// TableNoItem
export function TableNoItem({ title = 'No Data Found', colSpan, className, tdStyle }: tableItemProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className={cn('text-center', tdStyle)}>
        <div className={cn('py-24 2xl:py-40 text-center', className)}>
          <div className="flex justify-center">
            <FavIcon color="#99a1af" name="svgFile" />
          </div>
          <h3 className="text-sm font-medium text-gray-400 mt-5">{title}</h3>
        </div>
      </TableCell>
    </TableRow>
  );
}


interface itemProps {
  title?: string;
  className?: string;
}

// NoItemData
export function NoItemData({ title = 'No Data Found', className }: itemProps) {
  return (
    <div className={cn('py-24 2xl:py-40 text-center flex flex-col justify-center', className)}>
      <div className="flex justify-center">
        <FavIcon color="#99a1af" name="svgFile" />
      </div>
      <h3 className="text-sm font-medium text-gray-400 mt-5">{title}</h3>
    </div>
  );
}


interface videoProps {
  title?: string,
  fill?: string,
  className?: string,
  iconStyle?: string

}

// NoVideoFound
export function NoVideoFound({ title = 'No Video Available', fill = "#99a1af", className, iconStyle }: videoProps) {
  return (
    <div className={cn('py-24 2xl:py-40 text-center flex flex-col justify-center', className)}>
      <div className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill} className={cn("size-10", iconStyle)}>
          <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
        </svg>
      </div>
      <h3 className="text-sm font-medium text-gray-400 mt-5">{title}</h3>
    </div>
  );
}
