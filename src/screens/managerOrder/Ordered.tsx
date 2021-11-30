import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { AdminState, getOders, OrderModel, OrderState, ShipModel, State, updateStatusOrder, UserStage } from '../../redux';
import ProductOrdered from '../../components/ProductOrdered';

export default function Ordered(props: any) {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const orderState: OrderState = useSelector((state: State) => state.orderReducer);
    const [isLoadMore, setisLoadMore] = useState(false)
    const { orderList }: { orderList: OrderModel[] } = orderState;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOders(page))
    }, [])

    useEffect(() => {
        if (orderList?.length) {
            setIsLoading(false);
        }
    }, [orderList])

    useEffect(() => {
        dispatch(getOders(page))
    }, [page])

    const changeStatusOrder = (status: number, idOrder: number) => {
        Alert.alert(
            "Thông báo!",
            'Xác nhận thay đổi trạng thái ',
            [
                { text: "Xác nhận", onPress: () => dispatch(updateStatusOrder(idOrder, status)) },
                { text: "Huỷ" }
            ]
        );
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <View style={styles.container}>
            <HeaderTitle title="Đơn hàng" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white"/>
                </TouchableOpacity>
            </View>
            {
                isLoading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../images/loader.gif')} />
                    </View>
                    :
                    <ScrollView
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                setPage(page + 1);
                                setisLoadMore(true);
                            }
                        }}
                        scrollEventThrottle={400}
                        style={{ flex: 1, marginTop: 5 }}
                        showsVerticalScrollIndicator={false}>
                        {
                            orderList && orderList.map((oder: OrderModel, index: number) => {
                                if (oder.status !== 0) {
                                    return (
                                        <View key={index}>
                                            <ProductOrdered changeStatusOrder={changeStatusOrder} oder={oder} />
                                        </View>
                                    )
                                }
                            })
                        }
                        {
                            isLoadMore &&
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#00ff00" />
                            </View>
                        }
                    </ScrollView>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 33,
        left: 5,
        right: 0,
        zIndex: 2
    },

});
