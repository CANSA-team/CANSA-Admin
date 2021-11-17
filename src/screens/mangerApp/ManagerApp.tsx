import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../components/HeaderTitle';
import { Controller,useForm } from 'react-hook-form';
import COLORS from '../../consts/Colors';

export default function ManagerApp(props:any) {
    const { navigation } = props;
    const { control:controlCommission ,formState: { errors : errorCommission },handleSubmit: handleSubmitCommission, } = useForm({ mode: "onBlur"});
    const { control:controlShip ,formState: { errors: errorShip },  handleSubmit: handleSubmitShip,} = useForm({ mode: "onBlur",});
    const ship_price = 0;
    const commission_rate = 0;

    //Xu ly hoa hong
    const onSubmitCommission = (data: any) =>{
        Alert.alert(
            "Thông báo!",
            'Xác nhận sửa',
            [
                { text: "Xác nhận",onPress:() => console.log(data) },
                { text: "Huỷ" }
            ]
        );
    }

    //Xu ly ship
    const onSubmitShip = (data: any) =>{
        Alert.alert(
            "Thông báo!",
            'Xác nhận sửa',
            [
                { text: "Xác nhận",onPress:() => console.log(data) },
                { text: "Huỷ" }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <HeaderTitle title="Quản lí App" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:20,marginTop:20}}>
                <Text style={{fontSize:18}}>Tỉ lệ hoa hồng : </Text>
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
                    defaultValue={commission_rate.toString()}
                />
                {errorCommission.commission && <Text style={styles.txtError}>* Hoa hồng từ 0 - 99</Text>}

                <TouchableOpacity onPress={handleSubmitCommission(onSubmitCommission)} style={{backgroundColor:COLORS.primary,borderRadius:5,marginTop:20}}>
                    <View style={{padding:6}}>
                        <Text style={{textAlign:'center',fontSize:18,color:'#fff'}}>Gửi</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{marginHorizontal:20,marginTop:30}}>
                <Text style={{fontSize:18}}>Phí giao hàng : </Text>
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
                    defaultValue={ship_price.toString()}
                />
                {errorShip.ship_price && <Text style={styles.txtError}>* Phí giao hàng phai có</Text>}

                <TouchableOpacity onPress={handleSubmitShip(onSubmitShip)} style={{backgroundColor:COLORS.primary,borderRadius:5,marginTop:20}}>
                    <View style={{padding:8}}>
                        <Text style={{textAlign:'center',fontSize:18,color:'#fff'}}>Gửi</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    txtNumber:{
        paddingTop:5,
        paddingBottom:5,
        borderBottomColor:'gray',
        borderBottomWidth:1,
        fontSize:16
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