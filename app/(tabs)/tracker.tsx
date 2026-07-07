import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Screen from '@/components/Screen';
import DashboardHero from '@/src/components/ui/DashboardHero';
import GoalCard from '@/src/components/ui/GoalCard';
import InsightCard from '@/src/components/ui/InsightCard';
import ProgressScoreCard from '@/src/components/ui/ProgressScoreCard';
import ScoreRow from '@/src/components/ui/ScoreRow';
import SectionHeader from '@/src/components/ui/SectionHeader';
import StatGrid from '@/src/components/ui/StatGrid';
import { useStudyBrain } from '@/src/hooks/useStudyBrain';
import { spacing } from '@/src/theme';

export default function TrackerScreen() {
  const brain = useStudyBrain();

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <DashboardHero
          greeting="Your progress"
          streak={brain.streak}
          preparation={brain.preparation}
          progressLabel="Overall readiness"
        />

        <ProgressScoreCard
          score={brain.preparation}
          subtitle="Your readiness is calculated from study consistency, notes, flashcards and assessments."
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

        <SectionHeader title="Study Health" />

        <ScoreRow
          label="Notes"
          value={brain.notesScore}
        />

        <ScoreRow
          label="Flashcards"
          value={brain.flashcardsScore}
        />

        <ScoreRow
          label="Assessments"
          value={brain.assessmentScore}
        />

        <ScoreRow
          label="Consistency"
          value={brain.consistencyScore}
        />

        <SectionHeader title="Higher Insight" />

        <InsightCard
          title="Your trajectory"
          body={brain.insight}
        />

        <SectionHeader title="Goals" />

        <GoalCard
          goals={[
            {
              label: 'Study 5 days this week',
              done: brain.sessionsThisWeek >= 5,
            },
            {
              label: 'Maintain your study streak',
              done: brain.streak >= 7,
            },
            {
              label: 'Clear all due flashcards',
              done: brain.dueCards === 0,
            },
          ]}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxxl,
  },
});