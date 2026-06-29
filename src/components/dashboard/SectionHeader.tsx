import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Colours } from '@/constants/colors';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({
  title,
}: SectionHeaderProps) {
  return (
    <Text style={styles.title}>
      {title.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
    color: Colours.STONE,
  },
});