import React from 'react';
import {Text, View} from 'react-native';
import {UserScreenProps} from '@/navigation/types';

const UserScreen: React.FC<UserScreenProps> = ({navigation}) => {
  return (
    <>
      <View>
        <Text>User</Text>
      </View>
      <View>
        <Text>Good2</Text>
      </View>
    </>
  );
};

export default UserScreen;
