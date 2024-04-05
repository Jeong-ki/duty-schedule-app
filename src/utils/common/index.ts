import type {IGetMonthReturnItem} from '../calendar/types';

export const isEmptyObj = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const chunkArray = (arr: IGetMonthReturnItem[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
