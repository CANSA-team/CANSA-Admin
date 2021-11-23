import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, StyleSheet, ScrollView, Text, Image, Alert } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SlugStrTitle } from '../../consts/Selector';
import { useDispatch, useSelector } from 'react-redux';
import { getShopList, ShopModel, ShopState, State } from '../../redux';
import { useNavigation } from '../../utils/useNavigation';

export default function ManagerShop(props: any) {
    const { navigation } = props;
    const { navigate } = useNavigation();
    const shopState: ShopState = useSelector((state: State) => state.shopReducer);
    const { shopList }: { shopList: ShopModel[] } = shopState;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadMore, setIsLoadMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShopList());
    }, [])

    useEffect(() => {
        if (shopList?.length) {
            setIsLoadMore(false);
            setIsLoading(false);
        }
    }, [shopList])

    useEffect(() => {
        setIsLoadMore(true);
        dispatch(getShopList(page));
    }, [page])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const isStatus = (status: number, id: number) => {
        const messenger = status ? "Xác nhận mở khoá shop?" : "Xác nhận khoá shop?"
        Alert.alert(
            "Thông báo!",
            messenger,
            [
                { text: "Xác nhận", onPress: () => console.log(status) },
                { text: "Huỷ" }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <HeaderTitle title="Quản lí các shop" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            {
                isLoading ?
                    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Image source={require('../../images/loader.gif')} />
                    </View>
                    :
                    <ScrollView
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                setPage(page + 1);
                            }
                        }}
                        scrollEventThrottle={400}
                    >
                        <Text style={[styles.containerCenter, { fontWeight: 'bold', fontSize: 18, marginVertical: 10 }]}>Danh sách các shop</Text>
                        {shopList?.length &&
                            shopList.map((item: ShopModel, index: number) =>
                                <TouchableOpacity onPress={() => navigate('ShopDetail', { shop_id: item.shop_id })} key={index} style={{ backgroundColor: '#fff', marginBottom: 10 }}>

                                    <View style={[styles.containerCenter, { marginTop: 10, marginBottom: 10 }]}>
                                        <Image source={{ uri: item.shop_avatar }} style={{ width: 80, height: 80 }}></Image>
                                        <View style={styles.textView}>
                                            <View style={{ marginRight: 20 }}>
                                                <Text style={{ fontWeight: 'bold' }} >{item.shop_name}</Text>
                                            </View>

                                            <View style={{ marginRight: 20 }}>
                                                <Text>{SlugStrTitle(item.shop_description, 50)}</Text>
                                            </View>


                                            <Text style={{ marginTop: 10 }}>
                                                {item.status ?
                                                    <TouchableOpacity onPress={() => isStatus(0, item.shop_id)}>
                                                        <Text style={{ backgroundColor: "red", color: "#fff", borderRadius: 5, padding: 3 }}>Khoá shop</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity onPress={() => isStatus(1, item.shop_id)}>
                                                        <Text style={{ backgroundColor: "red", color: "#fff", borderRadius: 5, padding: 3 }}>Mở khoá shop</Text>
                                                    </TouchableOpacity>
                                                }

                                            </Text>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}

                        {isLoadMore &&
                            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                                <Image source={require('../../images/loader.gif')} />
                            </View>}
                    </ScrollView>
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    containerCenter: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },

    textView: {
        marginHorizontal: 10,
        flex: 1
    },
});