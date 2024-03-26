import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import TrackPlayer, {
  PlaybackState,
  usePlaybackState,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
  const playBackState = usePlaybackState();

  // next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  // previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async ({state}: PlaybackState) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== undefined) {
      if (state === 'paused' || state === 'ready') {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={() => togglePlayback(playBackState as PlaybackState)}>
        <Icon
          style={styles.icon}
          name={playBackState.state === 'playing' ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControlCenter;
