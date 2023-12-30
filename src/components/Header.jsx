import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, Badge, useTheme } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import { AuthContext } from '../../AuthProvider';


const STATUSBAR_HEIGHT = StatusBar.currentHeight
const Header = ({title,navigation,titleBadge}) => {
    const theme = useTheme()
    const profilePic = useContext(AuthContext).user.photoURL
  return (
    <View style={[styles.header,{backgroundColor:theme.colors.surfaceVariant}]}>
          <MaterialIcons name="drag-handle" size={24} color="black" onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}/>
          <Text style={theme.fonts.labelLarge}>{titleBadge > 0 ? `${title} • ${titleBadge}` : title}</Text>
          <Avatar.Image size={24} source={{uri:profilePic}} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:STATUSBAR_HEIGHT*1.25,
        paddingHorizontal:20,
        marginBottom:STATUSBAR_HEIGHT*0.25,
        paddingBottom:STATUSBAR_HEIGHT*0.25,
        flexDirection: "row",
        gap: 10,
        // width:"100%",
    }
})