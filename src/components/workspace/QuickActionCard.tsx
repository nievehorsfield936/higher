import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colours } from '@/constants/colors';

type Props = {
  title: string;
  icon: LucideIcon;
  onPress?: () => void;
};

export default function QuickActionCard({
  title,
  icon: Icon,
  onPress,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Icon size={26} color={Colours.SAGE} strokeWidth={2} />

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.OFF,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colours.RULE,
    paddingVertical: 24,
    gap: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: Colours.INK,
  },
});