import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Card from '@/components/Card';
import { Colours } from '@/constants/colours';
import { Note } from '@/src/types/note';
import { formatDate } from '@/src/utils/formatDate';

type Props = {
  note: Note;
  onPress: () => void;
};

export default function NoteCard({ note, onPress }: Props) {
  return (
    <Pressable style={styles.wrap} onPress={onPress}>
      <Card>
        <Text style={styles.title}>{note.title}</Text>

        <Text numberOfLines={2} style={styles.preview}>
          {note.content || 'No content yet'}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.date}>{formatDate(note.updatedAt)}</Text>
          <Text style={styles.arrow}>→</Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colours.INK,
    marginBottom: 10,
  },
  preview: {
    fontSize: 15,
    lineHeight: 22,
    color: Colours.STONE,
    marginBottom: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: Colours.STONE,
  },
  arrow: {
    fontSize: 20,
    color: Colours.SAGE,
    fontWeight: '600',
  },
});