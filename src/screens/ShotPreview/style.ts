/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-color-literals */
import { Dimensions, StyleSheet } from 'react-native'


const DURATION_WINDOW_DURATION = 4;
const FRAME_WIDTH = 80;
const FRAME_PER_SEC = 60;
const TILE_HEIGHT = 80;
const TILE_WIDTH = FRAME_WIDTH / 2;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const DURATION_WINDOW_BORDER_WIDTH = 4;
const DURATION_WINDOW_WIDTH =
    DURATION_WINDOW_DURATION * FRAME_PER_SEC * TILE_WIDTH;
const POPLINE_POSITION = '50%';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 16,
    },
    buttonText: {
        color: '#fff',
    },
    videoContainer: {
        width: SCREEN_WIDTH,
        height: 0.6 * SCREEN_HEIGHT,
        backgroundColor: 'rgba(255,255,255,0.1)',
        zIndex: 0,
    },
    video: {
        height: '100%',
        width: '100%',
    },
    durationWindowAndFramesLineContainer: {
        top: -DURATION_WINDOW_BORDER_WIDTH,
        width: SCREEN_WIDTH,
        height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
        justifyContent: 'center',
        zIndex: 10,
    },
    durationWindow: {
        width: DURATION_WINDOW_WIDTH,
        borderColor: 'yellow',
        borderWidth: DURATION_WINDOW_BORDER_WIDTH,
        borderRadius: 4,
        height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
        alignSelf: 'center',
    },
    durationLabelContainer: {
        backgroundColor: 'yellow',
        alignSelf: 'center',
        top: -26,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    durationLabel: {
        color: 'rgba(0,0,0,0.6)',
        fontWeight: '700',
    },
    popLineContainer: {
        position: 'absolute',
        alignSelf: POPLINE_POSITION === '50%' && 'center',
        zIndex: 25,
    },
    popLine: {
        width: 3,
        height: TILE_HEIGHT,
        backgroundColor: 'yellow',
    },
    durationWindowLeftBorder: {
        position: 'absolute',
        width: DURATION_WINDOW_BORDER_WIDTH,
        alignSelf: 'center',
        height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
        left: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: 'yellow',
        zIndex: 25,
    },
    durationWindowRightBorder: {
        position: 'absolute',
        width: DURATION_WINDOW_BORDER_WIDTH,
        right: SCREEN_WIDTH - SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
        height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: 'yellow',
        zIndex: 25,
    },
    framesLine: {
        width: SCREEN_WIDTH,
        position: 'absolute',
    },
    loadingFrame: {
        width: TILE_WIDTH,
        height: TILE_HEIGHT,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
    },
    prependFrame: {
        width: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
    },
    appendFrame: {
        width: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
    },
})