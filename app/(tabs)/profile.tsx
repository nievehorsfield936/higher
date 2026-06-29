import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';

export default function ProfileScreen() {
  return (
    <Screen>
      <Header
        title="Profile"
        subtitle="Your study workspace, preferences and account settings."
      />

      <Card>
        <Text style={styles.label}>STUDENT</Text>
        <Text style={styles.name}>Nieve</Text>
        <Text style={styles.detail}>University / High school student</Text>
      </Card>

      <View style={styles.section}>
        <Card>
          <Text style={styles.label}>PLAN</Text>
          <Text style={styles.itemTitle}>Higher Art Free</Text>
          <Text style={styles.detail}>Upgrade options will live here later.</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Card>
          <Text style={styles.label}>PREFERENCES</Text>
          <Text style={styles.itemTitle}>Theme, subjects and reminders</Text>
          <Text style={styles.detail}>Customisation settings will live here.</Text>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 6,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 6,
  },
  detail: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
  },
  section: {
    marginTop: 16,
  },
});