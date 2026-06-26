import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';
import { useAppStore } from '@/src/store';

export default function HomeScreen() {
  const subjects = useAppStore((state) => state.subjects);
  const currentSubject = subjects[0];

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
        subtitle={
          currentSubject
            ? 'Continue where you left off.'
            : 'Create your first subject to begin.'
        }
      />

      {currentSubject ? (
        <>
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

            <Text style={styles.cardBody}>Your workspace is ready.</Text>
          </Card>

          <View style={styles.buttonWrap}>
            <Button
              title="Continue studying"
              onPress={() =>
                router.push({
                  pathname: '/subject/[id]',
                  params: { id: currentSubject.id },
                } as never)
              }
            />
          </View>
        </>
      ) : (
        <>
          <Card>
            <Text style={styles.cardLabel}>EMPTY WORKSPACE</Text>
            <Text style={styles.subjectCode}>No subjects yet</Text>
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
  },
  cardBody: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },
  buttonWrap: {
    marginTop: 22,
  },
});