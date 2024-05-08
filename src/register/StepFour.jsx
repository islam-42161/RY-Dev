import { Dimensions, StyleSheet, View, TextInput} from 'react-native'
import React from 'react'
import { Checkbox, Divider, Text, useTheme } from 'react-native-paper';


const {width,height} = Dimensions.get('window')
const SCROLL_WIDTH = width-80


const StepFour = ({adl1,setadl1,adl2,setadl2,terms,setTerms}) => {
  const theme = useTheme()
  return (
    <View style={styles.step}>
                <Text style={theme.fonts.titleSmall}>Step 4: Address</Text>
                <View style={styles.input_block}>
                  <TextInput
                    placeholder="Address Line 1"
                    value={adl1}
                    onChangeText={(text) => setadl1(text)}
                    // mode="flat"
                    // right={<TextInput.Icon icon="phone" />}
                    // keyboardType="default"
                    returnKeyType="next"
                    style={[styles.input, theme.fonts.bodySmall]}
                  />
                  <Divider />
                  <TextInput
                    placeholder="Address Line 2 (Optional)"
                    value={adl2}
                    onChangeText={(text) => setadl2(text)}
                    // keyboardType={null}

                    style={[styles.input, theme.fonts.bodySmall]}
                    returnKeyType="go"
                  />
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Checkbox
                    status={terms ? "checked" : "unchecked"}
                    onPress={() => {
                      setTerms(!terms);
                    }}
                  />
                  <Text style={theme.fonts.labelMedium}>
                    Agree to{" "}
                    <Text style={{ color: theme.colors.primary }}>
                      Terms and Conditions
                    </Text>
                  </Text>
                </View>
              </View>
  )
}

export default StepFour

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
    genderPicker: {
      backgroundColor: "white",
      margin: 16,
      // padding: 16,
      overflow: "hidden",
      borderRadius: 16,
    },
  });