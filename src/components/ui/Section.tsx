import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import { Colours } from '@/constants/colours';
import {
  spacing,
  typography,
} from '@/src/design';

type Props = {
  title: string;
};

export default function Section({
  title,
}: Props) {
  return (
    <Text style={styles.title}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,

    fontSize: typography.h3,

    fontWeight: '700',

    color: Colours.INK,
  },
});