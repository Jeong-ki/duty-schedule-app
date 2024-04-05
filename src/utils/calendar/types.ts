export interface IGetMonthProps {
  year: number;
  month: number;
}

export interface IGetMonthReturnItem {
  year: number;
  month: number;
  day: number;
  isOtherMonth: boolean;
}

export interface ITargetDay {
  year: number;
  month: number;
  day: number;
}
