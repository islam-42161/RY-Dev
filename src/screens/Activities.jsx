import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainContainer from './MainContainer'

const Activities = ({navigation,route}) => {
  return (
    <MainContainer navigation={navigation} route={route} title={"Activities"}>
    </MainContainer>
  )
}

export default Activities

const styles = StyleSheet.create({})