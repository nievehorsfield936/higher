import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { Colours } from '@/constants/colours';

interface FocusCardProps {
  title: string;
  subtitle: string;
  progress: number;
  buttonTitle: string;
  onPress?: () => void;
}

export default function FocusCard({
  title,
  subtitle,
  progress,
  buttonTitle,
  onPress,
}: FocusCardProps) {
  return (
    <Card>
      <Text style={styles.label}>TODAY'S FOCUS</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(progress, 100)}%` },
          ]}
        />
      </View>

      <Text style={styles.progressText}>
        {progress}% prepared
      </Text>

      <View style={styles.buttonWrap}>
        <Button
          title={buttonTitle}
          onPress={onPress ?? (() => {})}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colours.STONE,
    marginBottom: 20,
  },

  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: Colours.RULE,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: Colours.SAGE,
  },

  progressText: {
    marginTop: 10,
    fontSize: 14,
    color: Colours.STONE,
  },

  buttonWrap: {
    marginTop: 22,
  },
});