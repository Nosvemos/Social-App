import { clsx, type ClassValue } from "clsx"
import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInYears, format } from 'date-fns';

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

export function formatTimeDifference(startDate: Date, endDate?: Date): string {
  endDate = endDate || new Date();
  const seconds = Math.abs(differenceInSeconds(startDate, endDate));
  const minutes = Math.abs(differenceInMinutes(startDate, endDate));
  const hours = Math.abs(differenceInHours(startDate, endDate));
  const days = Math.abs(differenceInDays(startDate, endDate));
  const weeks = Math.abs(differenceInWeeks(startDate, endDate));
  const years = Math.abs(differenceInYears(startDate, endDate));

  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  if (weeks < 52) return format(endDate, 'd MMM');
  return format(endDate, 'd MMM yyyy');
}

export function smartTruncateString(str: string, maxLength: number = 30): string {
  if (str.length <= maxLength) {
    return str;
  }

  let truncated = str.substring(0, maxLength);

  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > 0) {
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  return truncated + "...";
}