import {DAYS_IN_MONTH} from '@/constants/calendar';

const checkLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getFirstDayOfWeek = (year: number, month: number): number => {
  const curMonth = month < 10 ? `0${month}` : `${month}`;
  return new Date(`${year}-${curMonth}-01`).getDay();
};

const getMonthDate = ({year, month}: {year: number; month: number}): any[] => {
  const monthDay = [...DAYS_IN_MONTH];
  if (checkLeapYear(year)) {
    monthDay[1] = 29;
  }

  const firstDayOfWeek = getFirstDayOfWeek(year, month + 1);
  const prevMonthLastDay = monthDay[(month + 11) % 12];

  const prevMonthDays = Array.from({length: firstDayOfWeek}, (_, i) => {
    return {day: String(prevMonthLastDay - i), isOtherMonth: true};
  }).reverse();

  const currentMonthDays = Array.from({length: monthDay[month]}, (_, i) => {
    return {day: String(i + 1)};
  });

  const totalDisplayedDays = prevMonthDays.length + currentMonthDays.length;
  const remainDay = 7 - (totalDisplayedDays % 7);

  const nextMonthDays = Array.from({length: remainDay}, (_, i) => {
    return {day: String(i + 1), isOtherMonth: true};
  }).slice(0, remainDay < 7 ? remainDay : 0);

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

export {getMonthDate};
