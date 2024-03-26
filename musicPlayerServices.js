import TrackPlayer, {Event, RepeatMode} from 'react-native-track-player';

import {playListData} from './src/constants';

export async function setupPlayer() {
  // await TrackPlayer.setupPlayer();
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrackIndex();
    isSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTrack() {
  await TrackPlayer.add(playListData);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, () => {
    TrackPlayer.seekTo();
  });
}
