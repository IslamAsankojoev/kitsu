import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function transformPaginationSearchParams (searchParams) {
  const params = []
  for(let entry of searchParams.entries()) {
    params.push(entry);
  }
  const newParams = params.map(([key, value]) => {
    return { [`page[${key}]`]: value }
  })
  return new URLSearchParams(Object.assign({}, ...newParams));
};
