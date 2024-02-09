import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {Button} from '@/components/Elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '@/types';

type UserProps = NativeStackScreenProps<LoggedInParamList, 'User'>;

function User({navigation}: UserProps): React.JSX.Element {
  const handleMoveDetails = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);
  return (
    <>
      <View
        style={{flex: 1, alignItems: 'flex-end', backgroundColor: 'yellow'}}>
        <Text>User</Text>
        <Button onClick={handleMoveDetails} text="Go Details" />
      </View>
      <View style={{flex: 2, backgroundColor: 'skyblue'}}>
        <Text>Good2</Text>
      </View>
    </>
  );
}

export default User;
