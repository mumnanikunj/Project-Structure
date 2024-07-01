import React, { useState } from 'react'
import { StyleSheet, TextStyle } from 'react-native'
import { RulerPicker } from 'react-native-ruler-picker'

import fonts from '../../assets/fonts'
import { GdText } from '../../components/text/gd-text'
import { dW } from '../../utils/dynamicHeightWidth'
import { Colors } from '../../utils/theme'

interface IScrollRuler {
  minValue?: number,
  maxValue?: number,
  startFeet?: number,
  startInches?: number,
  endFeet?: number,
  endInches?: number,
  placeHolder?: string,
  type: 'distance' | 'deviation' | 'height' | 'age' | 'score'
  setDistance?: () => void,
  setDeviation?: () => void,
  onValueSelect: (value: any) => void,
  index: number
  valueUnitTextStyle?: TextStyle
}

const ScrollRuler = (props: IScrollRuler) => {
  const [minvalue, setminValue] = useState(props.minValue)
  const [maxvalue, setmaxValue] = useState(props.maxValue)
  const [selectedValue, setSelectedValue] = useState<string>('0')
  const [previousValue, setPreviousValue] = useState<string>('0')

  const OnvalueChangeEnd = (data: any) => {
    props.onValueSelect(data)
  }

  return (
    <>
      {
        props.type === 'distance' || props.type === 'deviation' ?
          null :
          // <Text style={styles.titleText}>{props.type.charAt(0).toUpperCase() + props.type.slice(1).toLowerCase()}</Text>
          <GdText style={styles.titleText} tx={props.type} />
      }
      <RulerPicker
        min={minvalue}
        initialValue={minvalue}
        indicatorHeight={34}
        max={maxvalue}
        placeHolder={props.placeHolder}
        step={1}
        startFeet={3}
        startInches={0}
        endFeet={7}
        endInches={11}
        fractionDigits={0}
        selectedValue={selectedValue}
        previousValue={previousValue}
        valueUnitTextStyle={props.valueUnitTextStyle}
        type={props.type}
        initialValue={props.type === 'age' ? 25 : 0}
        onValueChange={setSelectedValue}
        onValueChangeEnd={(number) => OnvalueChangeEnd(number)}
        longStepHeight={32}
        shortStepHeight={20}
        gapBetweenSteps={props.type === "distance" ? 5 : 10}
        stepWidth={1}
        unit={props.type === "distance" ? "yds" : props.type === 'age' ? 'yrs' : ""}
        indicatorColor={Colors.white}
        unitTextStyle={{
          color: props.type === 'age' ? Colors.white : Colors.green_hover,
          ...styles.unitTextStyle
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        valueTextStyle={{
          color: props.type === 'height' || props.type === 'age' || props.type === 'score' ? Colors.white : Colors.green_hover,
          ...styles.valueTextStyle
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        indicatorColor={props.type === 'height' || props.type === 'age' ? Colors.white : Colors.green_hover}
        shortStepColor={Colors.grey_green}
        longStepColor={Colors.grey_green}
      />
    </>
  )
}

export default ScrollRuler

const styles = StyleSheet.create({
  valueRoot: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  txtValue: {
    fontFamily: fonts.light,
    fontSize: dW(32),
    color: Colors.green
  },
  unitTextStyle: {
    fontFamily: fonts.light,
    fontSize: dW(32),
    fontWeight: '300',
  },
  valueTextStyle: {
    fontFamily: fonts.light,
    fontSize: dW(32),
    fontWeight: '300',
    marginTop: dW(5)
  },
  titleText: {
    color: Colors.green_light,
    marginBottom: dW(8),
  }
})
