import { Colours } from '@/constants/colours';
import { StyleSheet, Text, View } from 'react-native';

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>HIGHER ART</Text>
      <Text style={styles.title}>Notes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.WARM_WHITE,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: Colours.STONE,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    color: Colours.INK,
    fontWeight: '500',
  },
});