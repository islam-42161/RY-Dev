import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Avatar, Divider, MD3Colors, Modal, Portal, useTheme } from 'react-native-paper'
import { AuthContext } from '../../AuthProvider'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RYUserProfileModal = () => {
  const {profileModalVisible,setProfileModalVisible,user} = useContext(AuthContext);
  const hideModal = ()=> setProfileModalVisible(false);
const theme = useTheme()
  return (
      <Portal>
        <Modal visible={profileModalVisible} onDismiss={hideModal} contentContainerStyle={[styles.containerStyle,{backgroundColor:theme.colors.background}]}>
        <Pressable style={styles.profileRow}>
        <View>
          <Text style={theme.fonts.bodyLarge}>{user.displayName}</Text>
          <Text style={[theme.fonts.bodySmall,{opacity:0.5}]}>{user.email}</Text>
        </View>
<Avatar.Image size={46} source={{uri:user.photoURL}}/>


        </Pressable>
          <View style={styles.extra1}>
<TouchableOpacity style={{flexDirection:'row',gap:20,padding:10,alignItems:'center'}}>
<MaterialCommunityIcons name="account-circle-outline" size={theme.fonts.bodyLarge.fontSize*1.5} color="black" />
<Text style={theme.fonts.bodyLarge}>My Profile</Text>
</TouchableOpacity>
<View style={{height:StyleSheet.hairlineWidth,backgroundColor:'black'}}/>
<TouchableOpacity style={{flexDirection:'row',gap:20,padding:10,alignItems:'center'}}>
<MaterialCommunityIcons name="target" size={theme.fonts.bodyLarge.fontSize*1.5} color="black" />
<Text style={theme.fonts.bodyLarge}>My Goals</Text>
</TouchableOpacity>
          </View>
          <TouchableOpacity style={{flexDirection:'row',gap:20,paddingHorizontal:20,paddingVertical:10,alignItems:'center'}}>
<MaterialCommunityIcons name="form-textbox-password" size={theme.fonts.bodyLarge.fontSize*1.5} color="black" />
<Text style={theme.fonts.bodyLarge}>Change Password</Text>
</TouchableOpacity>
<TouchableOpacity style={{flexDirection:'row',gap:20,paddingHorizontal:20,paddingVertical:10,alignItems:'center',marginBottom:20}}>
<MaterialCommunityIcons name="logout" size={theme.fonts.bodyLarge.fontSize*1.5} color={MD3Colors.error60} />
<Text style={[theme.fonts.bodyLarge,{color:MD3Colors.error60}]}>Logout</Text>
</TouchableOpacity>
        </Modal>
      </Portal>
  )
}

export default RYUserProfileModal

const styles = StyleSheet.create({
  containerStyle:{
    margin:20,
    borderRadius:30,
    overflow:'hidden'
  },
  profileRow:{
    gap:10,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    padding:15,
  },
  extra1:{
    marginHorizontal:15,
    marginBottom:15,
    backgroundColor:'white',
    borderRadius:15,
    overflow:'hidden',
    // elevation:1,
    borderWidth:StyleSheet.hairlineWidth
  }
})