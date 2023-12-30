import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Button, Drawer, List, MD3Colors, useTheme } from "react-native-paper";
import { MaterialIcons,SimpleLineIcons,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../AuthProvider";
import { Image } from "expo-image";


const STATUSBAR_HEIGHT = StatusBar.currentHeight


const RYDrawer = (props) => {
  const [active, setActive] = React.useState("home");
  const num_notifications = useContext(AuthContext).notifications.length;
  const { navigation } = props;
  const theme = useTheme()
  const profile = useContext(AuthContext).user
  useEffect(() => {
    navigation.jumpTo(active);
  }, [active]);
  return (
    <View style={styles.container}>
    <View style={styles.profile}>
<Image
  source={require('../../assets/icon.png')}
  style={StyleSheet.absoluteFill}
/>
<View style={{position:'absolute',elevation:1,bottom:-14,alignSelf:'center',gap:10,borderRadius:20,backgroundColor:'white',alignItems:'center',flexDirection:'row',padding:2,width:"80%"}}>
<Text  style={[theme.fonts.titleSmall,{marginLeft:10,flex:1}]} numberOfLines={1} adjustsFontSizeToFit>{profile.displayName}</Text>
<Avatar.Image size={24} source={{uri:profile.photoURL}}/>
</View>
    </View>
    {/* <DrawerContentScrollView {...props}> */}
    <ScrollView {...props} style={{borderBottomColor:'gray',borderBottomWidth:StyleSheet.hairlineWidth}} contentContainerStyle={{paddingBottom:20,paddingTop:6}}>
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

    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:20,paddingVertical:15,paddingHorizontal:10,marginHorizontal:20,marginBottom:20,backgroundColor:MD3Colors.error90,borderRadius:30}}>
    <MaterialCommunityIcons name="logout" size={theme.fonts.titleLarge.fontSize} color={MD3Colors.error50}/>
    <Text style={[theme.fonts.labelLarge,{color:MD3Colors.error50}]}>LOG OUT</Text>
    </TouchableOpacity>
    </View>
  );
};

export default RYDrawer;

const styles = StyleSheet.create({
  container:{
    flex:1,
    gap:20
  },
  profile:{
    height:"30%",
    width:"100%"
  }
});
