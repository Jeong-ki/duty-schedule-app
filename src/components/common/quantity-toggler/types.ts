import {StyleProp, ViewStyle} from 'react-native';

export interface IQuantityTogglerProps {
  quantity: number;
  onIncreaseQuantityPress: () => void;
  onDecreaseQuantityPress: () => void;
  style?: StyleProp<ViewStyle>;
  uniqueID?: string;
}
