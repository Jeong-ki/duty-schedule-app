import React from 'react';
import {chunkArray} from '@/utils';
import {getMonthDate} from '@/utils/calendar';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {CalendarInnerProps} from './types';
import {getCountry} from 'react-native-localize';

export const CalendarInner = ({year, month}: CalendarInnerProps) => {
  const country = getCountry();
  const isKr: boolean = country === 'KR';
  return (
    <View style={styles.tbody}>
      {chunkArray(getMonthDate({year, month}), 7).map((chunk, chunkIdx) => (
        <View key={chunkIdx} style={styles.cellRow}>
          {chunk.map((item, idx) => (
            <View key={item.day} style={styles.cell}>
              <Text
                style={[
                  styles.day,
                  idx === 0 && styles.sunday,
                  idx === 6 && isKr && styles.saturday,
                  item?.isOtherMonth && styles.otherMonth,
                ]}>
                {item.day}
              </Text>
              <Text
                style={[styles.memo, item?.isOtherMonth && styles.otherMonth]}>
                메모...
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tbody: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  cellRow: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
  },
  cell: {
    flex: 1,
  },
  day: {
    fontSize: 12,
    paddingVertical: 5,
    fontWeight: '500',
    textAlign: 'center',
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
