import { Colours } from '@/constants/colours';
import { radius, spacing } from '@/src/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colours.OFF,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: radius.xl,
    padding: spacing.lg,
    shadowColor: Colours.INK,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 2,
  },
});