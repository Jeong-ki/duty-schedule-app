import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {Button} from '@/components/elements';
import {Modal} from '@/components/modal';
import {HomeScreenProps} from '@/navigation/types';
import {RouteNames} from '@/navigation/route-names';

const TestScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const handleMoveDetails: () => void = useCallback((): void => {
    navigation.navigate(RouteNames.user);
  }, [navigation]);

  return (
    <>
      <View
        style={{flex: 1, alignItems: 'flex-end', backgroundColor: 'yellow'}}>
        <Text>Home</Text>
        <Button onClick={handleMoveDetails}>Go Details</Button>
      </View>
      <View style={{flex: 2, backgroundColor: 'skyblue'}}>
        <Text>Good2</Text>
      </View>
      <Modal onCloseModal={() => {}}>
        <Text>Modal</Text>
      </Modal>
    </>
  );
};

export default TestScreen;
