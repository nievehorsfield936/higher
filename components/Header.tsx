import { Colours } from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>HIGHER ART</Text>

      <Text style={styles.title}>{title}</Text>

      {subtitle ? (
        <Text style={styles.subtitle}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 32,
  },

  brand: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 8,
  },

  title: {
    fontSize: 36,
    fontWeight: '600',
    color: Colours.INK,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: Colours.STONE,
    lineHeight: 24,
  },
});