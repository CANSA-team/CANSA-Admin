import React, { Component, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { useNavigation } from '../../utils/useNavigation'
import { cansa } from '../../consts/Selector'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopModel, ShopState, UserModel, UserStage } from '../../redux'
import { checkLogin, login } from '../../redux/actions/userActions'



export default function Login(props: any) {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [checkStatus, setCheckStatus] = useState(false)
  const [emailValdate, setEmailValdate] = useState(true)
  const [password, setPassword] = useState('')
  const [passwordValdate, setPasswordValdate] = useState(true)
  const [isLoading, setisLoading] = useState(false)
  const userState: UserStage = useSelector((state: State) => state.userReducer);
  const { check, dataLogin }: { check: boolean, dataLogin: any } = userState;

  const dispatch = useDispatch();

  const loginBtn = () => {
    // dispatch(login('natswarchuan@gmail.com', 'Chuan1999'))
    if (email != '' && password != '') {
      dispatch(login(email, password));
    } else {
      Alert.alert('Thông báo', 'Email hoặc password không hợp lệ!!')
    }
  }

  useEffect(() => {
    if (dataLogin !== undefined && dataLogin !== null) {
      if (dataLogin.permission_id === 3 || dataLogin.permission_id === 4) {
        navigate('homeStack')
      } else {
        setStatus('Không đủ quyền hạn')
        setCheckStatus(true)
      }
    } else if (dataLogin == undefined && dataLogin == null) {
      setStatus('Không đúng mật khẩu')
    }
  }, [dataLogin])

  useEffect(() => {
    if (status !== '') {
      Alert.alert('Thông Báo', status)
    }
  }, [status])
  const valiDate = (text: any, type: any) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (type == 'email') {
      if (emailRegex.test(text)) {
        setEmail(text)
        setEmailValdate(true);
      }
      else {
        setEmail('')
        setEmailValdate(false)
      }
    }
    else if (type == 'password') {
      if (passwordRegex.test(text)) {
        setPassword(text)
        setPasswordValdate(true);
      }
      else {
        setPassword('')
        setPasswordValdate(false)
      }
    }
  }
  const Divider = (props: any) => {
    return <View {...props}>
      <View style={styles.line}></View>
      <Text style={styles.textOR}>OR</Text>
      <View style={styles.line}></View>
    </View>
  }

  return (
    //Donot dismis Keyboard when click outside of TextInput
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate('homeStack')} >
            <MaterialIcons style={styles.headerIcon} name="arrow-back" size={30} color="white"/>
          </TouchableOpacity>
        </View>
        <View style={styles.up}>
          <Ionicons
            name="ios-speedometer"
            size={100}
            color={'rgb(221, 97, 97)'}>
          </Ionicons>
          <Text style={styles.title}>
            Account Information
          </Text>
        </View>

        <View style={styles.down}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, !emailValdate ? styles.error : null]}
              textContentType='emailAddress'
              keyboardType='email-address'
              placeholder="Enter your email"
              onChangeText={(text) => valiDate(text, 'email')}
            >
            </TextInput>
          </View>


          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, !passwordValdate ? styles.error : null]}
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(text) => valiDate(text, 'password')}
            >
            </TextInput>
          </View>



          <TouchableOpacity style={styles.loginButton}
            onPress={() => loginBtn()}
          >
            <Text style={styles.loginButtonTitle}>Đăng nhập</Text>
          </TouchableOpacity>

        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#33FF99'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    position: 'absolute',
    top: 30,
    left: 10,
    right: 0,
    zIndex: 2
  },
  headerIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    padding: 5
  },
  up: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  down: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: 'rgb(255,119,34)',
    textAlign: 'center',
    width: 400,
    fontSize: 23
  },
  textInputContainer: {
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  textInput: {
    width: 280,
    height: 45
  },
  loginButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(221, 97, 97)'
  },
  loginButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
  facebookButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',

  },
  googleButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
  },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: 'black'
  },
  textOR: {
    flex: 1,
    textAlign: 'center'
  },
  divider: {
    flexDirection: 'row',
    height: 40,
    width: 298,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotButton: {

  },
  navButtonText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    color: '#3b5998'

  },
  navButtonText1: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#3b5998'

  },
  error: {
    borderColor: 'red',
    borderWidth: 1
  }
})
