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

const ForgetPassword = ({navigation}) => {
  const [Email, setEmail] = useState('');

  function checkEmail(tk) {
    if (tk.trim().length <= 10) {
      ToastAndroid.show('Invalid email ?', ToastAndroid.SHORT);
    } else {
      resetPassword(tk);
    }
  }
  function resetPassword(email) {
    auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        ToastAndroid.show('Please check your email...', ToastAndroid.SHORT);
      })
      .catch(function (e) {
        if (e.code === 'auth/user-not-found') {
          ToastAndroid.show(
            'There is no user record corresponding to this identifier. The user may have been deleted.',
            ToastAndroid.SHORT,
          );
        }
        if (e.code === 'auth/invalid-email') {
          ToastAndroid.show(
            'The email address is badly formatted.',
            ToastAndroid.SHORT,
          );
        }
        console.log(e);
      });
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Text style={styles.logo}>RESET PASSWORD</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email ?"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => checkEmail(Email)}>
        <Text style={styles.loginText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Go To Login ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;

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
