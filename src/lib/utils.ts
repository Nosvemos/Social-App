import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function kFormatter(num: number): string {
  if (Math.abs(num) >= 10000) {
    const convertedNum = (Math.abs(num) / 1000);
    const formattedNum = convertedNum % 1 === 0
      ? convertedNum.toFixed(0)
      : convertedNum.toFixed(1).replace(/\.0$/, '');
    return `${Math.sign(num) * Number(formattedNum)}k`;
  }
  return `${Math.sign(num) * Math.abs(num)}`;
}
