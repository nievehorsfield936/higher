import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import { getCoachMessage } from '@/src/services/studyCoach';
import { useAppStore } from '@/src/store';
import {
  getDueCards,
  getTodaysRecommendation,
} from '@/src/utils/studyEngine';

export default function HomeScreen() {
  const subjects = useAppStore((state) => state.subjects);
  const notes = useAppStore((state) => state.notes);
  const decks = useAppStore((state) => state.decks);
  const flashcards = useAppStore((state) => state.flashcards);

  const currentSubject = subjects[0];

  const dueCards = useMemo(
    () => getDueCards(flashcards),
    [flashcards]
  );

  const recommendation = useMemo(
    () => getTodaysRecommendation(subjects, notes, flashcards),
    [subjects, notes, flashcards]
  );

  const coach = useMemo(
    () => getCoachMessage(recommendation),
    [recommendation]
  );

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
        <View style={styles.logoWrap}>
          <Image
           source={require('../../assets/branding/logo-full.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Header
          title="Good morning."
          subtitle={
            currentSubject
              ? 'Higher has your study plan ready.'
              : 'Create your first subject to begin.'
          }
        />

        {currentSubject ? (
          <>
            <Card>
              <Text style={styles.cardLabel}>HIGHER COACH</Text>
              <Text style={styles.cardTitle}>{coach.title}</Text>
              <Text style={styles.cardBody}>{coach.subtitle}</Text>
            </Card>

            <View style={styles.buttonWrap}>
              <Button
                title={coach.action}
                onPress={() =>
                  router.push(
                    `/subject/${recommendation?.subject.id ?? currentSubject.id}` as never
                  )
                }
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{subjects.length}</Text>
                <Text style={styles.statLabel}>Subjects</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{notes.length}</Text>
                <Text style={styles.statLabel}>Notes</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{dueCards.length}</Text>
                <Text style={styles.statLabel}>Due</Text>
              </View>
            </View>

            {recommendation ? (
              <>
                <Text style={styles.sectionLabel}>TODAY’S PRIORITY</Text>

                <Card>
                  <Text style={styles.cardLabel}>
                    {recommendation.subject.code}
                  </Text>

                  <Text style={styles.cardTitle}>
                    {recommendation.subject.name}
                  </Text>

                  <Text style={styles.cardBody}>
                    {recommendation.dueCardsCount > 0
                      ? `${recommendation.dueCardsCount} card${
                          recommendation.dueCardsCount === 1 ? '' : 's'
                        } due today. Accuracy is ${recommendation.accuracy}%. Estimated time: ${recommendation.estimatedMinutes} minutes.`
                      : `${recommendation.notesCount} note${
                          recommendation.notesCount === 1 ? '' : 's'
                        } and ${recommendation.cardsCount} card${
                          recommendation.cardsCount === 1 ? '' : 's'
                        } in this subject. Mastery is ${recommendation.mastery}%.`}
                  </Text>
                </Card>
              </>
            ) : null}

            {recentNote ? (
              <>
                <Text style={styles.sectionLabel}>CONTINUE</Text>

                <Card>
                  <Text style={styles.cardLabel}>RECENT NOTE</Text>
                  <Text style={styles.cardTitle}>{recentNote.title}</Text>
                  <Text numberOfLines={3} style={styles.cardBody}>
                    {recentNote.content || 'No content yet'}
                  </Text>
                </Card>
              </>
            ) : null}

            <Text style={styles.sectionLabel}>CURRENT SUBJECT</Text>

            <Card>
              <Text style={styles.cardLabel}>{currentSubject.code}</Text>
              <Text style={styles.subjectName}>{currentSubject.name}</Text>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${currentSubject.progress}%` },
                  ]}
                />
              </View>

              <Text style={styles.cardBody}>
                Open your workspace to continue notes, flashcards and study planning.
              </Text>
            </Card>

            <View style={styles.buttonWrap}>
              <Button
                title="Continue studying"
                onPress={() =>
                  router.push(`/subject/${currentSubject.id}` as never)
                }
              />
            </View>
          </>
        ) : (
          <>
            <Card>
              <Text style={styles.cardLabel}>EMPTY WORKSPACE</Text>
              <Text style={styles.cardTitle}>No subjects yet</Text>
              <Text style={styles.cardBody}>
                Create your first subject to build your study workspace.
              </Text>
            </Card>

            <View style={styles.buttonWrap}>
              <Button
                title="Create subject"
                onPress={() => router.push('/create-subject')}
              />
            </View>
          </>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 4,
  },
  logo: {
    width: 120,
    height: 105,
  },
  sectionLabel: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
  },
  cardLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 28,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 18,
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colours.OFF,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: Colours.INK,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 11,
    color: Colours.STONE,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressTrack: {
    height: 7,
    backgroundColor: Colours.RULE,
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colours.SAGE,
  },
  buttonWrap: {
    marginTop: 22,
  },
  bottomSpace: {
    height: 40,
  },
});