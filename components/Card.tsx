import { Colours } from '@/constants/colors';
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
    borderRadius: 20,
    padding: 24,
  },
});