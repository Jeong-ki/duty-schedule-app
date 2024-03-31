import {DAYS_IN_MONTH} from '@/constants';

const getCurrentDate = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
});

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

  const firstDayOfWeek = getFirstDayOfWeek(year, month);
  const prevMonthLastDay = monthDay[(month - 2 + 12) % 12];

  const prevMonthDays = Array.from({length: firstDayOfWeek}, (_, i) => {
    return {day: String(prevMonthLastDay - i), isOtherMonth: true};
  }).reverse();

  const currentMonthDays = Array.from({length: monthDay[month - 1]}, (_, i) => {
    return {day: String(i + 1)};
  });

  const totalDisplayedDays = prevMonthDays.length + currentMonthDays.length;
  const remainDay = 7 - (totalDisplayedDays % 7);

  const nextMonthDays = Array.from({length: remainDay}, (_, i) => {
    return {day: String(i + 1), isOtherMonth: true};
  }).slice(0, remainDay < 7 ? remainDay : 0);

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

const getPrevMonth = ({year, month}: {year: number; month: number}) => {
  return month === 1 ? {year: year - 1, month: 12} : {year, month: month - 1};
};

const getNextMonth = ({year, month}: {year: number; month: number}) => {
  return month === 12 ? {year: year + 1, month: 1} : {year, month: month + 1};
};

export {getCurrentDate, getMonthDate, getPrevMonth, getNextMonth};
