import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colours } from '@/constants/colours';
import { radius } from '@/src/theme';

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({
  progress,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.track}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress}%` as `${number}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: Colours.RULE,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colours.SAGE,
  },
});