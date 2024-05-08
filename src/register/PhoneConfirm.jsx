import { Alert, Dimensions, Keyboard, StatusBar, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import OTPTextInput from 'react-native-otp-textinput'
import { Button, Dialog, Divider, List, Portal, Text, useTheme } from 'react-native-paper'
import { signInWithPhoneNumber } from '../../../firebase/firebaseConfig'
const STATUSBAR_HEIGHT = StatusBar.currentHeight
const PhoneConfirm = ({navigation,route}) => {
  const theme = useTheme()
  const {phone,countryCode} = route.params;
  const otpInput = useRef()
  const [code,setCode] = useState('')
  const [confirm,setConfirm] = useState(null)
  const [loading,setLoading] = useState(false)

  const [seconds,setSeconds] = useState(120)


  const [dialogvisible, setDialogVisible] = useState(false);

  const showDialog = () => setDialogVisible(true);

  const hideDialog = async () => setDialogVisible(false);
const continueConfirmation = ()=>{
  hideDialog().then(()=>{
    console.log("closed dialog")
    signInWithPhoneNumber(phoneNumber).then((e)=>{
      console.log("sent message")
    }).catch((e)=>{
      console.log(e.message)
      Alert.alert(`${e.message}`)
    })
  })
  
}

  async function confirmCode(){
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid Code")
    }
  }

    // const clearText = () => {
    //     otpInput.current.clear();
    // }

    const setText = () => {
        otpInput.current.setValue("1234");
    }
    const handleTextChange = (text)=>{
      setCode(text)
      console.log("changing text")
    }
    const handleContinuePress = ()=>{
      if(code.length===6){
        setLoading(true)
        // call confirm function


      }
    }

    const phoneNumber = `${countryCode} ${phone}`


    useEffect(()=>{
    showDialog()
    },[])

// countdown
    useEffect(() => {
      // Set an interval to increment the seconds every second
      const interval = setInterval(() => {
        // Check if the timer has reached 120 seconds
        if (seconds > 0) {
          // Increment the seconds
          setSeconds(prevSeconds => prevSeconds - 1);
        } else {
          // If the timer reaches 120 seconds, clear the interval to stop counting
          clearInterval(interval);
        }
      }, 1000); // Run every second (1000 milliseconds)
  
      // Clean up the interval when the component is unmounted
      return () => clearInterval(interval);
    }, [seconds]); // The effect depends on the 'seconds' state variable
  

const resendCode=()=>{
  setSeconds(120)
  console.log('resendSMS')
}

  return (
    <TouchableWithoutFeedback
     onPress={Keyboard.dismiss}>
    <View style={styles.container}>
    <StatusBar barStyle={'dark-content'}/>


    <Portal>
          <Dialog visible={dialogvisible} onDismiss={hideDialog}>
            <Dialog.Title>Are you sure?</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">This is your phone number: <Text style={{fontWeight:'bold'}}>{phoneNumber}</Text></Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode='outlined' onPress={()=>navigation.goBack()}>Nope</Button>
              <Button mode='contained' onPress={continueConfirmation}>I am sure</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>




    <Text style={[theme.fonts.titleLarge,{color:theme.colors.primary,alignSelf:'center'}]}>Verify {phoneNumber}</Text>
    
    <View>
    <Text style={[theme.fonts.bodyLarge,{alignSelf:'center'}]}>We have sent an SMS with a code to <Text style={{fontWeight:'bold'}}>{phoneNumber}</Text></Text>
    <Text onPress={()=>navigation.goBack()} style={[theme.fonts.bodyLarge,{alignSelf:'center',color:theme.colors.secondary}]}>Wrong number?</Text>
    </View>
      <OTPTextInput inputCount={6} ref={otpInput} handleTextChange={handleTextChange}/>
    <Text style={[theme.fonts.bodyMedium,{color:theme.colors.surfaceDisabled,fontWeight:'bold',alignSelf:'center'}]}>Enter 6-digit code</Text>
    
    <View>
    <List.Item
    disabled={seconds>0?true:false}
    // disabled
    title="Resend SMS"
    // description="Item description"
    left={props => <List.Icon {...props} icon="message-text-outline" />}
    right={props=>  <Text style={[theme.fonts.bodySmall,{color:theme.colors.surfaceDisabled}]}>{seconds} seconds</Text>}
    onPress={resendCode}

  />
  <Divider/>
  <List.Item
    title={`Call me at ${phoneNumber}`}
    // description="Item description"
    left={props => <List.Icon {...props} icon="phone-outline" />}
    onPress={()=>console.log('Call me')}

  />
  </View>
  <Button mode='contained' loading={loading} onPress={handleContinuePress} disabled={code.length!=6} icon={'check'} style={{marginHorizontal:20}}>Confirm</Button>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default PhoneConfirm

const styles = StyleSheet.create({
  container:{
    paddingTop:STATUSBAR_HEIGHT+20,
    flex:1,
    // alignItems:'center',
    gap:20
    // justifyContent:'space-between'
  }
})