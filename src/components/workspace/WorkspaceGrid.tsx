import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colours } from '@/constants/colours';
import { spacing } from '@/src/theme';
import QuickActionCard from './QuickActionCard';

type WorkspaceAction = {
  id: string;
  title: string;
  icon: LucideIcon;
};

type Section = {
  title: string;
  actions: WorkspaceAction[];
};

type Props = {
  sections: Section[];
  onActionPress: (id: string) => void;
};

export default function WorkspaceGrid({ sections, onActionPress }: Props) {
  return (
    <View>
      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>

          <View style={styles.grid}>
            {section.actions.map((action) => (
              <QuickActionCard
                key={action.id}
                title={action.title}
                icon={action.icon}
                onPress={() => onActionPress(action.id)}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
    color: Colours.STONE,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 12,
    rowGap: 12,
  },
});