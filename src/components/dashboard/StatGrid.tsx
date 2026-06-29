import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Colours } from '@/constants/colours';

interface Stat {
  label: string;
  value: string | number;
}

interface StatGridProps {
  stats: Stat[];
}

export default function StatGrid({
  stats,
}: StatGridProps) {
  return (
    <View style={styles.row}>
      {stats.map((stat) => (
        <View
          key={stat.label}
          style={styles.box}
        >
          <Text style={styles.value}>
            {stat.value}
          </Text>

          <Text style={styles.label}>
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },

  box: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colours.RULE,
    backgroundColor: Colours.OFF,
    alignItems: 'center',
    paddingVertical: 18,
  },

  value: {
    fontSize: 24,
    fontWeight: '600',
    color: Colours.INK,
  },

  label: {
    marginTop: 4,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colours.STONE,
  },
});