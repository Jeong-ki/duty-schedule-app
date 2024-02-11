import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

interface DismissKeyboardViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const DismissKeyboardHOC = (
  Comp: typeof KeyboardAvoidingView,
): React.FC<DismissKeyboardViewProps> => {
  return ({children, ...props}) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp
        {...props}
        behavior={Platform.OS === 'android' ? 'position' : 'padding'}
        style={props.style}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};

const DismissKeyboardView: React.FC<DismissKeyboardViewProps> =
  DismissKeyboardHOC(KeyboardAvoidingView);

export default DismissKeyboardView;
