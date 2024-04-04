import {DAYS_IN_MONTH} from '@/constants/calendar';

const checkLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getFirstDayOfWeek = (year: number, month: number): number => {
  const curMonth = month < 10 ? `0${month}` : `${month}`;
  return new Date(`${year}-${curMonth}-01`).getDay();
};

const getMonthDate = ({
  year,
  month,
}: {
  year: number;
  month: number;
}): {year: number; month: number; day: number; isOtherMonth: boolean}[] => {
  const monthDay = [...DAYS_IN_MONTH];
  if (checkLeapYear(year)) {
    monthDay[1] = 29;
  }

  const firstDayOfWeek = getFirstDayOfWeek(year, month + 1);
  const prevMonthLastDay = monthDay[(month + 11) % 12];

  const prevMonthDays = Array.from({length: firstDayOfWeek}, (_, i) => {
    return {
      year,
      month: month - 1,
      day: prevMonthLastDay - i,
      isOtherMonth: true,
    };
  }).reverse();

  const currentMonthDays = Array.from({length: monthDay[month]}, (_, i) => {
    return {year, month, day: i + 1, isOtherMonth: false};
  });

  const totalDisplayedDays = prevMonthDays.length + currentMonthDays.length;
  const remainDay = 7 - (totalDisplayedDays % 7);

  const nextMonthDays = Array.from({length: remainDay}, (_, i) => {
    return {year, month: month + 1, day: i + 1, isOtherMonth: true};
  }).slice(0, remainDay < 7 ? remainDay : 0);

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

interface ITargetDay {
  year: number;
  month: number;
  day: number;
}
const isToday = ({year, month, day}: ITargetDay) => {
  const targetDate = new Date(year, month, day);
  const today = new Date();

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return targetDate.getTime() === today.getTime();
};

export {getMonthDate, isToday};
