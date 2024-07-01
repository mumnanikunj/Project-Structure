import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import fonts from '../assets/fonts';
import images from '../assets/images';
import Strings from '../constants/Strings';
import { checkInternetConnection, debugLog } from '../functions/commonFunctions';
import TargetDistanceSheet from '../screens/SelectStartIron/target_distance_sheet';
import APICall from '../utils/api/api';
import EndPoints from '../utils/api/endpoints';
import { dH, dW } from '../utils/dynamicHeightWidth';
import { Colors } from '../utils/theme';
import AppLoader from './appLoader/appLoader';
import AppNoInternetSheet from './AppNoInternetSheet';

interface BottomDistanceProps {
  editable: boolean,
  setDistance: any
}

const BottomDistance = ({ editable, setDistance }: BottomDistanceProps) => {

  // const [yds, setYds] = useState<number>(editable ? 50 : 105);
  // const [finalyds, setFinalYds] = useState<number>(editable ? 50 : 105);
  // const [ydsString, setYdsString] = useState<string>('50');
  const [tagetDistance, setTargetDistance] = useState<string>("100")
  const [rangeList, setRangeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const refTargetDistanceSheet = useRef()
  const refTargetDistance = useRef()
  // const dropRef = useRef<SelectDropdown>();
  // Expands the bottom sheet when our button is pressed
  // const onAddButtonPress = () => {
  //   bottomSheetRef?.current?.open();
  // };

  // const decreaseYds = () => {
  //   if(yds > 50) {
  //     setYdsString((yds-1).toLocaleString());
  //     setYds(yds-1);
  //   }
  // };


  // const increaseYds = () => {
  //   if(yds < 250) {
  //     setYdsString((yds+1).toLocaleString());
  //     setYds(yds+1);
  //   }
  // };

  const callRangeListAPI = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      setLoading(true);
      APICall('get', undefined, EndPoints.rangeList, false).then
        ((res: any) => {
          debugLog(res);
          setLoading(false);
          if (res?.statusCode === 200) {
            const all_data = res?.data?.data;
            const activeClubs: any[] = [];
            all_data.forEach((element: any) => {
              if (element.range) {
                activeClubs.push(element.range);
              }
            });
            setRangeList(activeClubs);
          }
        });
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    callRangeListAPI();
    setDistance('100');
  }, []);

  return (
    <>
      {/* <TouchableWithoutFeedback onPress={() => onAddButtonPress()} disabled={!editable}>
      <View style={styles.drop_view}>

      <Image  style={styles.hole_image} source={images.home.iron_icon}></Image>

      <Text style={styles.drop_text}>{finalyds + " yds"}</Text>

      {editable ? 
      <Image  style={styles.drop_arrow} tintColor={Colors.green} source={images.tabs.dropdown}></Image> : null }
      </View>
          </TouchableWithoutFeedback>
          <Portal>
            <RBSheet
              height={350}
              openDuration={250}

              closeonDrag
              ref={bottomSheetRef}

              customStyles={{
                container: CommonStyles.bottomSheetContainer,
                wrapper: CommonStyles.bottomSheetWrapper,
                draggableIcon: CommonStyles.bottomSheetIcon
                }}>

                  <View style={[ComponentStyle.bottom_shett_view, styles.margin]}>


      <Text style={[ComponentStyle.text_h1, ComponentStyle.marginTopButton1]}>{Strings.enter_distance}</Text>

      <View style={ComponentStyle.view_add_minus}>

      <TouchableOpacity onPress={() => {decreaseYds();}} >
        <Image style={ComponentStyle.image_add} source={images.home.minus}></Image>
      </TouchableOpacity>

      <View style={[ComponentStyle.container, styles.raw ]}>

      <TextInput style={ComponentStyle.text_h0} 
        onChangeText={(text) => {
          setYdsString(text);
          if(text !== undefined && text !== null && text !== '') {
            setYds(parseInt(text,10));
          } else {
            setYds(0);
          }
        }}
        maxLength={3}
        keyboardType={"numeric"}
        value={ydsString}
        />
    <View style={ComponentStyle.view_line}></View>
      <Text style={[ComponentStyle.text_h0,  {color : Colors.green_light}]}>{"yds"}</Text>

      </View>

      <TouchableOpacity onPress={() => {increaseYds();}} >
      <Image style={ComponentStyle.image_add} source={images.home.plus}></Image>
      </TouchableOpacity>

    </View>
      <Button 
              exStyle={ComponentStyle.marginTopButton1}
              heading={Strings.save} onPress={() => {
                if(yds >= 50 && yds <= 250) {
                  setFinalYds(yds);
                  setDistance(yds);
                  bottomSheetRef?.current?.close();
                } else {
                  showToast(Strings.error_yds);
                }
              } } isDisabled={false}></Button>

      <TouchableOpacity style={ComponentStyle.marginTopButton1} hitSlop={10} onPress={() =>   bottomSheetRef?.current?.close()}>

      <Text style={ComponentStyle.text_h2}>{Strings.cancel}</Text>

    </TouchableOpacity>

            </View>
        
        </RBSheet>
      </Portal> */}

      <TouchableWithoutFeedback onPress={() => {
        try {
          refTargetDistance.current.setDefaultValue(tagetDistance)
        } catch (error) {
          
        }
        refTargetDistanceSheet.current.open()
      }}>
        <View style={styles.drop_view}>
          <Image style={styles.hole_image} source={images.home.iron_icon}></Image>
          {editable ?
            <View style={styles.selectedValueRoot}>
              <Text style={styles.txtSelectedValue}>{`${tagetDistance} ${Strings.yds}`}</Text>
              <Image source={images.arrow_down} />
            </View>
            // <View style={{flexDirection: 'row'}}>
            // <View pointerEvents='none'>
            //   <SelectDropdown 
            //   ref={dropRef}
            //   disabled
            //   defaultValue={range}
            //           data={rangeList}
            //           buttonStyle={styles.SelectDropDown}
            //           buttonTextStyle={styles.drop_text}
            //           defaultButtonText={"0"}
            //           renderDropdownIcon={() => {
            //             return <Image source={images.tabs.dropdown} tintColor={Colors.green}  style={styles.drop_arrow} />
            //           }}
            //           onSelect={(item) => {
            //             setRange(item);
            //             setDistance(item);
            //           }}
            //           dropdownStyle={styles.dropDownStyle}
            //           rowTextStyle={styles.DropDownbuttonText}
            //           rowStyle={styles.rowStyle}
            //           />
            // </View>

            : <Text style={styles.drop_text}>{"100"}</Text>}
        </View>
      </TouchableWithoutFeedback>
      {loading && <AppLoader />}
      <AppNoInternetSheet visible={visible} onClick={callRangeListAPI} setVisible={setVisible} />
      <TargetDistanceSheet alertRef={refTargetDistanceSheet}
        ref={refTargetDistance}
        currnetValue={tagetDistance}
        onAddTarget={(value) => {
          refTargetDistanceSheet.current.close()
          setTargetDistance(value)
          setDistance(value)
        }}
      />
    </>
  );
};

export default BottomDistance;

const styles = StyleSheet.create({
  margin: { paddingHorizontal: 20 },
  drop_view: {
    marginTop: dH(10),
    paddingVertical: dH(5),
    backgroundColor: Colors.lightblack,
    borderRadius: 30,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: dW(10)
  },
  selectedValueRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSelectedValue: {
    textAlign: 'center',
    fontSize: dW(32),
    fontFamily: fonts.light,
    color: Colors.green,
    marginHorizontal: dW(12)
  },
  hole_image: {
    width: dW(35),
    height: dW(35)
  },
  drop_arrow: {
    width: dW(30),
    height: dW(30)
  },
  drop_text: {
    flexGrow: 1,
    color: Colors.green,
    fontSize: 26,
    marginHorizontal: dW(10),
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontWeight: '300'
  },
  raw: {
    flexDirection: 'row'
  },
  SelectDropDown: {
    flex: 0.9,
    backgroundColor: Colors.transparent
  },
  DropDownbuttonText: {
    fontSize: dH(15),
    color: Colors.white,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontWeight: '400',
    flexGrow: 1
  },
  dropDownStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.lightblack,
    marginTop: Platform.OS === "android" ? -18 : 0,
    width: '60%',
    borderRadius: 16,
    marginLeft: -42
  },
  rowStyle: {
    borderBottomColor: Colors.transparent,
    borderBottomWidth: 0
  }
})
