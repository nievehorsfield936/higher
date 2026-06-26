import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colours } from '@/constants/colors';

type ProgressBarProps = {
  progress: number;
  colour?: string;
};

export default function ProgressBar({
  progress,
  colour = Colours.SAGE,
}: ProgressBarProps) {
  const safeProgress = Math.max(0, Math.min(progress, 100));

  return (
    <View style={styles.track}>
      <View
        style={[
          styles.fill,
          {
            width: `${safeProgress}%`,
            backgroundColor: colour,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 7,
    backgroundColor: Colours.RULE,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});