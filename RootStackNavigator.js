import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/screens/Login';
import Register from './src/screens/Register';


const Stack = createNativeStackNavigator();
const Navigator = Stack.Navigator;
const Screen = Stack.Screen;
const RootStackNavigator = () => {

  return (
    <NavigationContainer>
<Navigator initialRouteName='login' screenOptions={{
    header:()=>null
}}>
    <Screen name='login' component={Login}/>
    <Screen name='register' component={Register}/>
</Navigator>
    </NavigationContainer>
  )
}

export default RootStackNavigator