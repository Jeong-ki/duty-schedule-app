import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Calendar} from '@/components/calendar';
import type {HomeScreenProps} from '@/navigation/types';

const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Calendar />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
