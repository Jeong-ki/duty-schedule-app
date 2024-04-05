import {countryCalendarMap} from '@/constants';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getCountry} from 'react-native-localize';
import {CalendarInner} from './calendar-inner';
import Swiper from 'react-native-swiper';

export const Calendar = () => {
  const country = getCountry();
  const isKr: boolean = country === 'KR';
  const {months, weekDays} =
    countryCalendarMap[country] || countryCalendarMap.EN;
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSwipeMonth = (index: number) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + (index - 1));
    setCurrentDate(date);
  };

  const getCalendarProps = (offset: number) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + offset);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.month}>{months[currentDate.getMonth()]}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.thead}>
          {weekDays.map((day, index) => (
            <Text
              key={day}
              style={[
                styles.cellHead,
                index === 0 && styles.sunday,
                index === 6 && isKr && styles.saturday,
              ]}>
              {day}
            </Text>
          ))}
        </View>
        <Swiper
          key={currentDate.getMonth()}
          loop={false}
          index={1}
          onIndexChanged={index => handleSwipeMonth(index)}
          showsPagination={false}>
          <CalendarInner {...getCalendarProps(-1)} />
          <CalendarInner {...getCalendarProps(0)} />
          <CalendarInner {...getCalendarProps(1)} />
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 6,
  },
  month: {
    fontSize: 20,
    fontWeight: '600',
  },
  table: {
    flex: 1,
    padding: 5,
  },
  thead: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  cellHead: {
    flex: 1,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 12,
  },
  saturday: {
    color: '#1b56cb',
  },
  sunday: {
    color: '#cf2626',
  },
  otherMonth: {
    opacity: 0.3,
  },
  memo: {
    fontSize: 11,
    paddingHorizontal: 1,
  },
});
