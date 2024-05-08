import { Dimensions, StyleSheet, View,TextInput} from 'react-native'
import React, { useState } from 'react'
import { Divider, Snackbar, Text, useTheme } from 'react-native-paper'
import { validateRegistration } from '../../functions/validation'


const {width,height} = Dimensions.get('window')
const SCROLL_WIDTH = width-80

const StepOne = ({email,setEmail,password,setPassword,r_password,setRPassword,setError}) => {
    const theme = useTheme()
    
  return (
    <View style={styles.step}>
                <Text style={theme.fonts.titleSmall}>
                  Step 1: Account Information
                </Text>
                <View style={styles.input_block}>
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    // mode="flat"
                    // right={<TextInput.Icon icon="phone" />}
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={[styles.input, theme.fonts.bodySmall]}
                    onEndEditing={() =>
                    {
                      setError(validateRegistration(email, password, r_password))
                    }
                    }
                  />
                  <Divider />
                  <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    // keyboardType={null}
                    secureTextEntry
                    style={[styles.input, theme.fonts.bodySmall]}
                    returnKeyType="go"
                    onEndEditing={() =>
                    {
                      setError(validateRegistration(email, password, r_password))
                    }
                    }
                  />
                  <Divider />
                  <TextInput
                    placeholder="Repeat Password"
                    value={r_password}
                    onChangeText={(text) => setRPassword(text)}
                    // keyboardType={null}
                    secureTextEntry
                    style={[styles.input, theme.fonts.bodySmall]}
                    returnKeyType="go"
                    onEndEditing={() =>
                    {
                      setError(validateRegistration(email, password, r_password))
                    }
                    }
                  />
                </View>
                
              </View>
  )
}

export default StepOne

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