import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Divider,
  Modal,
  Portal,
  RadioButton,
  Searchbar,
  useTheme,
  Text
} from "react-native-paper";

const { width, height } = Dimensions.get("window");
const SCROLL_WIDTH = width - 80;
const ITEM_HEIGHT = 30;

const data = require("../../../assets/country-city.json");
const countries = Object.keys(data);

const StepThree = ({ country, setCountryData, city, setCityData }) => {
  const theme = useTheme();

  const [modalCountryVisible, setModalCountryVisible] = useState(false);
  const [modalCityVisible, setModalCityVisible] = useState(false);

  const showCountryModal = () => setModalCountryVisible(true);
  const hideCountryModal = () => setModalCountryVisible(false);

  const showCityModal = () => setModalCityVisible(true);
  const hideCityModal = () => setModalCityVisible(false);

  const [countryQuery, setCountryQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");

  // const [data,setData] = useState(null);
  // const setDataset = data => setData(data)

  const onChangeCountryQuery = (query) => setCountryQuery(query);
  const onChangeCityQuery = (query) => setCityQuery(query);




  // const debouncedOnChangeCountryQuery = debounce(onChangeCountryQuery, 50);
  // const debouncedOnChangeCityQuery = debounce(onChangeCountryQuery, 50);




  const MemoizedItemCountry = React.memo(({ item, index }) => (
    <TouchableOpacity onPress={() => setCountryData(item)}>
    <Text style={[theme.fonts.bodyMedium,{
    height: ITEM_HEIGHT,
      backgroundColor: item === country ? theme.colors.surfaceVariant:null,
      textAlignVertical:'center',
      padding:item === country ? 5:null,
      borderRadius:5,
      fontWeight: item === country ? 'bold':null,
    }]}>
      {item}
    </Text>
    </TouchableOpacity>
  ));
  const MemoizedItemCity = React.memo(({ item, index }) => (
    <TouchableOpacity onPress={() => setCityData(item)}>
    <Text style={[theme.fonts.bodyMedium,{
    height: ITEM_HEIGHT,
      backgroundColor: item === city ? theme.colors.surfaceVariant:null,
      textAlignVertical:'center',
      padding:item === city ? 5:null,
      borderRadius:5,
      fontWeight: item === city ? 'bold':null,
    }]}>
      {item}
    </Text>
    </TouchableOpacity>
  ));

  // Use MemoizedItem in FlatList renderItem
  const renderItemCountry = ({ item, index }) => (
    <MemoizedItemCountry item={item} index={index} />
  );
  const renderItemCity = ({ item, index }) => (
    <MemoizedItemCity item={item} index={index} />
  );
  const keyExtractor = (item, index) => index;

  return (
    <View style={styles.step}>
      <Text style={theme.fonts.titleSmall}>Step 3: Location</Text>
      <View style={styles.input_block}>
        <Pressable
          onPress={showCountryModal}
          style={[styles.row, styles.input]}
        >
          <Text style={theme.fonts.bodySmall}>Country</Text>
          <Text style={theme.fonts.bodySmall}>{country}</Text>
          <Portal>
            <Modal
              visible={modalCountryVisible}
              onDismiss={hideCountryModal}
              contentContainerStyle={styles.modalStyle}
            >
              <Searchbar
                placeholder="Search your country"
                onChangeText={onChangeCountryQuery}
                value={countryQuery}
                style={{ margin: 16,backgroundColor:theme.colors.surfaceVariant }}
              />
              {/* <Divider /> */}
              {data ? (
                <View
                  style={{
                    gap: 8,
                    height: "100%",
                    paddingHorizontal: 16,
                    paddingBottom: 110,
                  }}
                >
                  <FlatList
                    // inverted
                    data={countries}
                    renderItem={renderItemCountry}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={15}
                    initialNumToRender={20}
                    getItemLayout={(data, index) => ({
                      length: ITEM_HEIGHT,
                      offset: ITEM_HEIGHT * index,
                      index,
                    })}
                    keyExtractor={keyExtractor}
                  />
                </View>
              ) : (
                <ActivityIndicator animating={true} />
              )}
            </Modal>
          </Portal>
        </Pressable>
        <Divider />
        <Pressable onPress={showCityModal} style={[styles.row, styles.input]}>
          <Text style={theme.fonts.bodySmall}>State/City</Text>
          <Text style={theme.fonts.bodySmall}>{city}</Text>
          <Portal>
            <Modal
              visible={modalCityVisible}
              onDismiss={hideCityModal}
              contentContainerStyle={styles.modalStyle}
            >
              <Searchbar
                placeholder="Search your city/state"
                onChangeText={onChangeCityQuery}
                value={cityQuery}
                style={{ margin: 16,backgroundColor:theme.colors.surfaceVariant }}
              />
              {/* <Divider /> */}
              {data ? (
                <View
                  style={{
                    gap: 8,
                    height: "100%",
                    paddingHorizontal: 16,
                    paddingBottom: 110,
                  }}
                >
                  <FlatList
                    // inverted
                    data={country? data[country]:null}
                    renderItem={renderItemCity}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={15}
                    initialNumToRender={20}
                    getItemLayout={(data, index) => ({
                      length: ITEM_HEIGHT,
                      offset: ITEM_HEIGHT * index,
                      index,
                    })}
                    keyExtractor={keyExtractor}
                  />
                </View>
              ) : (
                <ActivityIndicator animating={true} />
              )}
            </Modal>
          </Portal>
        </Pressable>
      </View>
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    // height: height*0.4,
    flex: 0.4,
  },
  bottom: {
    padding: 40,
    flex: 0.6,
    gap: 16,
    // backgroundColor:'red'
  },
  loginextrasection: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input_block: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
    backgroundColor: "white",
  },
  input: {
    padding: 16,
  },
  step: {
    // width:width,
    // paddingHorizontal:20,
    gap: 16,
    // backgroundColor:'red',
    width: SCROLL_WIDTH,
  },
  progressBar: {
    // flexDirection:'row',
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    // borderWidth:1,
    // borderRadius:5,
    // paddingHorizontal:15,
    // paddingVertical:5
  },
  modalStyle: {
    backgroundColor: "white",
    margin: 16,
    // padding: 16,
    overflow: "hidden",
    borderRadius: 32,
    justifyContent: "flex-start",
    maxHeight: "50%",
  },
});
