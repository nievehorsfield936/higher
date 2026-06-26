import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colors';

export default function OnboardingScreen() {
  return (
    <Screen>
      <View style={styles.logoWrap}>
        <Image
          source={require('../assets/images/higher-art-logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.brand}>HIGHER ART</Text>
      <Text style={styles.title}>Build your study workspace.</Text>
      <Text style={styles.subtitle}>
        Create subjects, organise notes, plan deadlines, review flashcards and study with Higher.
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>WHAT ARE YOU STUDYING?</Text>

        <Card>
          <Text style={styles.optionTitle}>University</Text>
          <Text style={styles.optionBody}>Subjects, lectures, tutorials and assessments.</Text>
        </Card>

        <Pressable style={styles.option}>
          <Text style={styles.optionTitle}>High School</Text>
          <Text style={styles.optionBody}>Subjects, homework, exams and revision.</Text>
        </Pressable>

        <Pressable style={styles.option}>
          <Text style={styles.optionTitle}>Other</Text>
          <Text style={styles.optionBody}>Self-study, certificates or personal learning.</Text>
        </Pressable>
      </View>

      <View style={styles.buttonWrap}>
        <Button title="Continue" onPress={() => router.push('/create-subject')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 105,
  },
  brand: {
    fontSize: 11,
    letterSpacing: 3,
    color: Colours.STONE,
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '600',
    color: Colours.INK,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colours.STONE,
    textAlign: 'center',
  },
  section: {
    marginTop: 32,
    gap: 12,
  },
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 4,
  },
  option: {
    backgroundColor: Colours.WARM_WHITE,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 20,
    padding: 22,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 6,
  },
  optionBody: {
    fontSize: 14,
    lineHeight: 20,
    color: Colours.STONE,
  },
  buttonWrap: {
    marginTop: 28,
  },
});