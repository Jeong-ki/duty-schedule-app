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
import {formatDate} from '@/utils';
import {getLocales} from 'react-native-localize';

export const Modal = () => {
  const {
    item: {year, month, day, memo, color},
    onOpen,
  } = useModalStore();
  const locales = getLocales();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [textMemo, setTextMemo] = useState(memo || '');

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
        <View style={styles.modalInner}>
          <View style={styles.currentDate}>
            <Text>
              {formatDate({
                date: new Date(`${year}-${month}-${day}`),
                locales,
              })}
            </Text>
            <Text>닫기(아이콘)</Text>
          </View>
          <View style={styles.innerContent}>
            <TextInput
              style={styles.memoInput}
              placeholder="메모를 입력하세요..."
              value={memo}
              onChangeText={text => setTextMemo(text)}
              multiline
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable style={styles.button}>
              <Text>컬러</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text>체크박스</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text>줄긋기</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text>확인(아이콘)</Text>
            </Pressable>
          </View>
        </View>
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
    marginTop: 15,
  },
  modalInner: {
    backgroundColor: 'orange',
    height: 350,
    width: Dimensions.get('window').width - 50,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  currentDate: {
    alignItems: 'center',
  },
  innerContent: {
    flex: 1,
    backgroundColor: 'pink',
  },
  memoInput: {
    flex: 1,
    backgroundColor: 'gray',
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});
