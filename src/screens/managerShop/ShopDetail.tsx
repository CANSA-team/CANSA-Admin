import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-navigation'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import COLORS from '../../consts/Colors';
import { useNavigation } from './../../utils/useNavigation';
import { getProductsShop, ProductModel, ProductState, ShopModel, ShopState, State, updateStatusProduct } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { getShopInfo } from '../../redux/actions/shopActions';
import Product from '../../components/Product';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ShopDetail(props: any) {
    const [page, setPage] = useState<number>(1);
    const { navigate } = useNavigation();
    const { navigation } = props;
    const { getParam } = navigation;
    const shop_id = getParam('shop_id');
    const shopState: ShopState = useSelector((state: State) => state.shopReducer);
    const productState: ProductState = useSelector((state: State) => state.productReducer);
    const { productShop }: { productShop: ProductModel[] } = productState;
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { info }: { info: ShopModel } = shopState;
    const [_productShop, setProductShop] = useState<any>();

    useEffect(() => {
        dispatch(getShopInfo(shop_id, 1));
        dispatch(getProductsShop(shop_id, page));
    }, [])

    useEffect(() => {
        if (Object.keys(info).length && productShop?.length) {
            setProductShop(productShop);
            setIsLoading(false);
        }
    }, [info, productShop])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    useEffect(() => {
        dispatch(getProductsShop(shop_id, page));
    }, [page])

    const setStatusProduct = (product_id: number, status: number) => {
        setIsLoading(true);
        dispatch(updateStatusProduct(product_id, status, shop_id, page));
    }

    return (
        <View style={styles.containerTop}>
            <HeaderTitle title="Sản phẩm shop" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white"/>
                </TouchableOpacity>
            </View>

            {
                isLoading ?
                    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Image source={require('../../images/loader.gif')} />
                    </View>
                    :
                    <SafeAreaView style={styles.container}>
                        <View style={styles.accountContainer}>
                            <View>
                                <Image style={{
                                    width: 100, height: 100, borderRadius: 50, borderWidth: 2,
                                    borderColor: "#444",
                                }} source={{ uri: info.shop_avatar }} />
                            </View>
                            <View style={[styles.actionAccount, { flex: 1 }]}>
                                <Text style={styles.nameUser}>{info.shop_name}</Text>
                                <Text style={{ fontSize: 18, color: '#333' }}>{info.shop_description}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginTop: 30, backgroundColor: '#E5E5E5' }}>
                            <ScrollView

                                onScroll={({ nativeEvent }) => {
                                    if (isCloseToBottom(nativeEvent)) {
                                        setPage(page + 1);
                                    }
                                }}
                                scrollEventThrottle={400}
                            >
                                <View style={styles.productList}>
                                    {
                                        _productShop && _productShop.map((product: any, index: number) => <Product key={index} onTap={setStatusProduct} productInfo={product} />)

                                    }
                                </View>
                            </ScrollView>

                        </View>
                    </SafeAreaView>

            }
        </View>
    )
}
const styles = StyleSheet.create({
    containerTop: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    productList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
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
    headerIcon: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 50,
        padding: 5
    },
    detailContainer: {
        flex: 0.55,
        marginHorizontal: 7,
        borderRadius: 20,
        padding: 5,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111'
    },
    desc: {
        fontSize: 18,
        lineHeight: 25,
        color: '#111',
        padding: 2
    },
    btnBuy: {
        backgroundColor: '#00FF7F',
        padding: 7,
        width: 150,
        borderRadius: 20,
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '700',
        color: '#222'
    },
    accountContainer: {
        flexDirection: 'row',
        backgroundColor: '#E63538',
        padding: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    actionAccount: {
        marginLeft: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'flex-start'
    },
    nameUser: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 20,

    },
    inputAndroid: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 20
    },

});