import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors} from '../../theme/colors';
import {useAuthStore} from '../../store/useAuthStore';
import {addTrack, setupPlayer} from '../../services/player/setup';

export const HomeScreen = ({navigation}: any) => {
  const {user} = useAuthStore();

  useEffect(() => {
    // Initialiser le lecteur en arrière-plan quand on arrive sur l'accueil
    setupPlayer();
  }, []);

  const playDemoSong = async () => {
    try {
      const demoTrack = {
        id: '1',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Audio MP3 libre de droits pour tester
        title: 'Mood Tracker Melody',
        artist: 'PlayMood Originals',
        artwork: 'https://via.placeholder.com/150/6C5CE7/FFFFFF?text=Cover',
      };

      await addTrack(demoTrack);
    } catch (e) {
      Alert.alert('Error', 'Could not play the track');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Evening,</Text>
          <Text style={styles.username}>
            {user?.user_metadata?.username || 'Guest'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.moodMatchCard}
          onPress={() => navigation.navigate('Mood')}>
          <Text style={styles.moodTitle}>How are you feeling?</Text>
          <Text style={styles.moodSubtitle}>
            Find the perfect soundtrack for your mood.
          </Text>
        </TouchableOpacity>

        {/* --- BOUTON DE TEST POUR JOUER LA MUSIQUE --- */}
        <TouchableOpacity style={styles.playDemoButton} onPress={playDemoSong}>
          <Text style={styles.playDemoText}>▶️ Play a Demo Song</Text>
        </TouchableOpacity>
        {/* ------------------------------------------ */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4].map(i => (
              <View key={i} style={styles.albumCard}>
                <View style={styles.albumCover} />
                <Text style={styles.albumName}>Album {i}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  header: {padding: 20, paddingTop: 40},
  greeting: {color: colors.textSecondary, fontSize: 16},
  username: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  moodMatchCard: {
    margin: 20,
    padding: 20,
    backgroundColor: colors.primary,
    borderRadius: 15,
    elevation: 5,
  },
  moodTitle: {color: colors.text, fontSize: 20, fontWeight: 'bold'},
  moodSubtitle: {color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 5},

  playDemoButton: {
    marginHorizontal: 20,
    backgroundColor: colors.surface,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  playDemoText: {color: colors.success, fontWeight: 'bold', fontSize: 16},

  section: {marginTop: 20},
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
  },
  albumCard: {marginLeft: 20, width: 120},
  albumCover: {
    width: 120,
    height: 120,
    backgroundColor: colors.surface,
    borderRadius: 10,
  },
  albumName: {
    color: colors.text,
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});
