import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { IconButton, useTheme,Colors, MD3Colors } from "react-native-paper";
import { AuthContext } from "../../AuthProvider";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import {
  Swipeable,openRight
} from "react-native-gesture-handler";
import MainContainer from "./MainContainer";

const AnimatedNotificationItem = Animated.createAnimatedComponent(TouchableOpacity);

const Notifications = ({ navigation, route }) => {
  const { notifications, setNotifications } = useContext(AuthContext);
  const theme = useTheme();


  function deleteNotification(index) {
    setNotifications((prevNotifications) => {
      return prevNotifications.filter((item, i) => i !== index);
    });
  }
  const SwipeableRow = ({ item, index }) => {
    const swiperef = useAnimatedRef()
    const swipeLeft = () =>{
      swiperef.current.openRight()
    }
  const renderRightActions = () => (
    <IconButton icon={'delete'} mode="contained" onPress={()=>deleteNotification(index)} iconColor={MD3Colors.error60} containerColor={MD3Colors.error90} style={{alignSelf:'center',marginEnd:20}}/>
  );

    return (
      <Swipeable ref={swiperef} renderRightActions={renderRightActions}>
        <AnimatedNotificationItem
        onLongPress={()=>{
          swipeLeft()
        }}
          style={[
            styles.notification_item,
            { 
              backgroundColor: theme.colors.background
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Text
              style={[theme.fonts.titleMedium, { flex: 1 }]}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            {/* <Ionicons
              name="close-outline"
              onPress={() => deleteNotification(index)}
              size={theme.fonts.titleMedium.fontSize}
              style={{ margin: 2.5 }}
            /> */}
            {/* <IconButton icon={'close'} mode="contained" size={theme.fonts.bodyMedium.fontSize}/> */}
          </View>
          {/* <View style={{height:StyleSheet.hairlineWidth,backgroundColor:'black'}}/> */}
          <Text style={[theme.fonts.bodyMedium]}>{item.message}</Text>
        </AnimatedNotificationItem>
      </Swipeable>
    );
  };

  return (
<MainContainer title={"Notifications"} titleBadge={notifications.length} navigation={navigation}>
      <View style={[styles.container,
      { 
        // backgroundColor: theme.colors.background 
      }]}>
        {/* notifications */}
        <FlatList
          data={notifications}
          contentContainerStyle={styles.notifications}
          renderItem={({ item, index }) => (
            <SwipeableRow index={index} item={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={()=><View style={{height:StyleSheet.hairlineWidth,backgroundColor:'black',marginVertical:10}}/>}
        />
      </View>
    </MainContainer>
  );
};
export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  notifications: {
    // gap: 20,
    // marginHorizontal: 20,
    paddingBottom: "10%",
  },
  notification_item: {
    // padding: 10,
    // borderRadius: 10,
    // borderWidth: StyleSheet.hairlineWidth,
    gap: 5,
    // paddingVertical:10,
    paddingHorizontal: 20,
    // paddingHorizontal:20,paddingVertical:10,
  },
});
