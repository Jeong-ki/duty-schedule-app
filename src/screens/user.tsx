import React from 'react';
import {Text, View} from 'react-native';
import {UserScreenProps} from '@/navigation/types';

type Props = UserScreenProps;

const UserScreen: React.FC<Props> = ({navigation}) => {
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
