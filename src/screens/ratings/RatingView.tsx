import React, { useEffect, useState } from "react"
import { View } from "react-native"
import RBSheet from "react-native-raw-bottom-sheet"
import { Portal } from "@gorhom/portal"
import _ from "lodash"

import ComponentStyle from "../../components/ComponentStyle"
import { actualDeviceSize } from "../../utils/dynamicHeightWidth"
import { CommonStyles } from "../../utils/theme/commonStyle"
import { RatingOpenStore } from "./RatingOpenStore"
import { RatingSelectionView } from "./RatingSelectionView"
import { RatingSubmit } from "./RatingSubmit"

export type RatingViewType = 'select_rating' | 'comment' | 'open_store'

interface IRatingView {
    bottomSheetRef: any
    viewType: RatingViewType
    onChangeView: (viewType: RatingViewType) => void
    userCancelRating: () => void
    onPopupClose: () => void
    giveRating: (payload: any) => void
    setCallClosePopup: (value: boolean) => void
}

export const RatingView = (props: IRatingView) => {
    const [userRating, setUserRating] = useState<number>(0)

    useEffect(() => {

    }, [props.viewType])


    return <Portal>
        <RBSheet
            height={actualDeviceSize.height * (props.viewType === 'comment' ? 0.45 : 0.37)}
            openDuration={250}
            closeonDrag={props.viewType !== "open_store"}
            ref={props.bottomSheetRef}
            closeOnDragDown={props.viewType !== "open_store"}
            closeOnPressMask={props.viewType !== "open_store"}
            onClose={() => {
                if (props.viewType !== "comment") {
                    if ((props.viewType === "select_rating" && userRating > 0)) {
                        // props.setCallClosePopup(false)
                        return
                    }
                }
                if (props.viewType === "open_store") {
                    // props.giveRating({ app_store_rated: false })
                } else {
                    props.onPopupClose()
                }

            }}
            customStyles={{
                container: CommonStyles.bottomSheetContainer,
                wrapper: CommonStyles.bottomSheetWrapper,
                draggableIcon: CommonStyles.bottomSheetIcon
            }}  >
            <View style={ComponentStyle.bottom_shett_view}>
                {props.viewType === "select_rating" &&
                    <RatingSelectionView
                        onCancel={props.userCancelRating}
                        onSelectRating={(val: number) => {
                            setUserRating(val)
                            setTimeout(() => {
                                if (val === 5) {
                                    props.onChangeView("open_store")
                                } else {
                                    props.onChangeView('comment')
                                }
                            }, 500);
                        }}
                    />}
                {props.viewType === "comment" &&
                    <RatingSubmit
                        giveRating={props.giveRating}
                        userRating={userRating} />}
                {props.viewType === "open_store" &&
                    <RatingOpenStore onCancel={props.userCancelRating}
                        onGiveRating={props.giveRating}
                    />}

            </View>
        </RBSheet>
    </Portal>
}