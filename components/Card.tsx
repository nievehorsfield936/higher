import { Colours } from '@/constants/colours';
import { radius, spacing } from '@/src/theme';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colours.OFF,

    borderRadius: radius.xl,

    padding: spacing.lg,

    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 3,
  },
});