import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { IconButton, useTheme, Colors, MD3Colors } from "react-native-paper";
import { AuthContext } from "../../AuthProvider";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import {
  Swipeable, openRight
} from "react-native-gesture-handler";
import MainContainer from "./MainContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subscribeToNotifications } from "../../firebase/firebaseConfig";
import RenderHTML from "react-native-render-html";

const { width } = Dimensions.get('window')
const saveNotifications = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('notifications', jsonValue);
  } catch (e) {
    console.log(e);
  }
};




const AnimatedNotificationItem = Animated.createAnimatedComponent(TouchableOpacity);

const Notifications = ({ navigation, route }) => {
  const { notifications, setNotifications } = useContext(AuthContext);
  const theme = useTheme();


  const SwipeableRow = ({ item, index }) => {
    const swiperef = useAnimatedRef()
    const swipeLeft = () => {
      swiperef.current.openRight()
    }
    const renderRightActions = () => (
      <IconButton icon={'delete'} mode="contained" onPress={() => deleteNotification(index)} iconColor={MD3Colors.error60} containerColor={MD3Colors.error90} style={{ alignSelf: 'center', marginEnd: 20 }} />
    );

    return (
      <Swipeable ref={swiperef} renderRightActions={renderRightActions}>
        <AnimatedNotificationItem
          onLongPress={() => {
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
          {/* <Text style={[theme.fonts.bodyMedium]}>{item.body}</Text> */}
          <View><RenderHTML
            contentWidth={width}
            source={{ html: `${item.body}` }}
            tagsStyles={{
              p: {
                margin: 0,
                // padding:0
              }
            }}
          />
          </View>
        </AnimatedNotificationItem>
      </Swipeable>
    );
  };

  // realtime update from firestore
  // useEffect(() => {
  //   const unsubscribe = subscribeToNotifications(
  //     (newNotifications) => {
  //       setNotifications(newNotifications);
  //     },
  //     (error) => {
  //       console.log("Error: ", error);
  //     }
  //   );

  //   // Clean up the listener when the component unmounts
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const getAndStoreNotifications = async () => {
      const notifs = await getNotifications();
      setNotifications(notifs);
    }
    getAndStoreNotifications();
  }, [])

  async function deleteNotification(index) {
    try {
      // Retrieve notifications from AsyncStorage
      const notifications = await getNotifications();

      // Create a new array with the notification at the given index removed
      const updatedNotifications = notifications.filter((item, i) => i !== index);

      // Store the updated notifications in AsyncStorage
      await storeNotifications(updatedNotifications);

      // Update the state with the new notifications
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  async function getNotifications() {
    try {
      const notificationsString = await AsyncStorage.getItem('notifications');
      return notificationsString ? JSON.parse(notificationsString) : [];
    } catch (error) {
      console.error('Error retrieving notifications:', error);
      return [];
    }
  }

  async function storeNotifications(notifications) {
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error storing notifications:', error);
    }
  }

  useEffect(() => { }, [notifications])


  return (
    <MainContainer title={"Notifications"} navigation={navigation}>
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
        // ItemSeparatorComponent={()=><View style={{height:StyleSheet.hairlineWidth,backgroundColor:'black',marginVertical:10}}/>}
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    // gap: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
