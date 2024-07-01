/* eslint-disable no-console */

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker'
import { runOnJS } from 'react-native-reanimated';
import {
  Camera, 
  CameraDevice, 
  useCameraDevice, useFrameProcessor
} from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';
import { useIsFocused } from '@react-navigation/native';
import { data } from '@tensorflow/tfjs';
import base64js from 'base64-js';
import _ from 'lodash';
import ndarray from "ndarray";
import * as ort from 'onnxruntime-react-native';

import Button from '../../components/Button';
import { debugLog } from '../../functions/commonFunctions';

const { Buffer } = require('buffer/')

let session: ort.InferenceSession;


// const socket = io('https://d71a-2601-646-9e02-ed00-fd04-9308-834b-642.ngrok-free.app');

const LiveStream = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isStartRecord, setStartRecord] = useState(false)
  const device: CameraDevice | undefined = useCameraDevice('back')
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [base64ImageView, setBase64ImageView] = useState()
  const [rgbFrame, setRGBFrame] = useState()

  // check if camera page is active
  const isFocussed = useIsFocused();
  const isActive = isFocussed;

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (data) => {
      console.log('Received message:', data);
      // Handle the received data as needed
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    console.log("sendInit message")
    socket.emit('identify_divot_socket', { msg: 'RGB(13, 3, 9)' });
  };

  useEffect(() => {
    sendMessage()
    Camera.requestCameraPermission().then(status => { debugLog(status) });
    Camera.requestMicrophonePermission();
    Camera.getMicrophonePermissionStatus()
      .then((status) =>
        setHasMicrophonePermission(status === "authorized"));
  }, []);

  const openImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1
      // maxHeight: 960,
      // maxWidth: 544,
    });
    loadOnnxModel(result.assets[0].uri)
  };

  useEffect(() => {
    // openImagePicker()
  }, []);
  const loadOnnxModel = async (imagePath) => {
    try {
      console.log(imagePath)
      Image.getSize(imagePath, (width, height) => {
        console.log("Image Size " + width + "height " + height)
      })

      // RNFS.readDir(RNFS.MainBundlePath).then((result) => {
      //   console.log('GOT RESULT', result);
      // })
      const MODEL_NAME = "/best.onnx";
      const assetPathInBundle = RNFS.MainBundlePath + MODEL_NAME
      console.log(assetPathInBundle)
      const localDirectoryPath = RNFS.DocumentDirectoryPath;
      const assetPathInLocalDirectory = localDirectoryPath + '/' + MODEL_NAME;
      console.log('assetPathInLocalDirectory ', assetPathInLocalDirectory)

      const assetExists = await RNFS.exists(assetPathInLocalDirectory);
      console.log("assetExists ", assetExists)

      if (!assetExists) {
        // If the asset doesn't exist, copy it from the app bundle to the local directory
        try {
          await RNFS.copyFile(assetPathInBundle, assetPathInLocalDirectory);
          console.log('Asset copied successfully');
        } catch (error) {
          console.error('Error copying asset:', error);
        }
      } else {
        console.log('Asset Available');
      }
      // const modelBytes = await RNFS.readFile(modelPath, 'base64');
      // const uint8Array = base64.toByteArray(modelBytes);
      session = await ort.InferenceSession.create(assetPathInLocalDirectory);
      runInference(imagePath)
      setIsModelLoaded(true);
    } catch (error) {
      console.error('Error loading ONNX model:', error);
    }
  };

  const ImageToRGB = async base64 => {
    // Remove the data URL prefix
    const base64WithoutPrefix = base64.replace(/^data:image\/\w+;base64,/, '');

    // Decode base64 using buffer and base-64
    const binaryString = Buffer.from(base64WithoutPrefix, 'base64').toString('binary');

    // Create a Uint8Array from the binary string
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Assuming the image is in RGBA format, convert to RGB
    const numPixels = bytes.length / 4;
    const rgbArray = new Uint8Array(numPixels * 3);

    for (let i = 0; i < numPixels; i++) {
      rgbArray[i * 3] = bytes[i * 4];
      rgbArray[i * 3 + 1] = bytes[i * 4 + 1];
      rgbArray[i * 3 + 2] = bytes[i * 4 + 2];
    }

    return rgbArray;
  };

  function preprocess(data, width, height) {
    const dataFromImage = ndarray(new Float32Array(data), [width, height, 4]);
    const dataProcessed = ndarray(new Float32Array(width * height * 3), [1, 3, height, width]);

    // Normalize 0-255 to (-1)-1
    ndarray.ops.divseq(dataFromImage, 128.0);
    ndarray.ops.subseq(dataFromImage, 1.0);

    // Realign imageData from [224*224*4] to the correct dimension [1*3*224*224].
    ndarray.ops.assign(dataProcessed.pick(0, 0, null, null), dataFromImage.pick(null, null, 2));
    ndarray.ops.assign(dataProcessed.pick(0, 1, null, null), dataFromImage.pick(null, null, 1));
    ndarray.ops.assign(dataProcessed.pick(0, 2, null, null), dataFromImage.pick(null, null, 0));

    return dataProcessed.data;
  }

  const runInference = async (imagePath) => {
    return
    // const image = RNFS.MainBundlePath + '/photo2.png';
    // console.log(image)
    // const a = await fetch(image)
    // console.log(a)

    console.log("imagePath ", imagePath)
    const tensor = await ort.Tensor.fromImage(imagePath, {
      resizedHeight: 960,
      resizedWidth: 544,
      dataType: 'float32',
      tensorFormat: 'RGB'
    }).catch(e => console.log("error. ", e));
    console.log("tensor ", tensor)
    return
    const base64String = await RNFS.readFile(imagePath, 'base64')
    // const rgbImage = await ImageToRGB(base64String)
    const uint8Array = base64js.toByteArray(base64String);
    const imageData = Array.from(uint8Array);
    // console.log("byteArray", imageData);

    // const base64Image = `data:image/png;base64,${base64String} `
    // Image.getSize(base64Image, (width, height) => {
    //   console.log("A- Image width: ", width);
    //   console.log("B-Image height: ", height);
    // }, (error) => {
    //   console.error("Error getting image size: ", error);
    // });
    performInference(imageData)


    // If your model expects RGB image data, you might need to preprocess the image
    // Ensure that the preprocessing steps match the requirements of your model
    // const imageData = Array.from(uint8Array);
    // const imageTensor = new Float32Array(imageData);
    // const inputTensor = new ort.Tensor('float32', imageTensor, [1, imageTensor.length]);

    // const feeds = { 'images': inputTensor };
    // console.log("Input names expected by the model:", session.inputNames);
    // console.log("Input names provided in feeds:", Object.keys(feeds));

    // const outputMap = await session.run(feeds);
    // console.log(outputMap);
  };

  function getArrayShape(inputArray) {
    if (!Array.isArray(inputArray)) {
      return 'Input is not an array';
    }
    const numRows = inputArray.length;
    const numCols = numRows > 0 ? inputArray[0].length : 0;
    // Check if all rows have the same number of columns
    for (let i = 1; i < numRows; i++) {
      if (inputArray[i].length !== numCols) {
        return 'Array is not uniform';
      }
    }
    return [numRows, numCols];
  }

  const performInference = async (inputData) => {
    // Scale input pixel values to the range [0, 1]
    // console.log("session ", inputData)
    const inputName = session.inputNames[0];
    const outputName = session.outputNames[0];
    console.log("inputName ", inputName)
    console.log("outputName ", outputName)

    const scaledInputData = inputData.map(value => value / 255.0);
    console.log(getArrayShape(scaledInputData))


    // const inputTensor = new ort.Tensor('float32', scaledInputData, [1, 3, 960, 544]);

    return
    const outputs = await session.run({ [inputName]: inputTensor }, [outputName]);

    // Process outputs
    const predictions = outputs[0].data;

    // Example manipulation - extracting class with highest score
    const scoresClass0 = predictions[0];
    const scoresClass1 = predictions[1];

    const maxScoreIndexClass0 = scoresClass0.indexOf(Math.max(...scoresClass0));
    const maxScoreIndexClass1 = scoresClass1.indexOf(Math.max(...scoresClass1));

    const prediction = {
      class: maxScoreIndexClass0 > maxScoreIndexClass1 ? 'class_0' : 'class_1',
      scores: predictions // You can include the raw scores if needed
    };

    // Add your additional post-processing logic here

    return prediction;
  };



  // const onFaceDetected = Worklets.createRunInJsFn((face: Uint8Array) => {
  //   // navigation.push("FiltersPage", { face: face })
  //   console.log(face)
  // })

  React.useEffect(() => {
    console.log(rgbFrame);
  }, [rgbFrame]);

 
  const onFaceDetected = Worklets.createRunInJsFn((face: any) => {
    console.log("d. ", data)
  })
  
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    console.log(frame.pixelFormat)
    runOnJS(onFaceDetected)(frame.pixelFormat)
    // onFaceDetected(frame.pixelFormat)
  }, [onFaceDetected])

  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   if (frame.pixelFormat === 'rgb') {
  //     const data = frame.toArrayBuffer()
  //     // runOnJS(setRGBFrame)(data);
  //     // socket.emit('identify_divot_socket', { msg: `${data}` });
  //     // onFaceDetected(data)
  //     runAtTargetFps(2, () => {
  //       'worklet'
  //       // console.log("I'm running synchronously at 2 FPS!"+ data)
  //       socket.emit('identify_divot_socket', { msg: `1` });
  //     })
  //     // console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`)
  //   }
  // }, []);

  // const frameProcessor = useFrameProcessor((frame: CameraImage) => {
  //   'worklet'
  //   if (frame.pixelFormat === 'rgb') {
  //     const data = frame.toArrayBuffer()
  //     onFaceDetected(data)
  //     console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`)
  //   }
  // }, [onFaceDetected])

  const onError = (e: any) => {
    console.log("track@ error", e)
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: `data:image/png;base64, ${base64ImageView}` }} />
      {(device && isStartRecord) && <Camera
        style={styles.camera}
        isActive={isActive}
        onError={onError}
        video
        pixelFormat={'rgb'}
        audio={hasMicrophonePermission}
        orientation={"portrait"}
        frameProcessor={frameProcessor}
        device={device} />}
      <Button heading={isStartRecord ? 'Stop Recording' : 'Start Recording'} onPress={() => setStartRecord(!isStartRecord)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    flex: 1,
    width: '100%'
  }
});

export default LiveStream;
