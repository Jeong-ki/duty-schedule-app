import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {Button} from '@/components/Elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: HomeProps): React.JSX.Element {
  const handleMoveDetails = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);
  return (
    <>
      <View
        style={{flex: 1, alignItems: 'flex-end', backgroundColor: 'yellow'}}>
        <Text>Home</Text>
        <Button onClick={handleMoveDetails} text="Go Details" />
      </View>
      <View style={{flex: 2, backgroundColor: 'skyblue'}}>
        <Text>Good2</Text>
      </View>
    </>
  );
}

export default Home;
