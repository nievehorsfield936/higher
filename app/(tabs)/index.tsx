import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import Card from '@/components/Card';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import ContinueStudyCard from '@/src/components/ui/ContinueStudyCard';
import DashboardHero from '@/src/components/ui/DashboardHero';
import EmptyState from '@/src/components/ui/EmptyState';
import InsightCard from '@/src/components/ui/InsightCard';
import SectionHeader from '@/src/components/ui/SectionHeader';
import StatGrid from '@/src/components/ui/StatGrid';
import SubjectSummaryCard from '@/src/components/ui/SubjectSummaryCard';
import { useStudyBrain } from '@/src/hooks/useStudyBrain';
import { useAppStore } from '@/src/store';
import { spacing, typography } from '@/src/theme';

export default function HomeScreen() {
  const subjects = useAppStore((state) => state.subjects);
  const notes = useAppStore((state) => state.notes);

  const currentSubject = subjects[0];
  const brain = useStudyBrain();

  const recentNote = useMemo(() => {
    return [...notes].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    )[0];
  }, [notes]);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DashboardHero
          greeting="Good morning."
          streak={brain.streak}
          preparation={brain.preparation}
        />

        {currentSubject ? (
          <>
            <ContinueStudyCard
              subject={currentSubject.name}
              title={brain.nextAction.title}
              meta={`${brain.nextAction.duration} min session`}
              onPress={() => router.push('/session')}
            />

            <SectionHeader title="This Week" />

            <StatGrid
              stats={[
                {
                  label: 'Sessions',
                  value: brain.sessionsThisWeek,
                },
                {
                  label: 'Minutes',
                  value: brain.studyMinutes,
                },
                {
                  label: 'Due',
                  value: brain.dueCards,
                },
              ]}
            />

            <SectionHeader title="Higher Insight" />

            <InsightCard title="Today’s focus" body={brain.insight} />

            {recentNote ? (
              <>
                <SectionHeader title="Continue" />

                <Card>
                  <Text style={styles.cardLabel}>RECENT NOTE</Text>
                  <Text style={styles.cardTitle}>{recentNote.title}</Text>
                  <Text numberOfLines={3} style={styles.cardBody}>
                    {recentNote.content || 'No content yet'}
                  </Text>
                </Card>
              </>
            ) : null}

            <SectionHeader title="Current Subject" />

            <SubjectSummaryCard
              code={currentSubject.code}
              name={currentSubject.name}
              preparation={brain.preparation}
            />
          </>
        ) : (
          <EmptyState
            title="No subjects yet"
            body="Create your first subject to build your study workspace."
          />
        )}

        <Text style={styles.bottomSpace} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardLabel: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },
  cardBody: {
    marginTop: spacing.md,
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
});