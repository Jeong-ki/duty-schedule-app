import React from 'react';
import {
  Keyboard,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface DismissKeyboardViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const DismissKeyboardHOC: (
  Comp: typeof KeyboardAwareScrollView,
) => React.FC<DismissKeyboardViewProps> = (
  Comp: typeof KeyboardAwareScrollView,
) => {
  return ({
    children,
    ...props
  }: DismissKeyboardViewProps): React.JSX.Element => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props} style={props.style}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};

const DismissKeyboardView: React.FC<DismissKeyboardViewProps> =
  DismissKeyboardHOC(KeyboardAwareScrollView);

export default DismissKeyboardView;
