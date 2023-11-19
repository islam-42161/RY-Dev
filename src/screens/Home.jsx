import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { signOut } from '../../firebase/firebaseConfig'
import { AuthContext } from '../../AuthProvider'

const Home = ({route,navigation}) => {
  const {user} = useContext(AuthContext)
  // const {name} = route.params
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>Hi, {user.displayName}!</Text>
      <Text onPress={()=>{
        signOut()
      }}>Log out</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})