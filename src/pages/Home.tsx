import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {Button} from '@/components/Elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '@/types';
import {Modal} from '@/components/Modal';

type HomeProps = NativeStackScreenProps<LoggedInParamList, 'Home'>;

function Home({navigation}: HomeProps): React.JSX.Element {
  const handleMoveDetails: () => void = useCallback((): void => {
    navigation.navigate('User');
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
      <Modal onCloseModal={() => {}}>
        <Text>Modal</Text>
      </Modal>
    </>
  );
}

export default Home;
