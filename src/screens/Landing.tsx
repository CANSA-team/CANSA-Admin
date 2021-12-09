import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native';
import { checkLogin, getUserInfo, logout, ShopModel, ShopState, State, UserModel, UserStage } from '../redux';
import { useNavigation } from '../utils/useNavigation';
import COLORS from '../consts/Colors';

import { useDispatch, useSelector } from 'react-redux';

export default function Lauding() {
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { check, userInfor, timeSampCheckLogin }: { check: boolean, userInfor: UserModel, timeSampCheckLogin: number } = userState;
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
        if (Object.keys(userInfor).length) {
            if (userInfor.user_permission === 3 || userInfor.user_permission === 4) {
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
