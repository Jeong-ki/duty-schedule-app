import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useModalStore} from '@/stores/useModalStore';

export const Modal = () => {
  const {item, onOpen} = useModalStore();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleOutsidePress = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    } else {
      onOpen(false);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Pressable onPress={handleOutsidePress} style={styles.modal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <Pressable style={styles.modalInner}>
          <View style={styles.innerContent}>
            <Text>{item?.memo}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TextInput placeholder="input test" />
            <Pressable onPress={() => console.log('yes')} style={styles.button}>
              <Text>네</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text>아니오</Text>
            </Pressable>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    backgroundColor: 'orange',
    height: 300,
    width: Dimensions.get('window').width - 100,
    borderRadius: 20,
    padding: 20,
  },
  innerContent: {
    flex: 1,
    backgroundColor: 'pink',
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});
