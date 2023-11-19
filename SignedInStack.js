import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home';


const Stack = createNativeStackNavigator();
const Navigator = Stack.Navigator;
const Screen = Stack.Screen;
const SignedInStack = () => {

  return (
<Navigator initialRouteName='home' screenOptions={{
    header:()=>null
}}>
    <Screen name='home' component={Home}/>
</Navigator>
  )
}

export default SignedInStack