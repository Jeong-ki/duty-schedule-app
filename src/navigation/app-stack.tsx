import React from 'react';
import type {StackParamList} from './types';
import {HomeScreen, UserScreen} from '@/screens';
import {RouteNames} from './route-names';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName={RouteNames.home}>
      <Stack.Screen
        name={RouteNames.home}
        component={HomeScreen as React.ComponentType}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.user}
        component={UserScreen as React.ComponentType}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
