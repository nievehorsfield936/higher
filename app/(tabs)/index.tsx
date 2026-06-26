import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { subjects } from '@/data/subjects';

const currentSubject = subjects[0];

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.logoWrap}>
        <Image
          source={require('../../assets/images/higher-art-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Header
        title="Good morning."
        subtitle="Continue where you left off."
      />

      <Card>
        <Text style={styles.cardLabel}>CURRENT SUBJECT</Text>
        <Text style={styles.subjectCode}>{currentSubject.code}</Text>
        <Text style={styles.subjectName}>{currentSubject.name}</Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${currentSubject.progress}%` },
            ]}
          />
        </View>

        <Text style={styles.cardBody}>Next: {currentSubject.nextTask}</Text>
      </Card>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>day streak</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>48</Text>
          <Text style={styles.statLabel}>cards due</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>2h</Text>
          <Text style={styles.statLabel}>today</Text>
        </View>
      </View>

      <View style={styles.promptBox}>
        <Text style={styles.cardLabel}>ASSISTANT</Text>
        <Text style={styles.promptText}>“What should I study today?”</Text>
      </View>

      <View style={styles.buttonWrap}>
        <Button title="Continue studying" />
      </View>
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
  cardLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
  },
  subjectCode: {
    fontSize: 30,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 4,
  },
  subjectName: {
    fontSize: 15,
    color: Colours.STONE,
    marginBottom: 18,
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
    borderRadius: 999,
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: Colours.STONE,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  promptBox: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 18,
    padding: 20,
    backgroundColor: Colours.WARM_WHITE,
  },
  promptText: {
    fontSize: 20,
    color: Colours.INK,
    fontWeight: '500',
  },
  buttonWrap: {
    marginTop: 22,
  },
});