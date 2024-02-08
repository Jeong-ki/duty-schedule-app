import React from 'react';
import {Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';

type ButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  loading?: boolean;
};

export const Button = ({onClick, text, disabled, loading}: ButtonProps) => {
  return (
    <Pressable onPress={onClick} disabled={disabled} style={styles.button}>
      {loading ? <ActivityIndicator color="white" /> : <Text>{text}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#42a5f5',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  buttonText: {color: '#fff', fontSize: 16},
});
