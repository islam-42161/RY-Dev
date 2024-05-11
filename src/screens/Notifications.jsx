import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { IconButton, useTheme, Colors, MD3Colors, Chip } from "react-native-paper";
import { AuthContext } from "../../AuthProvider";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import {
  Swipeable, openRight
} from "react-native-gesture-handler";
import MainContainer from "./MainContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subscribeToNotifications } from "../../firebase/firebaseConfig";
import RenderHTML from "react-native-render-html";
import { AntDesign } from '@expo/vector-icons';

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
    console.log(item)
    const timestamp = item.sentTime; // Assuming this is in milliseconds
const date = new Date(timestamp);

const options = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true // To display time in 12-hour format
};
const sentTime = date.toLocaleDateString('en-US', options);

const iconName =
  item.type === 'notification'
    ? 'notification'
    : item.type === 'quote'
    ? 'message1'
    : 'picture';
    return (
      <Swipeable ref={swiperef} renderRightActions={renderRightActions}>
        <AnimatedNotificationItem
          onLongPress={() => {
            swipeLeft()
          }}
          style={[
            styles.notification_item,
            {
              backgroundColor: theme.colors.surfaceVariant,
              
            },
          ]}
        >
          <View style={styles.notification_item_main_body}>
          <AntDesign name={iconName} style={{fontSize:18,backgroundColor:theme.colors.background,height:36,width:36,textAlign:'center',textAlignVertical:'center',borderRadius:18}} />
          <View style={{
            flex:1,
            gap:4
            }}>
            <Text
              style={[theme.fonts.titleMedium, { flex: 1 }]}
              numberOfLines={1}
            >
              {item.title}
            </Text>

          <View>
            <RenderHTML
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

<View style={styles.chips}>
<Text style={{paddingHorizontal:8,paddingVertical:4,borderWidth:StyleSheet.hairlineWidth,borderRadius:12,...theme.fonts.labelSmall}} adjustsFontSizeToFit>{sentTime}</Text>
{/* <Text style={{paddingHorizontal:8,paddingVertical:4,borderWidth:StyleSheet.hairlineWidth,borderRadius:12,...theme.fonts.labelSmall}} adjustsFontSizeToFit>{item.type.toUpperCase()}</Text> */}
{/* <Text style={{paddingHorizontal:8,paddingVertical:4,borderWidth:StyleSheet.hairlineWidth,borderRadius:12,...theme.fonts.labelSmall,flex:1}} adjustsFontSizeToFit>{item.type.toUpperCase()}</Text> */}
</View>
          </View>
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
    gap: 20,
    paddingTop:20,
    paddingBottom: "10%",
  },
  notification_item_main_body: {
    // padding: 10,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 20,
    // margin:10,
    flexDirection:'row'
    
  },
  notification_item:{
    borderRadius: 10,
    padding:10,
    marginHorizontal:20,
    gap:10
  },
  chips:{
    flexDirection:'row',
    alignItems:'center',
    gap:4,
    marginTop:4,
    flex:1
  }
});
