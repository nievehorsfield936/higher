import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Screen from '../../components/Screen';
import { Colours } from '../../constants/colours';
import { spacing, typography } from '../../src/theme';

export default function SessionCompleteScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Header
          title="Session complete"
          subtitle="Great work. You moved your study forward today."
        />

        <Card>
          <Text style={styles.emoji}>🎉</Text>

          <Text style={styles.title}>
            Nice work.
          </Text>

          <Text style={styles.body}>
            Higher has logged this study session. Soon, this will update your
            preparation score, streak and recommendations.
          </Text>
        </Card>

        <View style={styles.buttonWrap}>
          <Button
            title="Done"
            onPress={() => router.replace('/(tabs)' as never)}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 46,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.h1,
    fontWeight: '700',
    color: Colours.INK,
    marginBottom: spacing.md,
  },
  body: {
    fontSize: typography.body,
    lineHeight: 24,
    color: Colours.STONE,
  },
  buttonWrap: {
    marginTop: spacing.xl,
  },
});