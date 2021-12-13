import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Picker,
    Alert,
} from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux'
import { State, UserStage } from '../../redux'
import { CreateUser } from '../../redux/actions/userActions'
import COLORS from '../../consts/Colors';
import RNPickerSelect from 'react-native-picker-select';

export default function AddUser(props: any) {
    let temp_data = [
        {
            value: "3",
            label: "Admin"
        },
        {
            value: "4",
            label: "Shiper"
        },
    ]

    const { navigation } = props;
    const [selectedValue, setSelectedValue] = useState("");
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isSend, setIsSend] = useState(false)
    const [data, setData] = useState(temp_data);

    const [emailValdate, setEmailValdate] = useState(true)
    const [password, setPassword] = useState('')
    const [passwordValdate, setPasswordValdate] = useState(true)
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { dataCreateUser }: { check: boolean, dataLogin: any, dataCreateUser: any } = userState;
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
    const createUserAccount = () => {
        setIsSend(true);
        if (selectedValue !== "" && name !== '') {
            dispatch(CreateUser(selectedValue, name, password, email));
        } else {
            Alert.alert('Thông Báo', 'Vui Lòng chọn thông tin đầy đủ!!')
        }
    }
    useEffect(() => {

        if (dataCreateUser?.data) {
            Alert.alert('Thông Báo', `ID:${dataCreateUser?.data?.user_id} \n Name:${dataCreateUser?.data?.user_name} \n EMAIL:${email} \n PASSWORD:${dataCreateUser?.data?.user_password} \n Yêu cầu: Đăng nhập tài khoản vào ứng dụng dành cho người dùng và điền thông tin đầy đủ vào tài khoản để được mở khóa tài khoản!`, [{ text: 'OK', onPress: () => setIsSend(false) }]);
        } else if (dataCreateUser?.message && isSend) {
            Alert.alert('Thông Báo', dataCreateUser.message, [{ text: 'OK', onPress: () => setIsSend(false) }]);
        }
    }, [dataCreateUser])
    return (
        <View style={{ flex: 1 }}>
            <HeaderTitle title="Cấp Tài Khoản" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.down}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={[styles.textInput, !emailValdate ? styles.error : null]}
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        placeholder="Nhập tên của bạn"
                        onChangeText={(text) => setName(text)}
                    >
                    </TextInput>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={[styles.textInput, !emailValdate ? styles.error : null]}
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        placeholder="Nhập email của bạn"
                        onChangeText={(text) => valiDate(text, 'email')}
                    >
                    </TextInput>
                </View>


                <View style={styles.textInputContainer}>
                    <TextInput
                        style={[styles.textInput, !passwordValdate ? styles.error : null]}
                        placeholder="Nhập password của bạn"
                        secureTextEntry={true}
                        onChangeText={(text) => valiDate(text, 'password')}
                    >
                    </TextInput>
                </View>
                <View style={{ borderColor: '#ccc', borderWidth: 1, marginBottom: 20, width: '50%' }}>
                    <RNPickerSelect
                        placeholder={{ label: `---Chọn---`, value: "" }}
                        style={{ ...pickerSelectStyles, placeholder: { color: '#acabab' } }}
                        onValueChange={(data) => {
                            setSelectedValue(data)
                        }}
                        items={data}
                    />
                </View>

                <TouchableOpacity style={styles.loginButton}
                    onPress={() => createUserAccount()}
                >
                    <Text style={styles.loginButtonTitle}>Tạo tài Khoản</Text>
                </TouchableOpacity>
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
        top: 34,
        left: 5,
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
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textInputContainer: {
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    textInput: {
        width: 280,
        height: 50,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    loginButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary
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
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 25
    },
    inputAndroid: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 25
    },
});