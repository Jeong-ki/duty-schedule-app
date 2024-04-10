import React from 'react';
import {chunkArray, getMonthDate, isToday} from '@/utils';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {CalendarInnerProps} from './types';
import {useModalStore} from '@/stores/useModalStore';
import {ITargetDay} from '@/utils/calendar/types';

export const CalendarInner = ({year, month, isKr}: CalendarInnerProps) => {
  const {setItem, onOpen} = useModalStore();

  const handleOpenModal = (item: ITargetDay) => () => {
    setItem({...item, memo: '메모 테스트', color: ''});
    onOpen(true);
  };

  return (
    <View style={styles.tbody}>
      {chunkArray(getMonthDate({year, month}), 7).map((chunk, chunkIdx) => (
        <View key={chunkIdx} style={styles.cellRow}>
          {chunk.map((item, idx) => (
            <Pressable
              key={item.day}
              style={styles.cell}
              onPress={handleOpenModal(item)}>
              <View style={styles.dayBox}>
                <View style={[isToday(item) && styles.today]}>
                  <Text
                    style={[
                      styles.day,
                      idx === 0 && styles.sunday,
                      idx === 6 && isKr && styles.saturday,
                      item?.isOtherMonth && styles.otherMonth,
                      isToday(item) && styles.todayText,
                    ]}>
                    {item.day}
                  </Text>
                </View>
              </View>
              <Text
                numberOfLines={100}
                ellipsizeMode="tail"
                style={[styles.memo, item?.isOtherMonth && styles.otherMonth]}>
                {
                  '가나 다라마바사메모메모메모가나다라마바사메모메모메모가나다\n라마바사메모메모메모가나다라마ㅋㅋ어이없다잉'
                }
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tbody: {
    flex: 1,
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
    paddingTop: 2,
  },
  dayBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    fontSize: 12,
    width: 18,
    height: 17,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 1,
  },
  today: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  todayText: {
    color: '#fff',
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
    flex: 1,
    fontSize: 11,
    paddingHorizontal: 1,
  },
});
