import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity,View } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ source, onEnd }) => {
  const videoRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  if(!source) return <View />;

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={source}
        resizeMode={"cover"}
        style={[styles.video, isFullScreen && styles.fullScreen]}
        repeat
        onEnd={onEnd}
      />
      {isFullScreen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleFullScreen}>
          {/* Add any overlay components here */}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  video: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default VideoPlayer;
