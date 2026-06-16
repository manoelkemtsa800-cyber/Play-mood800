import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {colors} from '../../theme/colors';

export const LibraryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Library</Text>
      <Text style={styles.subtitle}>Playlists, Albums, Podcasts</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background, padding: 20},
  title: {fontSize: 28, fontWeight: 'bold', color: colors.text, marginTop: 20},
  subtitle: {fontSize: 16, color: colors.textSecondary, marginTop: 5},
});
