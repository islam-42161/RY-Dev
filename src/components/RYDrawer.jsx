import { Pressable, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Button, Divider, Drawer, List, MD3Colors, Menu, TouchableRipple, useTheme } from "react-native-paper";
import { MaterialIcons,SimpleLineIcons,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../AuthProvider";
import { Image } from "expo-image";


const STATUSBAR_HEIGHT = StatusBar.currentHeight


const RYDrawer = (props) => {
  const [active, setActive] = React.useState("home");

  const num_notifications = useContext(AuthContext).notifications.length;
  const profile = useContext(AuthContext).user
  const {setProfileModalVisible} = useContext(AuthContext)
  const showModal = ()=>{
    setProfileModalVisible(true)

  }
  const { navigation } = props;
  const theme = useTheme()
  useEffect(() => {
    navigation.jumpTo(active)
  }, [active])
  return (
    <View style={[styles.container,{backgroundColor:theme.colors.background}]}>
    <View style={styles.profile}>
    <Image
    source={require('../../assets/icon.png')}
    style={StyleSheet.absoluteFill}
    blurRadius={50}
    />
<View style={styles.profile_top}>

<Pressable onPress={showModal} style={{padding:2,height:50,width:50,borderRadius:25,backgroundColor:'white'}}>
<Avatar.Image size={46} source={{uri:profile.photoURL}}/>
</Pressable>
            <Ionicons name="ios-moon" size={25} color="white" />
</View>

        <Pressable onPress={showModal} style={{gap:5,paddingHorizontal:20,paddingVertical:15}}>
            <Text style={[theme.fonts.titleSmall,{color:'white'}]} adjustsFontSizeToFit>{profile.displayName}</Text>
            <Text style={[theme.fonts.labelSmall,{opacity:0.5,color:'white'}]} adjustsFontSizeToFit>{profile.email}</Text>
        </Pressable>
    </View>
    {/* <DrawerContentScrollView {...props}> */}
    <ScrollView {...props} style={{borderBottomColor:'gray',borderBottomWidth:StyleSheet.hairlineWidth}} contentContainerStyle={{paddingVertical:20}}>
      {/* <Drawer.Section title='RN-Paper Section'> */}
      <Drawer.Item
        {...props}
        label="Home"
        icon={"home-outline"}
        active={active === "home"}
        onPress={() => setActive("home")}
      />
      <Drawer.Item
        {...props}
        label="Activities"
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="post-outline" size={size} color={color} />
        )}
        active={active === "activities"}
        onPress={() => setActive("activities")}
      />
      <Drawer.Item
        {...props}
        label="Task Board"
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="calendar-plus" size={size} color={color} />
        )}
        active={active === "taskboard"}
        onPress={() => setActive("taskboard")}
      />
      <Divider style={{marginVertical:5}}/>
        <Drawer.Item
        {...props}
        label="My Courses"
        icon={({ size, color }) => (
          <SimpleLineIcons name="graduation" size={size} color={color} />
        )}
        active={active === "mycourses"}
        onPress={() => setActive("mycourses")}
      />
        <Drawer.Item
        {...props}
        label="All Courses"
        icon={({ size, color }) => (
          <SimpleLineIcons name="graduation" size={size} color={color} />
        )}
        active={active === "allcourses"}
        onPress={() => setActive("allcourses")}
      />
      <Divider style={{marginVertical:5}}/>

      <Drawer.Item
        {...props}
        label="My Groups"
        icon={({ size, color }) => (
          <MaterialIcons name="group-add" size={size} color={color} />
        )}
        active={active === "mygroups"}
        onPress={() => setActive("mygroups")}
      />
      <Drawer.Item
        {...props}
        label="All Groups"
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="account-group-outline" size={size} color={color} />
        )}
        active={active === "allgroups"}
        onPress={() => setActive("allgroups")}
      />
      <Divider style={{marginVertical:5}}/>

      <Drawer.Item
        {...props}
        label="RY Feeds"
        icon={({ size, color }) => (
          <MaterialIcons name="dynamic-feed" size={size} color={color} />
        )}
        active={active === "ryfeeds"}
        onPress={() => setActive("ryfeeds")}
      />
      <Drawer.Item
        {...props}
        label="Coach"
        icon={({ size, color }) => (
          <Ionicons name="person-circle-outline" size={size} color={color} />
        )}
        active={active === "coach"}
        onPress={() => setActive("coach")}
      />
      <Drawer.Item
        {...props}
        label={
          num_notifications > 0
            ? `Notifications • ${num_notifications}`
            : "Notifications"
        }
        icon={"bell-outline"}
        active={active === "notifications"}
        onPress={() => setActive("notifications")}
      />

      {/* <Drawer.CollapsedItem
     focusedIcon="inbox"
     onPress={() => setActive('inbox')}
     active={active === 'inbox'}
     unfocusedIcon="inbox-outline"
     label="Inbox"
   /> */}
      {/* </Drawer.Section> */}
      {/* <DrawerItemList {...props} /> */}
      </ScrollView>
    {/* </DrawerContentScrollView> */}
  
          
    </View>
  );
};

export default RYDrawer;

const styles = StyleSheet.create({
  container:{
    flex:1,
    // gap:20
  },
  profile:{
    height:"25%",
    width:"100%",
    justifyContent:'space-between'
  },
  profile_top:{
    paddingTop:STATUSBAR_HEIGHT*1.25,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    paddingBottom:STATUSBAR_HEIGHT*0.25
  }
});
