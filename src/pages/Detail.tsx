import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {Button} from '@/components/Elements';

type DetailsProps = NativeStackScreenProps<ParamListBase, 'Details'>;

function Details({navigation}: DetailsProps): React.JSX.Element {
  const handleMoveHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);
  return (
    <View style={{backgroundColor: 'green'}}>
      <Text>Details</Text>

      <Button onClick={handleMoveHome} text="Go Home" />
    </View>
  );
}

export default Details;
