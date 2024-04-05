import React from 'react';
import {View} from 'react-native';
import type {ISpacingProps} from './types';

const Spacing = ({height, width, backgroundColor = '#ffff'}: ISpacingProps) => {
  return <View style={{height, width, backgroundColor}} />;
};

export default Spacing;
