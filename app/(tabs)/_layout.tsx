import { Tabs } from 'expo-router';
import React from 'react';

import { Colours } from '@/constants/colours';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colours.SAGE,
        tabBarInactiveTintColor: Colours.STONE,
        tabBarStyle: {
          backgroundColor: Colours.WARM_WHITE,
          borderTopColor: Colours.RULE,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="notes" options={{ title: 'Subjects' }} />
      <Tabs.Screen name="planner" options={{ title: 'Create' }} />
      <Tabs.Screen name="assistant" options={{ title: 'Higher' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />

      <Tabs.Screen name="tracker" options={{ href: null }} />
      <Tabs.Screen name="flashcards" options={{ href: null }} />
    </Tabs>
  );
}