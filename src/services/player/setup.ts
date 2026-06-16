import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

let isSetup = false;

export const setupPlayer = async () => {
  if (isSetup) {
    return;
  }

  try {
    await TrackPlayer.setupPlayer();

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
    });

    isSetup = true;
  } catch (error) {
    console.error("Erreur lors de l'initialisation du TrackPlayer:", error);
  }
};

export const addTrack = async (track: any) => {
  await setupPlayer(); // On s'assure qu'il est initialisé
  await TrackPlayer.add(track);
  await TrackPlayer.play();
};
