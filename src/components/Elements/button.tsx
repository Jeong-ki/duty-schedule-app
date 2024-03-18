import React, {ReactNode} from 'react';
import {Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  width?: number;
};

export const Button = ({
  children,
  onClick,
  disabled,
  isLoading,
  width = 100,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onClick}
      disabled={disabled}
      style={[styles.button, {width}, disabled && styles.disabled]}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{children}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#42a5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    // width: 90,
    height: 40,
  },
  disabled: {backgroundColor: 'gray'},
  buttonText: {color: '#fff', fontSize: 16},
});
