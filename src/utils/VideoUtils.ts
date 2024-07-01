import RNFS from 'react-native-fs';
import { FFmpegKit } from "ffmpeg-kit-react-native";
import moment from "moment";

import { debugLog } from '../functions/commonFunctions';

const downloadVideoThumb = async (video_url: string, onLoading, onDownload): Promise<void> => {
    const destinationPath = `${RNFS.DocumentDirectoryPath}/${getFolderNameFromUrl(video_url)}.mp4`
    console.log('destinationPath',destinationPath)
    if (await RNFS.exists(destinationPath)) {
        onDownload(destinationPath)
        return 
    }
    onLoading(true)
    try {
        debugLog('downloadstart==>', new Date())
        const result = await RNFS.downloadFile({
            fromUrl: video_url,
            toFile: `${destinationPath}`
        }).promise

        if (result.statusCode === 200) {
            debugLog('downloadEndAndsuccess==>', new Date())
            await getImageVideoFrame(destinationPath, getFolderNameFromUrl(video_url))
            onLoading(false)
           return onDownload(destinationPath)
        } 
        onLoading(false)
        return ""
    } catch (error) {
        debugLog('Error downloading video:', error)
        onLoading(false)
        return ""
    }
}


const getVideoDuration = async (inputPath: string): Promise<number> => {
    const getDurationResult = await FFmpegKit.execute(`-i ${inputPath}`);
    const durationOutput = await getDurationResult.getOutput();
    const durationMatch = /Duration: (\d{2}:\d{2}:\d{2}.\d{2})/.exec(durationOutput);
    if (durationMatch && durationMatch.length >= 2) {
        return moment.duration(durationMatch[1]).asSeconds();
    }
    return 0;
};

const cropVideo = async (inputPath: string, cropDuration: number) => {
    const outputPath = `${RNFS.DocumentDirectoryPath}/${moment(new Date()).format('YYYY-MM-DD_HH-mm-ss')}.mp4`;
    const totalDuration = await getVideoDuration(inputPath);

    if (totalDuration === 0) {
        throw new Error("Failed to get video duration.")
    }
    debugLog("totalDuration ", totalDuration)
    try {
        const startTime = totalDuration - cropDuration;
        debugLog("startTime.. ", startTime)
        const command = `-ss ${startTime} -i ${inputPath} -t ${cropDuration} -c copy ${outputPath}`;
        await FFmpegKit.execute(command);
        return outputPath
    } catch (error) {
        throw new Error("Error in video process")
    }
}

const reduceVideoSize = async (inputFilePath) => {
    const outputFilePath = `${RNFS.DocumentDirectoryPath}/${moment(new Date()).format('YYYY-MM-DD_HH-mm-ss')}.mp4`;
    try {
        const command = `-i ${inputFilePath} -c:v libx264 -crf 23 -c:a aac -b:a 192k ${outputFilePath}`;
        const result = await FFmpegKit.execute(command.split(' '));

        if (result === 0) {
            return outputFilePath
        } else {
            console.error('Error compressing video:', result);
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
};

function getFolderNameFromUrl(url) {
    return url.split('/').pop().match(/[\w\d\’\'-]+/gi).join("", "");;
}

const getImageVideoFrame = async (videoPath: string, folderId: string) => {
    const targetWidth = 100;
    const targetHeight = 100;
    const outputDir = `${RNFS.DocumentDirectoryPath}/${folderId}`
    if (!await RNFS.exists(outputDir)) {
        await RNFS.mkdir(outputDir)
    }
    try {
        const command = `-i ${videoPath} -r 60 -vf scale=${targetWidth}:${targetHeight} ${outputDir}/frame_%03d.png`;
        await FFmpegKit.execute(command)
    } catch (error) {
        console.error('Error extracting frames:', error);
        return [];
    }
};

const getFrameUriArray = async (folderPath: string): Promise<string[]> => {
    const frameArray: string[] = []
    // console.log("folderPath ", frameArray)
    try {
        // Check if the folder exists
        const folderExists = await RNFS.exists(folderPath);
        if (folderExists) {
            // Read the directory
            const files = await RNFS.readDir(folderPath);
            // Display the file names
            files.forEach(file => {
                frameArray.push(`file://${folderPath}/${file.name}`)
            });
        }
        return frameArray
    } catch (error) {
        return []
    }
}

export {
    cropVideo,
    downloadVideoThumb,
    getFolderNameFromUrl,
    getFrameUriArray,
    getImageVideoFrame,
    getVideoDuration,
    reduceVideoSize}