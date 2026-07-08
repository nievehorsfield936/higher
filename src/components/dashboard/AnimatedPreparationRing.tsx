import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Colours } from '@/constants/colours';
import { typography } from '@/src/theme';

type Props = {
  value: number;
  size?: number;
  strokeWidth?: number;
};

export default function AnimatedPreparationRing({
  value,
  size = 150,
  strokeWidth = 12,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(value, 100));
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          stroke={Colours.RULE}
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <Circle
          stroke={Colours.SAGE}
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.value}>{progress}%</Text>
        <Text style={styles.label}>Ready</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
  },
  value: {
    fontSize: 34,
    fontWeight: '700',
    color: Colours.INK,
  },
  label: {
    marginTop: 2,
    fontSize: typography.caption,
    color: Colours.STONE,
  },
});