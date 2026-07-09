import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GlassCard from './GlassCard';
import AnimatedPreparationRing from '@/src/components/dashboard/AnimatedPreparationRing';

import { Colours } from '@/constants/colours';
import {
  radius,
  spacing,
  typography,
} from '@/src/design';

type Props = {
  name: string;
  code: string;
  preparation: number;
  nextTask?: string;
};

export default function SubjectHero({
  name,
  code,
  preparation,
  nextTask,
}: Props) {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.code}>
          {code.toUpperCase()}
        </Text>

        <Text style={styles.name}>
          {name}
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {preparation >= 85
              ? 'Exam Ready'
              : preparation >= 70
              ? 'On Track'
              : preparation >= 50
              ? 'Building'
              : 'Getting Started'}
          </Text>
        </View>

        {nextTask ? (
          <>
            <Text style={styles.label}>
              NEXT TASK
            </Text>

            <Text style={styles.task}>
              {nextTask}
            </Text>
          </>
        ) : null}
      </View>

      <AnimatedPreparationRing
        value={preparation}
        size={120}
      />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  left: {
    flex: 1,
    paddingRight: spacing.lg,
  },

  code: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },

  name: {
    fontSize: typography.h1,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.md,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    marginBottom: spacing.lg,
  },

  badgeText: {
    color: Colours.SAGE,
    fontWeight: '700',
  },

  label: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.xs,
  },

  task: {
    fontSize: typography.body,
    color: Colours.INK,
    fontWeight: '600',
  },
});