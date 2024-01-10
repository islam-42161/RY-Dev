import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  IconButton,
  Menu,
  Modal,
  Portal,
  useTheme,
} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";

const taskTypes = ["Task A", "Task B", "Task C", "Task D"];
const recurringTimes = [
  "Every Day",
  "Every 3 Days",
  "Every 15 Days",
  "Every Month",
];
const tagStates = [
  { "state": "paramount", "color": "#FF6347" },
  { "state": "significant", "color": "#FFA07A" },
  { "state": "moderate", "color": "#FFD700" },
  { "state": "minor", "color": "#90EE90" },
  { "state": "negligible", "color": "#98FB98" }
]


function formatTime(dateTime){
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  return formattedTime
}

function formateDate(dateTime){
  const formattedDate = dateTime.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  return formattedDate
}


const RYTaskModal = ({ hideModal, taskModalVisible }) => {
  const theme = useTheme();
  const [taskMenuVisible, setTaskMenuVisible] = useState(false);
  const [recurringTimeVisible, setRecurringTimeVisible] = useState(false);
  const [showTime,setShowTime] = useState(false);
  const [showCalendar,setShowCalendar] = useState(false);


  const [title, setTitle] = useState(null);
  const [taskType, setTaskType] = useState("Task Type");
  const [recurring, setRecurring] = useState(false);
  const [recurringTime, setRecurringTime] = useState("Recur After");
  const [time, setTime] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [tags, setTags] = useState([]);

  const openTaskMenu = () => setTaskMenuVisible(true);
  const closeTaskMenu = () => setTaskMenuVisible(false);
  const openRecurringTimeMenu = () => setRecurringTimeVisible(true);
  const closeRecurringTimeMenu = () => setRecurringTimeVisible(false);
  const openShowTime = () => setShowTime(true)
  const closeShowTime = () => setShowTime(false)
  const openCalendarTime = () => setShowCalendar(true)
  const closeCalendarTime = () => setShowCalendar(false)



  const onChangeTime = (event, selectedTime) => {
    closeShowTime();
    setTime(selectedTime);
  };
  const onChangeDate = (event, selectedDate) => {
    closeCalendarTime();
    setDueDate(selectedDate);
  };

  const handleSavePress = () => {
    console.log("pressed save button")
  }

  return (
    <Portal>
      <Modal
        visible={taskModalVisible}
        onDismiss={hideModal}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        {/* row one */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            gap:10
          }}
        >
          <TextInput
            mode="outlined"
            // label={"Task Title"}
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={[theme.fonts.labelLarge,{flex:1}]}
          />
          <Menu
            visible={taskMenuVisible}
            onDismiss={closeTaskMenu}
            contentStyle={{ backgroundColor: theme.colors.background }}
            anchor={
              <Chip
                mode="outlined"
                icon="chevron-down"
                onPress={() => openTaskMenu()}
              >
                {taskType}
              </Chip>
            }
          >
            {taskTypes.map((value, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setTaskType(value);
                  closeTaskMenu();
                }}
                title={value}
              />
            ))}
          </Menu>
        </View>

        {/* row two */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap:10
          }}
        >
          <Menu
            visible={recurringTimeVisible}
            onDismiss={closeRecurringTimeMenu}
            contentStyle={{ backgroundColor: theme.colors.background }}
            anchor={
              <Chip
                mode="outlined"
                icon={"chevron-down"}
                disabled={!recurring}
                onPress={() => openRecurringTimeMenu()}
              >
                {recurringTime}
              </Chip>
            }
          >
            {recurringTimes.map((value, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setRecurringTime(value);
                  closeRecurringTimeMenu();
                }}
                title={value}
              />
            ))}
          </Menu>

          <Pressable
            style={styles.recurring}
            onPress={() => {
              setRecurring(!recurring);
            }}
          >
            <Checkbox status={recurring ? "checked" : "unchecked"} />
            <Text style={[theme.fonts.bodyLarge]}>Recurring</Text>
          </Pressable>

          
        </View>
        {/* row three */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap:10
          }}
        >
          <Chip icon={"clock"} mode="outlined" onPress={()=>openShowTime()}>
          {time ? formatTime(time) : 'Ends In'}
          </Chip>
          {showTime && (
            <RNDateTimePicker mode="time" display="spinner" onChange={onChangeTime} 
            value={time}
            />
          )}

          <Chip icon={"calendar"} mode="outlined" onPress={()=>openCalendarTime()}>
            {dueDate ? formateDate(dueDate) : 'Due Date'}
          </Chip>

          {showCalendar && (
            <RNDateTimePicker mode="date" display="calendar" onChange={onChangeDate} 
            value={dueDate}
            />
          )}

        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap:10
          }}
        >
          <Chip icon={"plus"} mode="outlined">
            Add Tag
          </Chip>
          
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap:10
          }}
        >
        <Button mode="outlined" onPress={hideModal}>Cancel</Button>
        <Button mode="contained" onPress={handleSavePress}>Save</Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default RYTaskModal;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    gap: 10,
  },
  recurring: {
    flexDirection: "row",
    alignItems: "center",
  },
});
