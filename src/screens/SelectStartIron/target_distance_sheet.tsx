import React, { FC, useRef } from 'react'
import { Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Portal } from '@gorhom/portal'
import _ from 'lodash'

import images from '../../assets/images'
import Button from '../../components/Button'
import ComponentStyle from '../../components/ComponentStyle'
import Strings from '../../constants/Strings'
import { dH } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'
import { styles } from './styles_distance_sheet'
import { CommonStyles } from '../../utils/theme/commonStyle'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

const MAX_NUMBER_LENGTH = 4;
const INCREMENT_VALUE = 5;

const TargetDistanceSheet: FC<any> = React.forwardRef(({
    alertRef, onAddTarget, currnetValue
}, ref) => {
    const [number, setNumber] = React.useState(currnetValue);
    const inputRef = useRef()
    const { t }: { t: TFunction } = useTranslation()

    const setDefaultValue = (data: number) => setNumber(data)

    React.useImperativeHandle(ref, () => ({ setDefaultValue }))

    const ButtonAddMinus = ({ isAdd }: { isAdd: boolean }) => {
        const currentNumber = _.toNumber(number)
        function onPressAddMinus(isAdd: boolean): void {
            if (isAdd) {
                (_.size(number) <= MAX_NUMBER_LENGTH && currentNumber < 9999) &&
                    setNumber(_.toString(currentNumber + INCREMENT_VALUE))
            } else {
                currentNumber > 0 && setNumber(_.toString(currentNumber - INCREMENT_VALUE))
            }
        }

        return <TouchableOpacity activeOpacity={0.4} onPress={() => onPressAddMinus(isAdd)}>
            <Image source={isAdd ? images.add_img : images.minus_img} />
        </TouchableOpacity>
    }

    return (
        <Portal>
            <RBSheet
                height={dH(350)}
                openDuration={250}
                onClose={() => setNumber(0)}
                closeonDrag
                closeOnDragDown
                closeOnPressMask
                ref={alertRef}
                customStyles={{
                    container: CommonStyles.bottomSheetContainer,
                    wrapper: CommonStyles.bottomSheetWrapper,
                    draggableIcon: CommonStyles.bottomSheetIcon
                }}
            >
                <View style={[ComponentStyle.bottom_shett_view, styles.root]}>
                    <Image source={images.sheet_close} style={styles.imgClose} />
                    <Text style={styles.txtTitle}>{Strings.enterTargetDistance}</Text>
                    {/** Amount View */}
                    <View style={styles.rootInput}>
                        <ButtonAddMinus isAdd={false} />
                        <View style={styles.viewAddYds}>
                            <TextInput
                                ref={inputRef}
                                style={styles.input}
                                placeholderTextColor={Colors.green_light}
                                maxLength={MAX_NUMBER_LENGTH}
                                returnKeyType={"done"}
                                cursorColor={Colors.white}
                                onChangeText={(item) => setNumber(item)}
                                value={_.toString(number)}
                                placeholder={t("Enter")}
                                keyboardType={"numeric"}
                            />
                            <TouchableWithoutFeedback
                                onPress={() => inputRef?.current.focus()}>
                                <Text style={styles.txtYds}>{Strings.yds}</Text>
                            </TouchableWithoutFeedback>
                        </View>

                        <ButtonAddMinus isAdd />
                    </View>
                    <Button
                        exStyle={{ marginTop: dH(16) }}
                        heading={Strings.save}
                        onPress={async () => {
                            onAddTarget(number)
                        }} isDisabled={false} />
                    <Text
                        onPress={() => alertRef.current.close()}
                        style={styles.txtCancel}>{Strings.cancel}</Text>
                </View>
            </RBSheet>
        </Portal>
    )
})
// const TargetDistanceSheet = ({ alertRef, onAddTarget, currnetValue }: any) => {

// }


export default TargetDistanceSheet
