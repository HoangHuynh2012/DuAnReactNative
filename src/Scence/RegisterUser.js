import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const showToastEmail = () => {
  ToastAndroid.show('Email is Null', ToastAndroid.SHORT);
};
const showToastPassword = () => {
  ToastAndroid.show(
    ' Password should be at least 6 characters',
    ToastAndroid.SHORT,
  );
};
const showToastPassword1 = () => {
  ToastAndroid.show(
    'Password and Confirm password not match',
    ToastAndroid.SHORT,
  );
};

const RegisterUser = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  //
  function _Register(tk, mk) {
    auth()
      .createUserWithEmailAndPassword(tk, mk)
      .then(() => {
        ToastAndroid.show('User account created', ToastAndroid.SHORT);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show(
            'That email address is already in use!',
            ToastAndroid.SHORT,
          );
        }
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show(
            'That email address is invalid!',
            ToastAndroid.SHORT,
          );
        }
      });
  }
  //
  function check(email, pw1, pw2) {
    if (email.trim().length == 0) {
      showToastEmail();
    } else if (pw1.trim().length < 6) {
      showToastPassword();
    } else if (pw2.trim().length < 6) {
      showToastPassword();
    } else if (pw1 == pw2) {
      _Register(email, pw2);
    } else {
      showToastPassword1();
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Text style={styles.logo}>React Native APP</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword2(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => check(email, password, password2)}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Go Back Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterUser;

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
