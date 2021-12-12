import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../components/HeaderTitle';
import { Controller, useForm } from 'react-hook-form';
import COLORS from '../../consts/Colors';
import { AdminState, CommissionModel, getCommission, getShip, ShipModel, State, updateCommission, updateShip } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';

export default function ManagerApp(props: any) {
    const { navigation } = props;
    const { control: controlCommission, formState: { errors: errorCommission }, handleSubmit: handleSubmitCommission, } = useForm({ mode: "onBlur" });
    const { control: controlShip, formState: { errors: errorShip }, handleSubmit: handleSubmitShip, } = useForm({ mode: "onBlur", });
    const adminSate: AdminState = useSelector((state: State) => state.adminReducer);
    const { commission_rate, ship_price }: { commission_rate: CommissionModel, ship_price: ShipModel } = adminSate;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadCommission, setIsCommission] = useState<boolean>(false);
    const [isLoadShip, setIsLoadShip] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCommission());
        dispatch(getShip());
    }, [])

    useEffect(() => {
        if (commission_rate && ship_price && Object.keys(commission_rate).length && Object.keys(ship_price).length) {
            setIsLoading(false);
            setIsLoadShip(false);
            setIsCommission(false);
        }
    }, [adminSate])

    const _updateCommission = (data: any) => {
        setIsCommission(true);
        dispatch(updateCommission(data.commission, commission_rate.last_update));
    }

    const _updateShip = (data: any) => {
        setIsLoadShip(true);
        dispatch(updateShip(data.ship_price, ship_price.last_update));
    }

    //Xu ly hoa hong
    const onSubmitCommission = (data: any) => {
        Alert.alert(
            "Thông báo!",
            'Xác nhận sửa',
            [
                { text: "Xác nhận", onPress: () => _updateCommission(data) },
                { text: "Huỷ" }
            ]
        );
    }

    //Xu ly ship
    const onSubmitShip = (data: any) => {
        Alert.alert(
            "Thông báo!",
            'Xác nhận sửa',
            [
                { text: "Xác nhận", onPress: () => _updateShip(data) },
                { text: "Huỷ" }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <HeaderTitle title="Quản lý App" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
            </View>
            {
                isLoading ?
                    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Image source={require('../../images/loader.gif')} />
                    </View>
                    :
                    <>
                        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                            <Text style={{ fontSize: 18 }}>Tỉ lệ hoa hồng : </Text>
                            <Controller
                                control={controlCommission}
                                rules={{
                                    required: true,
                                    min: 0,
                                    max: 99,
                                    pattern: /[0-9]/g
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.txtNumber}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        underlineColorAndroid="transparent"
                                        placeholder="Nhập phần trăm giảm nếu có ( 1 - 99 )"
                                        placeholderTextColor="#888"
                                        keyboardType="numeric"
                                        multiline={true}
                                        value={value}
                                    />
                                )}
                                name="commission"
                                defaultValue={commission_rate.commission_rate.toString()}
                            />
                            {errorCommission.commission && <Text style={styles.txtError}>* Hoa hồng từ 0 - 99</Text>}

                            {
                                isLoadCommission ?
                                    <View style={{ backgroundColor: COLORS.primary, borderRadius: 5, marginTop: 20 }}>
                                        <ActivityIndicator size="large" color="#fff" />
                                    </View>
                                    :
                                    <TouchableOpacity onPress={handleSubmitCommission(onSubmitCommission)} style={{ backgroundColor: COLORS.primary, borderRadius: 5, marginTop: 20 }}>
                                        <View style={{ padding: 6 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>Sửa</Text>
                                        </View>
                                    </TouchableOpacity>
                            }
                        </View>

                        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                            <Text style={{ fontSize: 18 }}>Phí giao hàng : </Text>
                            <Controller
                                control={controlShip}
                                rules={{
                                    required: true,
                                    min: 0,
                                    pattern: /[0-9]/g
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.txtNumber}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        underlineColorAndroid="transparent"
                                        placeholder="Nhập phần trăm giảm nếu có ( 1 - 99 )"
                                        placeholderTextColor="#888"
                                        keyboardType="numeric"
                                        multiline={true}
                                        value={value}
                                    />
                                )}
                                name="ship_price"
                                defaultValue={ship_price.ship_price.toString()}
                            />
                            {errorShip.ship_price && <Text style={styles.txtError}>* Phí giao hàng phai có</Text>}

                            {
                                isLoadShip ?
                                    <View style={{ backgroundColor: COLORS.primary, borderRadius: 5, marginTop: 20 }}>
                                        <ActivityIndicator size="large" color="#fff" />
                                    </View>
                                    :
                                    <TouchableOpacity onPress={handleSubmitShip(onSubmitShip)} style={{ backgroundColor: COLORS.primary, borderRadius: 5, marginTop: 20 }}>
                                        <View style={{ padding: 6 }}>
                                            <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>Sửa</Text>
                                        </View>
                                    </TouchableOpacity>
                            }

                        </View>
                    </>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    txtNumber: {
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        fontSize: 16
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
    txtError: {
        color: '#f86161'
    },
});