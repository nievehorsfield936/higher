import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Colours } from '@/constants/colours';
import { useAppStore } from '@/src/store';

export default function CreateSubjectScreen() {
  const addSubject = useAppStore((state) => state.addSubject);
const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  const [level, setLevel] = useState<'university' | 'highschool' | 'other'>(
    'university'
  );
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const canContinue = name.trim().length > 0;

  function handleContinue() {
    if (!canContinue) return;

    addSubject({
      id: Date.now().toString(),
      name: name.trim(),
      code: code.trim() || name.trim(),
      colour: Colours.SAGE,
      level,
      progress: 0,
    });
completeOnboarding();
    router.replace('/(tabs)');
  }

  return (
    <Screen>
      <Header
        title="Create your first subject"
        subtitle="Start with one subject. You can add more later."
      />

      <Text style={styles.label}>STUDY TYPE</Text>

      <View style={styles.optionRow}>
        {(['university', 'highschool', 'other'] as const).map((item) => (
          <Pressable
            key={item}
            onPress={() => setLevel(item)}
            style={[
              styles.levelOption,
              level === item && styles.levelOptionActive,
            ]}
          >
            <Text
              style={[
                styles.levelText,
                level === item && styles.levelTextActive,
              ]}
            >
              {item === 'university'
                ? 'University'
                : item === 'highschool'
                  ? 'High School'
                  : 'Other'}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>SUBJECT NAME</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Psychology, Maths, Biology"
          placeholderTextColor={Colours.STONE}
          style={styles.input}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>SUBJECT CODE OPTIONAL</Text>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="e.g. PSYC2203, English, BIO101"
          placeholderTextColor={Colours.STONE}
          autoCapitalize="characters"
          style={styles.input}
        />
      </View>

      <View style={styles.preview}>
        <Text style={styles.label}>PREVIEW</Text>
        <Text style={styles.previewCode}>{code || name || 'Your Subject'}</Text>
        <Text style={styles.previewName}>{name || 'Subject name'}</Text>
      </View>

      <View style={styles.buttonWrap}>
        <Button title="Create workspace" onPress={handleContinue} />
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
  optionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  levelOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: Colours.WARM_WHITE,
  },
  levelOptionActive: {
    borderColor: Colours.SAGE,
    backgroundColor: Colours.SAGE_LIGHT,
  },
  levelText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colours.STONE,
  },
  levelTextActive: {
    color: Colours.INK,
  },
  fieldGroup: {
    marginBottom: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 18,
    padding: 18,
    fontSize: 16,
    color: Colours.INK,
    backgroundColor: Colours.WARM_WHITE,
  },
  preview: {
    borderWidth: 1,
    borderColor: Colours.RULE,
    borderRadius: 22,
    backgroundColor: Colours.OFF,
    padding: 22,
    marginTop: 6,
  },
  previewCode: {
    fontSize: 28,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 4,
  },
  previewName: {
    fontSize: 15,
    color: Colours.STONE,
  },
  buttonWrap: {
    marginTop: 26,
  },
});