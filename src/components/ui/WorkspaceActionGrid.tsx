import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import { Colours } from '@/constants/colours';
import { spacing, typography } from '@/src/theme';

type Action = {
  id: string;
  title: string;
  count?: number;
  icon: LucideIcon;
};

type Props = {
  actions: Action[];
  onPress: (id: string) => void;
};

export default function WorkspaceActionGrid({ actions, onPress }: Props) {
  return (
    <View style={styles.grid}>
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <Pressable
            key={action.id}
            style={styles.item}
            onPress={() => onPress(action.id)}
          >
            <Card>
              <Icon size={24} color={Colours.SAGE} strokeWidth={2} />

              {typeof action.count === 'number' ? (
                <Text style={styles.count}>{action.count}</Text>
              ) : null}

              <Text style={styles.title}>{action.title}</Text>
            </Card>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  item: {
    width: '47%',
  },
  count: {
    marginTop: spacing.md,
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
  },
  title: {
    marginTop: spacing.xs,
    fontSize: typography.caption,
    fontWeight: '700',
    color: Colours.STONE,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});