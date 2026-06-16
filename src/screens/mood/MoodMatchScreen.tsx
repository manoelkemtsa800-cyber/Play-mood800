import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../theme/colors';
import {useMoodStore} from '../../store/useMoodStore';

const MOODS = [
  {id: '1', name: 'Heureux', emoji: '😊', colorHex: '#FFD700'},
  {id: '2', name: 'Relaxé', emoji: '😌', colorHex: '#87CEEB'},
  {id: '3', name: 'Motivé', emoji: '💪', colorHex: '#FF4500'},
  {id: '4', name: 'Triste', emoji: '😢', colorHex: '#4682B4'},
  {id: '5', name: 'Amoureux', emoji: '❤️', colorHex: '#FF69B4'},
  {id: '6', name: 'Festif', emoji: '🎉', colorHex: '#9400D3'},
  {id: '7', name: 'Fatigué', emoji: '😴', colorHex: '#708090'},
  {id: '8', name: 'Concentré', emoji: '🤔', colorHex: '#32CD32'},
];

export const MoodMatchScreen = ({navigation}: any) => {
  const {setMood} = useMoodStore();

  const handleSelectMood = (mood: any) => {
    setMood(mood);
    alert(`Generating playlist for ${mood.name} mood...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What's your mood?</Text>

      <FlatList
        data={MOODS}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.moodCard,
              {
                backgroundColor: item.colorHex + '20',
                borderColor: item.colorHex,
              },
            ]}
            onPress={() => handleSelectMood(item)}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.moodName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginVertical: 30,
  },
  list: {paddingHorizontal: 10},
  moodCard: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  emoji: {fontSize: 40, marginBottom: 10},
  moodName: {color: colors.text, fontSize: 16, fontWeight: '600'},
});
