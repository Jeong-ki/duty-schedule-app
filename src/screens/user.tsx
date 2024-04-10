import React from 'react';
import {Text, View} from 'react-native';
import {Button} from '@/components/elements';
import {useUserStore} from '@/stores';
import {removeRefreshToken} from '@/utils';
import type {UserScreenProps} from '@/navigation/types';

const UserScreen = ({navigation}: UserScreenProps) => {
  const {logout, user} = useUserStore();

  const handleLogout = async () => {
    logout();
    removeRefreshToken();
  };

  return (
    <>
      <View>
        <Text>User</Text>
      </View>
      <View>
        <Text>email: {user?.email}</Text>
      </View>
      <Button onClick={handleLogout} isLoading={false} disabled={false}>
        로그아웃
      </Button>
    </>
  );
};

export default UserScreen;
