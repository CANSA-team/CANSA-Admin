import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native';
import { checkLogin, getUserInfo, getUserPermissions, logout, ShopModel, ShopState, State, UserModel, UserPermissionsModel, UserStage } from '../redux';
import { useNavigation } from '../utils/useNavigation';
import COLORS from '../consts/Colors';

import { useDispatch, useSelector } from 'react-redux';

export default function Lauding() {
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { check, userInfor, timeSampCheckLogin, userPermission }: { check: boolean, userInfor: UserModel, timeSampCheckLogin: number, userPermission: UserPermissionsModel } = userState;
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const { info }: { info: ShopModel } = shopSate;
    const [getData, setData] = useState<boolean>(false);
    const { navigate } = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLogin());
    }, [])

    useEffect(() => {
        if (!check && timeSampCheckLogin > Math.floor(Date.now())) {
            navigate('loginStack')
        }
        else if (check) {
            dispatch(getUserInfo())
        }
    }, [timeSampCheckLogin])

    useEffect(() => {
        if (userPermission && Object.keys(userPermission).length) {
            if (userPermission.permission_id === 3 || userPermission.permission_id === 4) {
                navigate('homeStack')
            } else {
                Alert.alert('Thông Báo', 'Tài khoản bạn không đủ quyền hạn', [
                    {
                        text: "OK",
                        onPress: () => {
                            dispatch(logout());
                            dispatch(checkLogin());
                            navigate('loginStack');
                        },
                    },]);
            }
        }
        else if (!userPermission) {
            Alert.alert('Thông Báo', 'Tài khoản bạn không đủ quyền hạn', [
                {
                    text: "OK",
                    onPress: () => {
                        dispatch(checkLogin());
                        navigate('loginStack');
                    },
                },]);
        }
    }, [userPermission])

    useEffect(() => {
        if (Object.keys(userInfor).length) {
            dispatch(getUserPermissions());
        } else if (!userInfor) {
            Alert.alert('Thông Báo', 'Tài khoản bạn không đủ quyền hạn hoặc chưa được kích hoạt!', [
                {
                    text: "OK",
                    onPress: () => {
                        dispatch(checkLogin());
                        navigate('loginStack');
                    },
                },]);
        }
    }, [userInfor])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Welcome to</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 45, color: COLORS.primary }}>CANSA ADMIN</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deliveryIcon: {
        width: 120,
        height: 120,
    },
    titleContainer: {
        marginTop: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        color: '#7D7D7D'
    }
});
