import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, useTheme } from 'react-native-paper';

const Header = ({title}) => {
    const theme = useTheme()
  return (
    <View style={styles.header}>
          <MaterialIcons name="drag-handle" size={24} color="black" />
          <Text style={theme.fonts.labelLarge}>{title}</Text>
          <Avatar.Image size={24} source={require('../../assets/mtj.jpg')} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:20,
        marginBottom:10,
        flexDirection: "row",
        gap: 10,
    }
})