import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Props = {
  subject: string;
  title: string;
  meta: string;
  onPress?: () => void;
};

export default function ContinueStudyCard({
  subject,
  title,
  meta,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <Text style={styles.label}>CONTINUE STUDYING</Text>

        <Text style={styles.subject}>{subject}</Text>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.footer}>
          <Text style={styles.meta}>{meta}</Text>
          <Text style={styles.play}>▶</Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.md,
  },
  subject: {
    fontFamily: 'PlayfairDisplay_500Medium',
    fontSize: 28,
    color: Colours.INK,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
    marginBottom: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: {
    fontSize: typography.caption,
    color: Colours.STONE,
  },
  play: {
    fontSize: typography.h2,
    color: Colours.SAGE,
  },
});