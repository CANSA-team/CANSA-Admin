import moment from 'moment';
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import COLORS from '../consts/Colors';
import { State } from '../redux';
import { useNavigation } from '../utils/useNavigation';
import { SlugStr } from './../consts/Selector';
import { OrderModel, UserStage, UserModel } from './../redux/models/index';

interface ProductOrdereProps {
    oder: OrderModel;
    changeStatusOrder: Function
}

export default function ProductOrdered(props: any) {
    const { oder, changeStatusOrder }: ProductOrdereProps = props;
    const { navigate } = useNavigation();
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { userInfor }: { userInfor: UserModel } = userState;

    const OderStatus = [
        <>

        </>,
        <TouchableOpacity onPress={() => changeStatusOrder(2, oder.oder_id)} style={styles.statusPending}>
            <Text style={styles.txtStatus}>Nhận hàng</Text>
        </TouchableOpacity>,
        userInfor.user_permission === 3 ?
            <TouchableOpacity onPress={() => changeStatusOrder(3, oder.oder_id)} style={styles.statusPending}>
                <Text style={styles.txtStatus}>Giao ship</Text>
            </TouchableOpacity> :
            <View style={styles.statusPending}>
                <Text style={styles.txtStatus}>Đã nhận</Text>
            </View>,
        userInfor.user_permission === 3 ?
            <View style={styles.statusPending}>
                <Text style={styles.txtStatus}>Đã giao ship</Text>
            </View> :
            <TouchableOpacity onPress={() => changeStatusOrder(4, oder.oder_id)} style={styles.statusPending}>
                <Text style={styles.txtStatus}>Giao hàng</Text>
            </TouchableOpacity>,
        <View style={styles.statusAccept}>
            <Text style={styles.txtStatus}>Đã giao hàng</Text>
        </View>
    ]

    const onTap = () => {
        navigate('OderDetail', { oder: oder })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onTap()}>
                <View style={styles.productContainer}>
                    <View style={styles.productDetal}>
                        <Text style={styles.productName}>Mã đơn hàng: {SlugStr(oder.oder_id.toString(), 60)}</Text>
                    </View>
                    <View style={styles.productDetal}>
                        <Text style={styles.productName}>Ngày đặt hàng: {moment.utc(oder.oder_date).format('DD/MM/YYYY')}</Text>
                    </View>
                    <Text style={{ color: 'gray', fontSize: 18 }}>Trạng thái :</Text>
                    {
                        OderStatus[oder.status]
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 3,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 2
    },
    img: {
        flex: 1,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 1
    },
    productContainer: {
        flex: 2,
        flexDirection: 'column',
        marginLeft: 10
    },
    productDetal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3
    },
    productName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333'
    },
    statusPending: {
        marginTop: 8,
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 10
    },
    statusDes: {
        marginTop: 8,
        backgroundColor: '#dc3545',
        padding: 8,
        borderRadius: 10
    },
    statusAccept: {
        marginTop: 8,
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 10
    },
    txtStatus: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});