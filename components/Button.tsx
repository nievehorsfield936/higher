import { Colours } from '@/constants/colors';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colours.SAGE,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.85,
  },

  text: {
    color: Colours.INK,
    fontSize: 16,
    fontWeight: '600',
  },
});