import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import COLORS from '../../consts/Colors';
import { SafeAreaView } from 'react-navigation';
import HeaderTitle from '../../components/HeaderTitle';
import { useDispatch, useSelector } from 'react-redux';
import { vnd } from '../../consts/Selector';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AdminState, OrderModel, OrderState, ShipModel, State, updateStatusOder, updateStatusOrder, UserStage } from '../../redux';
import OderCard from '../../components/OderCard';
import { useNavigation } from '../../utils/useNavigation';

export default function OderDetail(props: any) {
    const { navigate } = useNavigation();
    const { navigation } = props;
    const { getParam } = navigation;
    const [_oder, setOder] = useState<OrderModel>(getParam('oder'));
    const [check, setCheck] = useState(false)
    const [changesStatus, setChangeStatus] = useState(false)
    const dispatch = useDispatch();
    const orderState: OrderState = useSelector((state: State) => state.orderReducer);
    const { order, orderList }: { order: OrderModel, orderList: OrderModel[] } = orderState;
    const adminSate: AdminState = useSelector((state: State) => state.adminReducer);
    const { ship_price }: { ship_price: ShipModel } = adminSate;
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { dataLogin }: { dataLogin: any } = userState;
    let sub_price = 0;
    let total_price = 0;

    const changeStatusPro = (status: number, idPro: number, idOrder: number) => {
        Alert.alert(
            "Thông báo!",
            'Xác nhận thay đổi trạng thái ',
            [
                { text: "Xác nhận", onPress: () => dispatch(updateStatusOder(idOrder, idPro, status)) },
                { text: "Huỷ" }
            ]
        );
    }

    const changeStatusOrder = (status: number, idOrder: number) => {
        Alert.alert(
            "Thông báo!",
            'Xác nhận thay đổi trạng thái ',
            [
                { text: "Xác nhận", onPress: () => { dispatch(updateStatusOrder(idOrder, status)); setChangeStatus(true); } },
                { text: "Huỷ" }
            ]
        );
    }

    useEffect(() => {
        if (order && check) {
            setOder(order);
            setCheck(false);
        }
        if (orderList?.length && changesStatus) {
            setChangeStatus(false);
            navigate('Ordered')
        }
    }, [orderState])

    if (_oder) for (const item of _oder.product_oder) {
        if (item.status) {
            sub_price += (item.product.product_price * (100 - item.product.product_sale) / 100) * item.product_quantity;
        }
    }

    total_price = sub_price + ship_price.ship_price;

    const oderStatus = [
        <></>,
        <TouchableOpacity style={styles.statusPending} onPress={() => changeStatusOrder(2, _oder.oder_id)}>
            <Text style={styles.txtStatus}>Nhận hàng</Text>
        </TouchableOpacity>,
        dataLogin.permission_id === 3 ?
            <TouchableOpacity style={styles.statusPending} onPress={() => changeStatusOrder(3, _oder.oder_id)}>
                <Text style={styles.txtStatus}>Giao ship</Text>
            </TouchableOpacity> :
            <View style={styles.statusPending}>
                <Text style={styles.txtStatus}>Đã nhận</Text>
            </View>,
        dataLogin.permission_id === 3 ?
            <View style={styles.statusPending}>
                <Text style={styles.txtStatus}>Đã giao ship</Text>
            </View> :
            <TouchableOpacity onPress={() => changeStatusOrder(4, _oder.oder_id)} style={styles.statusPending}>
                <Text style={styles.txtStatus}>Giao hàng</Text>
            </TouchableOpacity>,
        <View style={styles.statusAccept}>
            <Text style={styles.txtStatus}>Đã giao hàng</Text>
        </View>
    ]
    const changeStatus = (product_id: number) => {

        Alert.alert(
            "Thông báo",
            "Hủy đơn hàng ?",
            [
                { text: "Cancel" },
                { text: "Yes", onPress: () => console.log('asas') },
            ]
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <HeaderTitle title={`Mã đơn hàng: ${_oder.oder_id}`} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons style={styles.headerIcon} name="arrow-back" size={28} color="white"/>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, marginBottom: 10 }}>
                        <ScrollView>
                            {
                                _oder && _oder.product_oder.map((cart: any, index: number) => {
                                    return (
                                        <View key={index} >
                                            <OderCard order_id={_oder.oder_id} changeStatusPro={changeStatusPro} qty={cart.product_quantity} product={cart.product} oderStatus={cart.status} status={_oder.status} onTap={changeStatus} />
                                        </View>)
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.bill}>
                        <View>
                            <Text style={{ fontSize: 22,fontWeight:'bold',color:'#111' }}>Tên người nhận:</Text>
                            <Text style={{ fontSize: 20,color:'#111' }}>{_oder && _oder.oder_customer.user_full_name}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 22,fontWeight:'bold',color:'#111' }}>Địa chỉ:</Text>
                            <Text style={{ fontSize: 20,color:'#111' }}>{_oder && _oder.oder_address}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 22,fontWeight:'bold',color:'#111' }}>Số điện thoại:</Text>
                            <Text style={{ fontSize: 20,color:'#111' }}>{_oder && _oder.oder_phone}</Text>
                        </View>
                        
                        <Text style={styles.txtTotal}>Chi phí</Text>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={[styles.priceTitle, { fontSize: 20 }]}>Tổng tiền :</Text>
                            <Text style={[styles.priceTitle, { fontSize: 20 }]}>{vnd(sub_price)}đ</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', borderBottomColor: 'gray', borderBottomWidth: 1, paddingBottom: 5 }}>
                            <Text style={[styles.priceTitle, { fontSize: 20 }]}>Tiền ship :</Text>
                            <Text style={[styles.priceTitle, { fontSize: 20 }]}>{vnd(ship_price.ship_price)}đ</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={[styles.priceTitle, { fontSize: 22 }]}>Thành tiền :</Text>
                            <Text style={[styles.priceTitle, { fontSize: 22 }]}>{vnd(total_price)}đ</Text>
                        </View>
                    </View>
                    {
                        oderStatus[_oder.status]
                    }
                </ScrollView>
            </View >

        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 33,
        left: 0,
        right: 0,
        zIndex: 2
    },
    headerIcon: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 50,
        padding: 5
    },
    bill: {
        flexDirection: 'column',
        margin: 10,
        backgroundColor: '#E5E5E5',
        padding: 15,
        borderRadius: 15,
    },
    priceTitle: {
        color: '#111'
    },
    statusPending: {
        marginTop: 8,
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 10,
        margin: 10
    },
    statusDes: {
        marginTop: 8,
        backgroundColor: '#dc3545',
        padding: 8,
        borderRadius: 10,
        margin: 10
    },
    statusAccept: {
        marginTop: 8,
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 10,
        margin: 10
    },
    txtStatus: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    txtTotal: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left',
        color:'#111'
    },
    btnCheckOut: {
        marginTop: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        padding: 10
    }
});
