import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Notifications from './src/screens/Notifications';
import { BottomNavigation, useTheme } from 'react-native-paper';
import RYDrawer from './src/components/RYDrawer';

import Activities from './src/screens/Activities';
import MyCourses from './src/screens/Courses/MyCourses';
import AllCourses from './src/screens/Courses/AllCourses';
import MyGroups from './src/screens/Groups/MyGroups';
import AllGroups from './src/screens/Groups/AllGroups';
import TaskBoard from './src/screens/TaskBoard';
import RYFeeds from './src/screens/RYFeeds';
import Coach from './src/screens/Coach';
import Wallpapers from './src/screens/Wallpapers';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContext } from './AuthProvider';


// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerNavigator = Drawer.Navigator;
const Screen = Drawer.Screen;
const DrawerNavigation = ()=>(
<DrawerNavigator initialRouteName='home' drawerContent={props=><RYDrawer {...props}/>} screenOptions={{
    header:()=>null,
    drawerType:'slide'
}}>
    <Screen name='home' component={Home}/>
    <Screen name='activities' component={Activities}/>
    <Screen name='taskboard' component={TaskBoard}/>
    <Screen name='wallpapers' component={Wallpapers}/>
    
    {/* courses */}
    <Screen name='mycourses' component={MyCourses}/>
    <Screen name='allcourses' component={AllCourses}/>
    {/* groups */}
    <Screen name='mygroups' component={MyGroups}/>
    <Screen name='allgroups' component={AllGroups}/>

    <Screen name='ryfeeds' component={RYFeeds}/>
    <Screen name='coach' component={Coach}/>
    <Screen name='notifications' component={Notifications}/>

</DrawerNavigator>
)


const SignedInStack = () => {

  const theme = useTheme()
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'wallpapers', title: 'Wallpapers', focusedIcon: 'image' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    wallpapers: Wallpapers,
    notifications: Notifications,
  });
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <BottomNavigation
      barStyle={{backgroundColor:theme.colors.surfaceVariant}}
  navigationState={{ index, routes }}
  onIndexChange={setIndex}
  renderScene={renderScene}
/>
</GestureHandlerRootView>
    
  )
  
}

export default SignedInStack