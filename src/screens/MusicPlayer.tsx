import {View, StyleSheet, Dimensions, Image, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playListData} from '../constants';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>();
  const ref = useRef<FlatList<Track> | null>(null);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        const playingTrack = await TrackPlayer.getTrack(event.index as number);
        setCurrentTrack(playingTrack);
        break;
    }
  });

  const scrollToIndex = (index: number) => {
    ref?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  };

  setTimeout(() => scrollToIndex(currentTrack ? currentTrack?.id - 1 : 0), 100);

  const renderArtWork = (track: Track | null) => {
    return (
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image
              key={track.id}
              style={styles.albumArtImg}
              source={{uri: track?.artwork?.toString()}}
            />
          )}
        </View>
      </View>
    );
  };

  useEffect(() => {
    const setActiveTrack = async () => {
      const activeTrack = await TrackPlayer.getActiveTrack();
      setCurrentTrack(activeTrack);
    };
    setActiveTrack();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        horizontal
        data={playListData}
        renderItem={({item}) => renderArtWork(item)}
        keyExtractor={song => song.id.toString()}
      />
      <SongInfo track={currentTrack} />
      <SongSlider />
      <ControlCenter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImg: {
    height: '100%',
    borderRadius: 4,
  },
});

export default MusicPlayer;
