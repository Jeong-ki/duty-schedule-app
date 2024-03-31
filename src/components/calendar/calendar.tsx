import {chunkArray} from '@/utils';
import {
  getCurrentDate,
  getMonthDate,
  getNextMonth,
  getPrevMonth,
} from '@/utils/calendar';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export const Calendar = () => {
  const [date, setDate] = useState(getCurrentDate(new Date()));

  const handlePrevMonth = () => {
    setDate(prevDate => getPrevMonth(prevDate));
  };
  const handleNextMonth = () => {
    setDate(prevDate => getNextMonth(prevDate));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handlePrevMonth}>
          <Text>{'<'}</Text>
        </Pressable>
        <Text style={styles.month}>{date.month}월</Text>
        <Pressable onPress={handleNextMonth}>
          <Text>{'>'}</Text>
        </Pressable>
      </View>
      <View style={styles.table}>
        <View style={styles.thead}>
          <Text style={[styles.cellHead, styles.sunday]}>일</Text>
          <Text style={styles.cellHead}>월</Text>
          <Text style={styles.cellHead}>화</Text>
          <Text style={styles.cellHead}>수</Text>
          <Text style={styles.cellHead}>목</Text>
          <Text style={styles.cellHead}>금</Text>
          <Text style={[styles.cellHead, styles.saturday]}>토</Text>
        </View>
        <View style={styles.tbody}>
          {chunkArray(getMonthDate(date), 7).map((chunk, chunkIdx) => (
            <View key={chunkIdx} style={styles.cellRow}>
              {chunk.map((item, idx) => (
                <View key={item.day} style={styles.cell}>
                  <Text
                    style={[
                      styles.day,
                      idx === 0 && styles.sunday,
                      idx === 6 && styles.saturday,
                      item?.isOtherMonth && styles.otherMonth,
                    ]}>
                    {item.day}
                  </Text>
                  <Text />
                </View>
              ))}
            </View>
          ))}
        </View>
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
    padding: 10,
  },
  thead: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  cellHead: {
    flex: 1,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 13,
  },
  tbody: {
    flex: 1,
  },
  cellRow: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  cell: {
    flex: 1,
  },
  day: {
    paddingTop: 5,
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
});
