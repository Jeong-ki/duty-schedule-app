import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@/components/Elements';
import {RootStackParamList} from '@/types';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignUpProps): React.JSX.Element {
  const handleMoveSignUp = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);
  return (
    <View>
      <Text>SignUp</Text>
      <Button onClick={handleMoveSignUp} text="Go SignIn" />
    </View>
  );
}

export default SignUp;
