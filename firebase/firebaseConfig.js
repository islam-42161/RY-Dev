// GoogleSignInModule.js

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from "@react-native-firebase/messaging";
import storage from '@react-native-firebase/storage';



// get timezone
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;




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
    const user = (await auth().signInWithCredential(googleCredential)).user;

    // Upload the user info to firestore
    await registerNewUser(user);

    // Return the user object
    return user;
  } catch (error) {
    // console.error('Error signing in with Google:', error);
    throw error;
  }
};


async function signInWithPhoneNumber(phoneNumber){
  return await auth().signInWithPhoneNumber(phoneNumber);
}


// const signOut = async () => {
//   auth()
//     .signOut()
//     .then(() => {
//       console.log('User signed out!')
//       return true
//     }).catch(()=>{
//       return false
//     })
// }

// const revokeAccess = async () => {
//   GoogleSignin.revokeAccess().then(()=>{
//     console.log('Access revoked for Google users!')
//     return true
//   })
// }


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


const addNewTask = async () => {
await firestore().collection("Tasks/Sazzad").add({
  title: "Sample task title",
  task_type: "Task A",
  recurring: true,
  recur_period: 0,
  end_time: new Date().getTime(),
  end_date: Timestamp.fromDate(new Date()),
  tags:[]
}).then(()=>{
  console.log("Added new document")
})
}

const getQuoteOfToday = async () => {
  try {
    const date = new Date().toLocaleDateString('sv-SE', {timeZone: timezone}); // get date in 'yyyy-mm-dd' format
    const dailyQuotes = await firestore().collection('daily_quotes').where('date', '==', date).get();
    
    if (!dailyQuotes.empty) {
      return dailyQuotes.docs[0].data(); // return the data of the first (and should be the only) document
    } else {
      console.log('No quote found for today');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}


// const registerNewUser = async (user) => {
//   // Get the user data from the user object
//   const userData = {
//     uid:user.uid,
//     firstName: user.displayName,
//     email: user.email,
//     photoURL:user.photoURL,
//     phoneNumber:user.phoneNumber
//   };

//   // Register the new user in firestore
//   await firestore()
//     .collection('users')
//     .doc(user.uid)
//     .set(userData)
//     .then(() => {
//       console.log('User added!');
//     });
//    messaging().getToken().then(token=>{
//     uploadDeviceFCMToken(user.uid,token);
//     })
// }

const registerNewUser = async (user) => {
  const uid = user.uid;

  // Check if the user exists in the 'users' collection
  const userDoc = await firestore().collection('users').doc(uid).get();

  if (userDoc.exists) {
    // User exists, check if the token is unique
    const token = await messaging().getToken();
    const existingTokens = userDoc.data().fcm_tokens || [];

    if (!existingTokens.includes(token)) {
      // Append the unique token to the 'fcm_tokens' array
      await firestore().collection('users').doc(uid).update({
        fcm_tokens: firestore.FieldValue.arrayUnion(token),
      });
    }
  } else {
    // User doesn't exist, create a new user document
    const userData = {
      uid,
      firstName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      fcm_tokens: [await messaging().getToken()], // Initialize with the current token
    };

    await firestore().collection('users').doc(uid).set(userData);
    console.log('New user added!');
  }
};


const uploadDeviceFCMToken = async(uid,token)=>{
  // Add the token to the users datastore
  await firestore()
    .collection('users')
    .doc(uid)
    .update({
      fcm_tokens: firestore.FieldValue.arrayUnion(token),
    });

}

function subscribeToNotifications(callback, errorCallback) {
  // return onSnapshot(
  //   collection(db, "notifications"),
  //   (snapshot) => {
  //     const newNotifications = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     callback(newNotifications);
  //   },
  //   errorCallback
  // );
  return firestore().collection('notifications').onSnapshot((snapshot)=>{
const newNotifications = snapshot.docs.map((doc)=>({
  id:doc.id,
  ...doc.data()
}));
callback(newNotifications);
  }, errorCallback);

}




async function listWallpapers() {
  try {
    const reference = storage().ref('wallpapers');
    const listResult = await reference.listAll();

    const wallpaperUrls = listResult.items.map(item => {
      // Get the download URL for each wallpaper
      return item.getDownloadURL();
    });

    // Wait for all promises to resolve
    const urls = await Promise.all(wallpaperUrls);
    return urls;
  } catch (error) {
    console.error('Error listing wallpapers:', error);
    return []; // Return an empty array in case of an error
  }
}




export { checkPlayServices, signInWithGoogle, signInWithPhoneNumber, signOut ,addNewTask, getQuoteOfToday,uploadDeviceFCMToken,registerNewUser,subscribeToNotifications,listWallpapers};