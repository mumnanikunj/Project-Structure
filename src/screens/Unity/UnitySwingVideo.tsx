/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import FastImage from 'react-native-fast-image'
import {BlurView} from '@react-native-community/blur'
import _ from 'lodash'

import fonts from '../../assets/fonts'
import {dW} from '../../utils/dynamicHeightWidth'
import {Colors} from '../../utils/theme'
import {downloadVideoThumb} from '../../utils/VideoUtils'

interface IUnitySwingVideo {
  data: any
  onSelectVideo: (data: any) => void
  setLoading: (value: boolean) => void
  refSheet: any
  swingId: string
}

export const UnitySwingVideo = (props: IUnitySwingVideo) => {

  const onPressVideo = async (item: any) => {
    downloadVideoThumb(item.video_url, (data) => {
      props.setLoading(data)
    }, (path) => {
      console.log("path ", path)
      props.onSelectVideo(item)
      props.refSheet?.current?.close()
    })

    // console.log('destinationPath', item)
    // if (await RNFS.exists(destinationPath)) {
    //   props.onSelectVideo(item)
    //   props.refSheet?.current?.close()
    //   return
    // }
    // props.setLoading(true)
    // const fileUrl: string = item.video_url
    // try {
    //   console.log('downloadstart', new Date())
    //   const result = await RNFS.downloadFile({
    //     fromUrl: fileUrl,
    //     toFile: `${destinationPath}`
    //   }).promise

    //   if (result.statusCode === 200) {
    //     console.log('downloadEndAndsuccess', new Date())
    //     await getImageVideoFrame(destinationPath, getFolderNameFromUrl(item.video_url))
    //     props.onSelectVideo(item)
    //     props.setLoading(false)
    //   } else {
    //     props.setLoading(false)
    //     console.error('Failed to download video:', result.statusCode)
    //   }
    // } catch (error) {
    //   console.error('Error downloading video:', error)
    // }
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={props.data.swings}
        numColumns={3}
        renderItem={({item, index}) => {
          const deviationResult = _.get(item, 'flight_attributes.total_deviation', 0)
          return (
            <TouchableOpacity
              style={[styles.itemRoot, {marginHorizontal: index % 3 === 1 ? 10 : 0}]}
              onPress={() => onPressVideo(item)}
            >
              <FastImage
                style={styles.image}
                source={{
                  uri: item?.preview_url,
                  priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.dataRoot}>
                {/* <SvgImage.videoFavorite width={dW(24)} height={dW(24)} style={styles.iconStar} /> */}
                <View style={styles.flex1} />

                <View style={styles.imageRoot}>
                  <BlurView blurType={'dark'} blurAmount={10} style={styles.blurView} />
                  <Text style={styles.txtValue}>
                    {Math.round(_.get(item, 'flight_attributes.total_distance', 0))} {'yd'}
                  </Text>
                  <Text style={styles.txtValue}>
                    {_.round(Math.abs(deviationResult))}
                    {deviationResult < 0 ? 'L' : 'R'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    paddingHorizontal: dW(16)
  },
  flex1: {
    flex: 1
  },
  itemRoot: {
    flex: 1,
    marginBottom: dW(10),
    borderRadius: dW(8),
    overflow: 'hidden',
    backgroundColor: Colors.fonApp
  },
  image: {
    // ...StyleSheet.absoluteFill,
    height: dW(164),
    backgroundColor: Colors.green_transparent
  },
  dataRoot: {
    ...StyleSheet.absoluteFill
  },
  iconStar: {
    alignSelf: 'flex-end',
    margin: dW(7)
  },
  txtValue: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.white
  },
  imageRoot: {
    height: dW(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dW(10)
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
