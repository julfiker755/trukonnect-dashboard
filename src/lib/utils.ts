import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PlaceholderImg = (width: number = 600, height: number = 400): string => {
  return `https://placehold.co/${width}x${height}.png`;
};

export const delay = (ms: number = 4000) => new Promise((resolve) => setTimeout(resolve, ms));
