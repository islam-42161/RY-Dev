import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainContainer from './MainContainer'

const TaskBoard = ({navigation,route}) => {
  return (
    <MainContainer title={"Task Board"} navigation={navigation} route={route}>

    </MainContainer>
  )
}

export default TaskBoard

const styles = StyleSheet.create({})