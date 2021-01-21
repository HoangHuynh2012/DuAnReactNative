import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
//
const width = Dimensions.get('window').width;

const LoginUser = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function checkFirebase(tk, mk) {
    auth()
      .signInWithEmailAndPassword(tk, mk)
      .then(() => {
        ToastAndroid.show(
          'Success ✅,Account created successfully',
          ToastAndroid.LONG,
          navigation.navigate('Main'),
        );
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          ToastAndroid.show(
            'The password is invalid or the user does not have a password.',
            ToastAndroid.SHORT,
          );
        }
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show(
            'The email address is badly formatted.',
            ToastAndroid.SHORT,
          );
        }
        if (error.code === 'auth/user-not-found') {
          ToastAndroid.show(
            ' There is no user record corresponding to this identifier. The user may have been deleted.Go to Register!',
            ToastAndroid.SHORT,
          );
        }
        if (error.code === 'auth/unknown') {
          ToastAndroid.show(
            'An internal error has occurred. [ Connection reset ]',
            ToastAndroid.SHORT,
          );
        }
        console.error(error);
      });
  }

  function check(email, password) {
    if (email.trim().length == 0) {
      ToastAndroid.show('Email is null', ToastAndroid.SHORT);
    } else if (password.trim().length == 0) {
      ToastAndroid.show('Password is null', ToastAndroid.SHORT);
    } else if (password.trim().length < 6) {
      ToastAndroid.show(
        ' Password should be at least 6 characters',
        ToastAndroid.SHORT,
      );
    } else {
      checkFirebase(email, password);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Text style={styles.logo}>React Native APP</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => check(username, password)}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});
