import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Main = ({navigation}) => {
  function App() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
      return (
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View>
        <Text styles={styles.textWelcome}>Welcome {user.email}</Text>
      </View>
    );
  }
  function signOut() {
    auth()
      .signOut()
      .then(() => ToastAndroid.show('User signed out!', ToastAndroid.LONG));
  }
  function getData() {
    database()
      .ref('/TestData/1')
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());
      });
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <App />
      <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
        <Text styles={styles.textWelcome}>SignOut</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => getData()}>
        <Text styles={styles.textWelcome}>Get DATA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWelcome: {
    color: 'white',
    fontSize: 30,
  },
  btn: {
    width: 100,
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});
