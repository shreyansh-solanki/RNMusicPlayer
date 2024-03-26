import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';

const SongSlider = () => {
  const {position, duration} = useProgress();

  const seekTo = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };

  return (
    <View>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
        style={styles.sliderContainer}
        onValueChange={value => seekTo(value)}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text>
        <Text style={styles.time}>
          {new Date((duration - position) * 1000)
            .toISOString()
            .substring(15, 19)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,

    flexDirection: 'row',
  },
  timeContainer: {
    width: 340,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    color: '#fff',
  },
});

export default SongSlider;
