// GoogleSignInModule.js

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';

// configuring google sign in
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_FIREBASE_GOOGLE_AUTH_WEBCLIENT_ID,
});
const checkPlayServices = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
};

const signInWithGoogle = async () => {
  try {
    // Check if your device supports Google Play
    await checkPlayServices();

    // Get the user's ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return (await auth().signInWithCredential(googleCredential)).user;
  } catch (error) {
    // console.error('Error signing in with Google:', error);
    throw error;
  }
};

async function signInWithPhoneNumber(phoneNumber){
  return await auth().signInWithPhoneNumber(phoneNumber);
}


const signOut = async () => {
  auth()
    .signOut()
    .then(() => {
      GoogleSignin.revokeAccess().then(()=>{
        console.log('User signed out!')
        return true
      })
    }).catch(()=>{
      return false
    })
}

export { checkPlayServices, signInWithGoogle, signInWithPhoneNumber, signOut };
