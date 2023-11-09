import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const {height,width} = Dimensions.get('screen')
const step_one = () => {
  return (
    <View>
      <Text>step_one</Text>
    </View>
  )
}

export default step_one

const styles = StyleSheet.create({
    step:{
            // width:width,
    // paddingHorizontal:20,
    gap: 16,
    // backgroundColor:'red',
    width: width - 80,
    }
})