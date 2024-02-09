import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@/components/Elements';
import {RootStackParamList} from '@/types';

type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInProps): React.JSX.Element {
  const handleMoveSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);
  return (
    <View>
      <Text>SignIn</Text>
      <Button onClick={handleMoveSignUp} text="Go SignUp" />
    </View>
  );
}

export default SignIn;
