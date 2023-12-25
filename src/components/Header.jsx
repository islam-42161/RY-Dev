import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, Badge, useTheme } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';


const STATUSBAR_HEIGHT = StatusBar.currentHeight
const Header = ({title,navigation,titleBadge}) => {
    const theme = useTheme()
  return (
    <View style={styles.header}>
          <MaterialIcons name="drag-handle" size={24} color="black" onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}/>
          <Text style={theme.fonts.labelLarge}>{title}{titleBadge>0 && ` • ${titleBadge}`}</Text>
          <Avatar.Image size={24} source={require('../../assets/mtj.jpg')} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:STATUSBAR_HEIGHT*1.5,
        paddingHorizontal:20,
        marginBottom:10,
        flexDirection: "row",
        gap: 10,
        // width:"100%",
    }
})