import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import COLORS from '../consts/Colors';
import { SlugStr, vnd } from '../consts/Selector';
import { ProductModel, State, UserStage } from '../redux';
import { useNavigation } from '../utils/useNavigation';

export default function OderCard(props: any) {
    const product: ProductModel = props.product;
    const { qty, order_id, oderStatus, status, changeStatusPro } = props;
    const { navigate } = useNavigation();

    const OderStatus = [
        <>

        </>,
        <TouchableOpacity onPress={() => changeStatusPro(2, product.product_id, order_id)} style={styles.statusPending}>
            <Text style={styles.txtStatus}>Nhận hàng</Text>
        </TouchableOpacity>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đã nhận</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Giao hàng</Text>
        </View>,
        <View style={styles.statusAccept}>
            <Text style={styles.txtStatus}>Đã giao hàng</Text>
        </View>
    ]
    return (
        <View style={styles.container}>
            {
                OderStatus[status]
            }
            <View style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <View style={{ flex: 1 }}>
                    <Image style={styles.img} source={{ uri: product.product_avatar }} />
                </View>
                <View style={styles.productContainer}>
                    <View style={styles.productDetal}>
                        <Text style={styles.productName}>{product && SlugStr(product.product_title, 22)}</Text>
                    </View>
                    <View style={styles.productPrice}>
                        <Text style={{ fontSize: 16 }}>Số lượng : {qty}</Text>
                        <Text style={{ color: '#222', fontSize: 20 }}>{vnd((product.product_price * (100 - product.product_sale) / 100) * qty)}đ</Text>
                    </View>
                </View>
            </View>
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
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 1
    },
    statusAccept: {
        marginTop: 8,
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 8,
        borderRadius: 10
    },
    statusPending: {
        marginTop: 8,
        padding: 8,
        borderRadius: 10,
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 1,
        marginBottom: 10
    },
    btnReport: {
        backgroundColor: 'red',
        padding: 7,
        width: 150,
        borderRadius: 20,
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '700',
        color: '#fff'
    },
    img: {
        flex: 1,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 1,
        width: 100,
        height: 100
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
        marginBottom: 8
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222'
    },
    iconDelete: {
        backgroundColor: COLORS.primary,
        padding: 5,
        borderRadius: 8
    },
    productPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8
    },
    txtStatus: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});