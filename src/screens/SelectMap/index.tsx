import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

import images from '../../assets/images'
import { SvgImage } from '../../assets/svg/SvgPath'
import { AppLoader } from '../../components'
import AppNoInternetSheet from '../../components/AppNoInternetSheet'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { GdText } from '../../components/text/gd-text'
import ScreenNavigation from '../../constants/ScreenNavigation'
import Strings from '../../constants/Strings'
import { checkInternetConnection, debugLog, showAlert } from '../../functions/commonFunctions'
import { setSessionData, setUnityPostMessage } from '../../store/actions/SessionActions'
import APICall from '../../utils/api/api'
import EndPoints from '../../utils/api/endpoints'
import { actualDeviceSize } from '../../utils/dynamicHeightWidth'
import { MockBattleRoyal, MockFree, MockSelectMapData } from './MockSelectMap'
import { styles } from './styles'

const IMAGES_PIN = [images.selectMap.map_classic,
images.selectMap.map_island,
images.selectMap.map_mountain,
images.selectMap.map_water,
images.selectMap.map_desert
]

const BATTLE_IMAGES = [images.selectMap.battle_royale_sky,
images.selectMap.battle_royale_city_sky
]
const FREE_IMAGES = [images.selectMap.free_ground]

const SelectMap = ({ navigation, route }: any) => {
    const refMapList = useRef<FlatList>(null)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState<boolean>(false)
    const [visibleRetry, setVisibleRetry] = useState<boolean>(false)
    const [visibleIndex, setVisibleIndex] = useState<number>(0)
    const [LIST_DATA, setListData] = useState<any>(null)

    const IS_BATTLE_ROYAL = route.params.item.game_mode    
    const IMAGES = IS_BATTLE_ROYAL === 'battleRoyale' ? BATTLE_IMAGES : IS_BATTLE_ROYAL === 'pinFinder' ? IMAGES_PIN : FREE_IMAGES

    useEffect(() => {
        setListData(IS_BATTLE_ROYAL === 'battleRoyale' ? MockBattleRoyal :IS_BATTLE_ROYAL === 'pinFinder' ? MockSelectMapData : MockFree)
    }, [IS_BATTLE_ROYAL])

    const onNextPrev = (isNext: boolean) => {
        try {
            refMapList.current?.scrollToIndex({
                index: isNext ? visibleIndex + 1 : visibleIndex - 1,
                animated: true
            })
        } catch (error) {

        }
    }

    const callAPIToCreateSession = async () => {
        dispatch(setUnityPostMessage(null))
        const isConnected = await checkInternetConnection();
        if (isConnected) {
            setLoading(true);
            const body = JSON.stringify({
                game_type: route.params.item.title,
                sub_game_type: route.params.item.desc
            });

            APICall('post', body, EndPoints.session, false).then
                ((res: any) => {
                    debugLog(res);
                    setLoading(false);
                    if (res?.data?.data !== undefined && res?.data?.data.length > 0 && res?.statusCode === 200) {
                        const sessionId = res?.data?.data[0].user_session_id;
                        const mydata: any = {
                            ...LIST_DATA[visibleIndex],
                            id: sessionId,
                            game_type: route.params.item.title,
                            game_mode: route.params.item.game_mode,
                            sub_game_type: route.params.item.desc,
                            created_at: new Date().toISOString()
                        };
                        console.log("Req-- ", mydata)
                        dispatch(setSessionData(mydata));
                        navigation.navigate(ScreenNavigation.screens.Unity, { item: mydata });
                    } else {
                        if (res?.data?.message) {
                            showAlert(res?.data?.message);
                        }
                    }
                });
        } else {
            setVisibleRetry(true);
        }
    };


    const onViewableItemsChanged = ({ viewableItems }: any) => {
        console.log("viewableItems ", viewableItems)
        setVisibleIndex(_.size(viewableItems) === 0 ? 0 : viewableItems[0].index)
    };

    const viewabilityConfigCallbackPairs = useRef([
        { onViewableItemsChanged }
    ]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listRoot}>
                <FlatList
                    ref={refMapList}
                    data={LIST_DATA || []}
                    keyExtractor={(item) => _.toString(item.id)}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    bouncesZoom={false}
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfigCallbackPairs={
                        viewabilityConfigCallbackPairs.current
                    }
                    viewabilityConfig={{
                        // itemVisiblePercentThreshold: 50
                    }}
                    renderItem={({ item, index }) => (
                        <View style={{ width: actualDeviceSize.width }}>
                            <FastImage source={IMAGES[index]}
                                style={styles.mapImageFull} />

                            <FastImage source={images.selectMap.mapOverLay}
                                style={styles.mapImageFull} />
                        </View>
                    )}
                />
            </View>

            <Header isLogo={false}
                heading={"select_map"}
                isBack onClick={() => navigation.goBack()} />
            {LIST_DATA?.[visibleIndex].yds &&
                <View style={styles.ydsRoot}>
                    {_.size(LIST_DATA) > 0 && <View style={styles.ydsroot1}>
                        <Text style={styles.txtYds}>{LIST_DATA[visibleIndex].yds}
                        <GdText tx={"yds"} />
                        </Text>
                    </View>}
                </View>}
            <View
                pointerEvents={'box-none'}
                style={styles.iconRootRow}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => onNextPrev(false)}>
                    <SvgImage.prevIcon />
                </TouchableOpacity>
                {_.size(LIST_DATA) > 0 && <View style={styles.mapNameRoot}>
                    <Text style={styles.txtMapId}>{`${LIST_DATA[visibleIndex].title} ${visibleIndex + 1}`}</Text>                    
                    <GdText style={styles.txtMapName} tx={LIST_DATA[visibleIndex].subTitle} />
                </View>}
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => onNextPrev(true)}>
                    <SvgImage.nextIcon />
                </TouchableOpacity>

            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.play_view} onPress={() => {
                    navigation.navigate(ScreenNavigation.screens.GuideScreen)
                }}>
                    <Image style={styles.how_play} source={images.home.vector}></Image>
                    {/* <Text style={styles.KindGameText}>{'How to play?'}</Text> */}
                    <GdText style={styles.KindGameText} tx={'how_to_play'} />
                </TouchableOpacity>

                <Button
                    exStyle={styles.btnContinue}
                    heading={'continue'}
                    onPress={async () => {
                        // navigation.navigate(ScreenNavigation.screens.StartIron)
                        callAPIToCreateSession()
                    }} isDisabled={false} />
            </View>

            {loading && <AppLoader />}

            <AppNoInternetSheet visible={visibleRetry} onClick={async () => {
                callAPIToCreateSession()
            }} setVisible={setVisibleRetry} />

        </SafeAreaView>
    )
}

export default SelectMap
