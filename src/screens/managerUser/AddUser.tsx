import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    Picker,
    Alert,
} from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Pagination from "@mui/material/Pagination";
import COLORS from '../../consts/Colors';
import { useDispatch, useSelector } from 'react-redux'
import { ShopModel, ShopState, State, UserModel, UserStage } from '../../redux'
import { checkLogin, login, getUserInfo, GetAllUser, EditStatus, CreateUser } from '../../redux/actions/userActions'

export default function AddUser(props: any) {
    const { navigation } = props;
    const [selectedValue, setSelectedValue] = useState("");
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [messger, setMessger] = useState('')

    const [emailValdate, setEmailValdate] = useState(true)
    const [password, setPassword] = useState('')
    const [passwordValdate, setPasswordValdate] = useState(true)
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { check, dataLogin,dataCreateUser }: { check: boolean, dataLogin: any, dataCreateUser:any } = userState;
    const dispatch = useDispatch();

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
    const createUserAccount = ()=>{
        if(selectedValue!=="" && name !==''){
            dispatch(CreateUser(selectedValue,name,password,email));
        }else{
            Alert.alert('Thông Báo','Vui Lòng chọn thông tin đầy đủ!!')
        }
    }
    useEffect(()=>{
        if(dataCreateUser!==undefined && dataCreateUser !== null){
            console.log(dataCreateUser)
            var str = `ID:${dataCreateUser.user_id} \n Name:${dataCreateUser.user_name} \n EMAIL:${email} \n PASSWORD:${dataCreateUser.user_password}`;
            setMessger(str)
        }
    },[dataCreateUser])
    return (
        <View style={{ flex: 1 }}>
            <HeaderTitle title="Cấp Tài Khoản" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            <View style={styles.down}>
            <View style={styles.textInputContainer}>
                    <TextInput
                        style={[styles.textInput, !emailValdate ? styles.error : null]}
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        placeholder="Enter your name"
                        onChangeText={(text) => setName(text)}
                    >
                    </TextInput>
                </View>
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
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="---Chọn---" value="" />
                    <Picker.Item label="Admin" value="3" />
                    <Picker.Item label="Shiper" value="4" />
                </Picker>


                <TouchableOpacity style={styles.loginButton}
                    onPress={() => createUserAccount()}
                >
                    <Text style={styles.loginButtonTitle}>Tạo tài Khoản</Text>
                </TouchableOpacity>
                <View style={styles.textInputContainer}>
                    <Text>{messger}</Text>
                </View>
            </View>

        </View>

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
