import React from 'react';
import {Text, View} from 'react-native';
import {UserScreenProps} from '@/navigation/types';
import {Button} from '@/components/elements';
import {useUserStore} from '@/stores/useUserStore';
import {removeRefreshToken} from '@/utils/auth';

const UserScreen: React.FC<UserScreenProps> = ({navigation}) => {
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
        <Text>username: {user?.username}</Text>
      </View>
      <Button onClick={handleLogout} isLoading={false} disabled={false}>
        로그아웃
      </Button>
    </>
  );
};

export default UserScreen;
