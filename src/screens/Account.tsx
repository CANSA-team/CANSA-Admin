import React, { useEffect } from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '../utils/useNavigation';
import HeaderTitle from '../components/HeaderTitle';
import { State, UserStage, UserModel } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, logout } from '../redux/actions/userActions';

export default function Account() {
    const { navigate } = useNavigation();
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { userInfor }: { userInfor: UserModel } = userState;
    const dispatch = useDispatch();

    const onTapProfile = () => {
        navigate('EmailOTPscreen')
    }

    useEffect(() => {
        dispatch(getUserInfo());
    }, [])

    const _logout = () => {
        dispatch(logout());
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderTitle title={'ACCOUNT'} />

            <View style={styles.accountContainer}>
                <View>
                    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: userInfor.user_avatar_image }} />
                </View>
                <View style={styles.actionAccount}>
                    <Text style={styles.nameUser}>{userInfor.user_real_name}</Text>
                    <Text style={[styles.nameUserNickName, { color: 'black' }]}>@{userInfor.user_email}</Text>
                    <Text style={{ fontSize: 18, color: 'gray' }}>{userInfor.user_phone}</Text>
                </View>
            </View>

            <View style={styles.viewNav}>

                <View style={styles.viewAction}>
                    <TouchableOpacity onPress={onTapProfile} style={styles.actionTouch}>
                        <Text style={styles.actionTitle}>Đổi mật khẩu</Text>
                        <SimpleLineIcons name="arrow-right" size={20} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.viewAction}>
                    <TouchableOpacity style={styles.actionTouch}
                        onPress={() => _logout()}>
                        <Text style={{ fontSize: 20, color: 'red' }}>Logout</Text>
                        <MaterialIcons name="exit-to-app" size={35} color='#ec2525' />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    container_login: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#33FF99'
    },
    accountContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    actionAccount: {
        flex: 1,
        marginLeft: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'flex-start'
    },
    nameUser: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    nameUserNickName: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    viewAction: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    actionTouch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionTitle: {
        fontSize: 20,
        color: '#333'
    },
    viewNav: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    }
});