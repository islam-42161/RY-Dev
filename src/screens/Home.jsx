
import React, { useContext, useState, useEffect } from 'react'
import { signOut } from '../../firebase/firebaseConfig'
import { AuthContext } from '../../AuthProvider'
import { View, Text, StatusBar } from 'react-native';

const Home = ({route,navigation}) => {
  const {user} = useContext(AuthContext)

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Set an interval to increment the seconds every second
    const interval = setInterval(() => {
      // Check if the timer has reached 120 seconds
      if (seconds < 120) {
        // Increment the seconds
        setSeconds(prevSeconds => prevSeconds + 1);
      } else {
        // If the timer reaches 120 seconds, clear the interval to stop counting
        clearInterval(interval);
      }
    }, 1000); // Run every second (1000 milliseconds)

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [seconds]); // The effect depends on the 'seconds' state variable

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle={"light-content"}
        />
      <Text>Hi, {user.displayName}!</Text>
      <Text onPress={()=>{
        signOut()
      }}>Log out</Text>

<Text style={{marginTop:20}} onPress={()=>{
  if(seconds===120){
    setSeconds(0)
  }
}}>{seconds}</Text>

    </View>
  );
};

export default Home;
