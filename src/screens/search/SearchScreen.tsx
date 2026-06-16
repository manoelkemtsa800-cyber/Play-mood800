import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import {colors} from '../../theme/colors';

export const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Artists, songs, or podcasts"
        placeholderTextColor={colors.textSecondary}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background, padding: 20},
  title: {fontSize: 28, fontWeight: 'bold', color: colors.text, marginTop: 20},
  searchInput: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
