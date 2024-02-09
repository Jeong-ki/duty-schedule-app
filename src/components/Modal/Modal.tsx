import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

type ModalProps = {
  children: React.JSX.Element;
  onCloseModal: () => void;
};

export const Modal = ({children, onCloseModal}: ModalProps) => {
  return (
    <Pressable onPress={onCloseModal} style={styles.modal}>
      <Pressable style={styles.modalInner}>
        <View style={styles.innerContent}>{children}</View>
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.button}>
            <Text>네</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text>아니오</Text>
          </Pressable>
        </View>
      </Pressable>
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
