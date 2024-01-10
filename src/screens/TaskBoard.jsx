import { StyleSheet, Text} from 'react-native'
import React from 'react';
import MainContainer from './MainContainer';
import RYTaskModal from '../components/RYTaskModal';
import { Button, Card, useTheme } from 'react-native-paper';

const TaskBoard = ({navigation,route}) => {
  const [taskModalVisible, setTaskModalVisible] = React.useState(false);
const theme = useTheme()
  const showModal = () => setTaskModalVisible(true);
  const hideModal = () => setTaskModalVisible(false);
  return (
    <MainContainer title={"Task Board"} navigation={navigation} route={route}>
   
<Card mode='contained' style={styles.emptyText}>
<Card.Content>
<Text style={[theme.fonts.bodyMedium,{color:theme.colors.onSurfaceVariant}]}>Your task board is currently empty. Click on <Text style={{fontWeight:'bold'}}>Add Task</Text> to get started and make the most of your day!</Text>
</Card.Content>
</Card>
    <Button style={styles.button} mode='contained' onPress={()=>showModal()}>Add Task</Button>
    <RYTaskModal hideModal={hideModal} taskModalVisible={taskModalVisible}/>
    </MainContainer>
  )
}


export default TaskBoard

const styles = StyleSheet.create({
  button:{
    margin:20
  },
emptyText:{
  marginHorizontal:20,
  marginTop:10,
}
})