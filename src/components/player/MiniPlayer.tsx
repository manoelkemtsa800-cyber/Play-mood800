import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useActiveTrack,
} from 'react-native-track-player';
import {colors} from '../../theme/colors';

export const MiniPlayer = () => {
  const playbackState = usePlaybackState();
  const activeTrack = useActiveTrack();

  const isPlaying = playbackState.state === State.Playing;

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  if (!activeTrack) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.coverPlaceholder} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {activeTrack.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {activeTrack.artist}
        </Text>
      </View>

      <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
        <Text style={styles.playText}>{isPlaying ? '⏸' : '▶️'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50, // Juste au-dessus de la TabBar
    left: 10,
    right: 10,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  coverPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  info: {flex: 1, marginLeft: 10},
  title: {color: colors.text, fontWeight: 'bold', fontSize: 14},
  artist: {color: colors.textSecondary, fontSize: 12},
  playButton: {padding: 10},
  playText: {fontSize: 20},
});
