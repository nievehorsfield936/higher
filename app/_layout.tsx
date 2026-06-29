import {
  DMSans_300Light,
  DMSans_400Regular,
  DMSans_500Medium,
} from '@expo-google-fonts/dm-sans';
import {
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_500Medium,
  useFonts,
} from '@expo-google-fonts/playfair-display';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSans_300Light,
    DMSans_400Regular,
    DMSans_500Medium,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
 <Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="(tabs)" />
  <Stack.Screen name="onboarding" />
  <Stack.Screen name="create-subject" />

  <Stack.Screen name="subject/[id]/index" />
  <Stack.Screen name="subject/[id]/notes" />
  <Stack.Screen name="subject/[id]/new-note" />
  <Stack.Screen name="subject/[id]/note/[noteId]" />

  <Stack.Screen name="subject/[id]/flashcards" />
  <Stack.Screen name="subject/[id]/new-deck" />
  <Stack.Screen name="subject/[id]/deck/[deckId]" />
  <Stack.Screen name="subject/[id]/deck/[deckId]/new-card" />
  <Stack.Screen name="subject/[id]/deck/[deckId]/study" />

  <Stack.Screen name="subject/[id]/assessments" />
  <Stack.Screen name="subject/[id]/new-assessment" />
<Stack.Screen name="subject/[id]/assessment/[assessmentId]" />

<Stack.Screen name="session/index" />
<Stack.Screen name="session/active" />
<Stack.Screen name="session/complete" />

</Stack>
  );
}