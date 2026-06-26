import { Colours } from '@/constants/colors';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

type ScreenProps = {
  children: React.ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.WARM_WHITE,
    paddingHorizontal: 24,
  },
});