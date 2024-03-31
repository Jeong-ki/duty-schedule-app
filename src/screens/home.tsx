import React from 'react';
import {HomeScreenProps} from '@/navigation/types';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return <SafeAreaView>Calendar</SafeAreaView>;
};

export default HomeScreen;
