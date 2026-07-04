import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import ProgressBar from '@/components/common/ProgressBar';
import { Colours } from '@/constants/colours';
import {
  getDueCards,
  getTodaysRecommendation,
} from '@/src/utils/studyEngine';
import {
  getPreparationScore,
  getSessionsThisWeek,
  getTotalStudyMinutes,
} from '@/src/analytics';
import { useAppStore } from '@/src/store';
import { spacing, typography } from '@/src/theme';

export default function TrackerScreen() {
  const subjects = useAppStore((state) => state.subjects);
  const notes = useAppStore((state) => state.notes);
  const flashcards = useAppStore((state) => state.flashcards);
  const assessments = useAppStore((state) => state.assessments);
  const completedSessions = useAppStore((state) => state.completedSessions);

  const currentSubject = subjects[0];

  const dueCards = useMemo(
    () => getDueCards(flashcards),
    [flashcards]
  );

  const sessionsThisWeek = useMemo(
    () => getSessionsThisWeek(completedSessions),
    [completedSessions]
  );

  const totalStudyMinutes = useMemo(
    () => getTotalStudyMinutes(completedSessions),
    [completedSessions]
  );

  const recommendation = useMemo(
    () => getTodaysRecommendation(subjects, notes, flashcards),
    [subjects, notes, flashcards]
  );

  const preparation = useMemo(() => {
    if (!currentSubject) return 0;

    return getPreparationScore({
      subjectId: currentSubject.id,
      notes,
      flashcards,
      assessments,
      completedSessions,
    });
  }, [currentSubject, notes, flashcards, assessments, completedSessions]);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Progress"
          subtitle="Track your study rhythm and preparation."
        />

        <Card>
          <Text style={styles.label}>PREPARATION</Text>
          <Text style={styles.bigNumber}>{preparation}%</Text>
          <ProgressBar progress={preparation} />
          <Text style={styles.body}>
            Your readiness score is based on notes, flashcards, assessments and completed sessions.
          </Text>
        </Card>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{sessionsThisWeek.length}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalStudyMinutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{dueCards.length}</Text>
            <Text style={styles.statLabel}>Due</Text>
          </View>
        </View>

        {recommendation ? (
          <>
            <Text style={styles.sectionLabel}>CURRENT FOCUS</Text>

            <Card>
              <Text style={styles.label}>{recommendation.subject.code}</Text>
              <Text style={styles.title}>{recommendation.subject.name}</Text>
              <Text style={styles.body}>
                {recommendation.dueCardsCount} cards due · {recommendation.accuracy}% accuracy · {recommendation.estimatedMinutes} min suggested
              </Text>
            </Card>
          </>
        ) : null}

        <Text style={styles.sectionLabel}>RECENT SESSIONS</Text>

        {completedSessions.length === 0 ? (
          <Card>
            <Text style={styles.title}>No sessions yet.</Text>
            <Text style={styles.body}>
              Complete your first guided session to start building progress history.
            </Text>
          </Card>
        ) : (
          completedSessions.slice(0, 5).map((session) => (
            <View key={session.id} style={styles.sessionWrap}>
              <Card>
                <Text style={styles.label}>
                  {new Date(session.completedAt).toLocaleDateString()}
                </Text>

                <Text style={styles.title}>
                  {session.totalMinutes} minutes studied
                </Text>

                <Text style={styles.body}>
                  {session.stepsCompleted} step{session.stepsCompleted === 1 ? '' : 's'} completed · {session.preparation}% preparation
                </Text>
              </Card>
            </View>
          ))
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: typography.overline,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: spacing.sm,
  },
  bigNumber: {
    fontSize: typography.display,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.md,
  },
  body: {
    marginTop: spacing.md,
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    fontSize: typography.overline,
    letterSpacing: 2,
    fontWeight: '700',
    color: Colours.STONE,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colours.OFF,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 20,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: Colours.INK,
  },
  statLabel: {
    marginTop: spacing.xs,
    fontSize: typography.overline,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colours.STONE,
  },
  sessionWrap: {
    marginBottom: spacing.md,
  },
  bottomSpace: {
    height: spacing.xxl,
  },
});