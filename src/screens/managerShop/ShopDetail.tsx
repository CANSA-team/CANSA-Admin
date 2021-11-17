import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-navigation'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import COLORS from '../../consts/Colors';
import { useNavigation } from './../../utils/useNavigation';
import { ProductModel, ProductState, ShopModel, ShopState, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { getShopInfo } from '../../redux/actions/shopActions';
import RNPickerSelect from 'react-native-picker-select';
import Product from '../../components/Product';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const productShop = [
    {
        product_id: 53,
        product_date: "2021-11-09T11:12:33.000Z",
        shop_id: 1,
        product_avatar: "https://103.207.38.200:333/api/image/photo/157/e4611a028c71342a5b083d2cbf59c494",
        product_quantity: null,
        product_view: 2,
        product_price: 59000,
        product_sale: 0,
        product_title: "Áo Thun Nam AD05 Cotton Lạnh Tay Lỡ Form Rộng FULL SIZE Trắng Cá Mập SHACK TEAM (44-70KG)",
        product_image: [
            "https://103.207.38.200:333/api/image/photo/158/e4611a028c71342a5b083d2cbf59c494",
            "https://103.207.38.200:333/api/image/photo/159/e4611a028c71342a5b083d2cbf59c494"
        ],
        product_description: "Áo thun tay lỡ UNISEX_ Dành cho cả nam và nữ - Xuất xứ: Việt Nam - Chất liệu: thun Cotton MỀM- MỊN- MÁT, không mỏng, không xù lông, hình in shop sử dụng mực in dẻo KHÔNG BONG TRÓC, hàng đẹp thấm hút mồ hôi cực tốt, mềm mại cho làn da, cầm mát tay. THÔNG SỐ ÁO: - Size áo: FREESIZE form rộng - Chiều dài áo: 67cm - Chiều rộng áo: 53cm - Chiều dài tay áo: 26cm - Từ 45-65KG (mặc rộng thoải mái) - Từ 66-75KG (mặc rộng vừa).",
        last_update: 0,
        status: 1,
        product_image_id: [
            "158",
            "159"
        ],
        product_avatar_id: "157",
        product_rating: null,
        product_categories: [
            {
                label: "Áo thun nam",
                value: "8,9"
            }
        ]
    },
    {
        product_id: 55,
        product_date: "2021-11-09T11:12:33.000Z",
        shop_id: 1,
        product_avatar: "https://103.207.38.200:333/api/image/photo/163/e4611a028c71342a5b083d2cbf59c494",
        product_quantity: null,
        product_view: 3,
        product_price: 59000,
        product_sale: 0,
        product_title: "Áo thun unisex form rộng vải dày mịn cotton",
        product_image: [
            "https://103.207.38.200:333/api/image/photo/164/e4611a028c71342a5b083d2cbf59c494",
            "https://103.207.38.200:333/api/image/photo/165/e4611a028c71342a5b083d2cbf59c494"
        ],
        product_description: "Áo thun tay lỡ UNISEX_ Dành cho cả nam và nữ - Xuất xứ: Việt Nam - Chất liệu: thun Cotton MỀM- MỊN- MÁT, không mỏng, không xù lông, hình in shop sử dụng mực in dẻo KHÔNG BONG TRÓC, hàng đẹp thấm hút mồ hôi cực tốt, mềm mại cho làn da, cầm mát tay. THÔNG SỐ ÁO: - Size áo: FREESIZE form rộng - Chiều dài áo: 67cm - Chiều rộng áo: 53cm - Chiều dài tay áo: 26cm - Từ 45-65KG (mặc rộng thoải mái) - Từ 66-75KG (mặc rộng vừa).",
        last_update: 0,
        status: 1,
        product_image_id: [
            "164",
            "165"
        ],
        product_avatar_id: "163",
        product_rating: null,
        product_categories: [
            {
                label: "Áo thun nam",
                value: "8,9"
            }
        ]
    },
    {
        product_id: 57,
        product_date: "2021-11-09T11:12:33.000Z",
        shop_id: 1,
        product_avatar: "https://103.207.38.200:333/api/image/photo/169/e4611a028c71342a5b083d2cbf59c494",
        product_quantity: null,
        product_view: 1,
        product_price: 99000,
        product_sale: 0,
        product_title: "Áo thun cộc tay PoLo nam ,Áo phông Cộc Tay Cổ Bẻ,chất liệu cotton, kiểu dáng slimfit,mát mẻ",
        product_image: [
            "https://103.207.38.200:333/api/image/photo/170/e4611a028c71342a5b083d2cbf59c494",
            "https://103.207.38.200:333/api/image/photo/171/e4611a028c71342a5b083d2cbf59c494"
        ],
        product_description: "Áo thun tay lỡ UNISEX_ Dành cho cả nam và nữ - Xuất xứ: Việt Nam - Chất liệu: thun Cotton MỀM- MỊN- MÁT, không mỏng, không xù lông, hình in shop sử dụng mực in dẻo KHÔNG BONG TRÓC, hàng đẹp thấm hút mồ hôi cực tốt, mềm mại cho làn da, cầm mát tay. THÔNG SỐ ÁO: - Size áo: FREESIZE form rộng - Chiều dài áo: 67cm - Chiều rộng áo: 53cm - Chiều dài tay áo: 26cm - Từ 45-65KG (mặc rộng thoải mái) - Từ 66-75KG (mặc rộng vừa).",
        last_update: 0,
        status: 1,
        product_image_id: [
            "170",
            "171"
        ],
        product_avatar_id: "169",
        product_rating: null,
        product_categories: [
            {
                label: "Áo thun nam",
                value: "8,9"
            }
        ]
    },
    {
        product_id: 59,
        product_date: "2021-11-09T11:12:33.000Z",
        shop_id: 1,
        product_avatar: "https://103.207.38.200:333/api/image/photo/175/e4611a028c71342a5b083d2cbf59c494",
        product_quantity: null,
        product_view: 0,
        product_price: 35000,
        product_sale: 0,
        product_title: "Áo thun nam body giữ nhiệt dài tay cực đẹp màu đen",
        product_image: [
            "https://103.207.38.200:333/api/image/photo/176/e4611a028c71342a5b083d2cbf59c494",
            "https://103.207.38.200:333/api/image/photo/177/e4611a028c71342a5b083d2cbf59c494"
        ],
        product_description: "Áo thun tay lỡ UNISEX_ Dành cho cả nam và nữ - Xuất xứ: Việt Nam - Chất liệu: thun Cotton MỀM- MỊN- MÁT, không mỏng, không xù lông, hình in shop sử dụng mực in dẻo KHÔNG BONG TRÓC, hàng đẹp thấm hút mồ hôi cực tốt, mềm mại cho làn da, cầm mát tay. THÔNG SỐ ÁO: - Size áo: FREESIZE form rộng - Chiều dài áo: 67cm - Chiều rộng áo: 53cm - Chiều dài tay áo: 26cm - Từ 45-65KG (mặc rộng thoải mái) - Từ 66-75KG (mặc rộng vừa).",
        last_update: 0,
        status: 1,
        product_image_id: [
            "176",
            "177"
        ],
        product_avatar_id: "175",
        product_rating: null,
        product_categories: [
            {
                label: "Áo thun nam",
                value: "8,9"
            }
        ]
    },
    {
        product_id: 61,
        product_date: "2021-11-09T11:12:33.000Z",
        shop_id: 1,
        product_avatar: "https://103.207.38.200:333/api/image/photo/181/e4611a028c71342a5b083d2cbf59c494",
        product_quantity: null,
        product_view: 0,
        product_price: 88400,
        product_sale: 0,
        product_title: "Áo thun cổ tròn nam cộc tay, chất nhẹ êm, thoáng mát, thấm hút mồ hôi, dáng body cực ôm, cực chuẩn-Hatino.store",
        product_image: [
            "https://103.207.38.200:333/api/image/photo/182/e4611a028c71342a5b083d2cbf59c494",
            "https://103.207.38.200:333/api/image/photo/183/e4611a028c71342a5b083d2cbf59c494"
        ],
        product_description: "Áo thun tay lỡ UNISEX_ Dành cho cả nam và nữ - Xuất xứ: Việt Nam - Chất liệu: thun Cotton MỀM- MỊN- MÁT, không mỏng, không xù lông, hình in shop sử dụng mực in dẻo KHÔNG BONG TRÓC, hàng đẹp thấm hút mồ hôi cực tốt, mềm mại cho làn da, cầm mát tay. THÔNG SỐ ÁO: - Size áo: FREESIZE form rộng - Chiều dài áo: 67cm - Chiều rộng áo: 53cm - Chiều dài tay áo: 26cm - Từ 45-65KG (mặc rộng thoải mái) - Từ 66-75KG (mặc rộng vừa).",
        last_update: 0,
        status: 1,
        product_image_id: [
            "182",
            "183"
        ],
        product_avatar_id: "181",
        product_rating: null,
        product_categories: [
            {
                label: "Áo thun nam",
                value: "8,9"
            }
        ]
    },
    {
        product_id: 63,
        product_date: "2021-11-09T11:12:33.000Z",
        shop_id: 1,
        product_avatar: "https://103.207.38.200:333/api/image/photo/187/e4611a028c71342a5b083d2cbf59c494",
        product_quantity: null,
        product_view: 0,
        product_price: 115000,
        product_sale: 0,
        product_title: "PHẢN QUANG TỐT- Áo Thun Phản Quang SWE form rộng unisex chất Cotton cao cấp freesize cho nam và nữ- PQ32 .",
        product_image: [
            "https://103.207.38.200:333/api/image/photo/188/e4611a028c71342a5b083d2cbf59c494",
            "https://103.207.38.200:333/api/image/photo/189/e4611a028c71342a5b083d2cbf59c494"
        ],
        product_description: "Áo thun tay lỡ UNISEX_ Dành cho cả nam và nữ - Xuất xứ: Việt Nam - Chất liệu: thun Cotton MỀM- MỊN- MÁT, không mỏng, không xù lông, hình in shop sử dụng mực in dẻo KHÔNG BONG TRÓC, hàng đẹp thấm hút mồ hôi cực tốt, mềm mại cho làn da, cầm mát tay. THÔNG SỐ ÁO: - Size áo: FREESIZE form rộng - Chiều dài áo: 67cm - Chiều rộng áo: 53cm - Chiều dài tay áo: 26cm - Từ 45-65KG (mặc rộng thoải mái) - Từ 66-75KG (mặc rộng vừa).",
        last_update: 0,
        status: 1,
        product_image_id: [
            "188",
            "189"
        ],
        product_avatar_id: "187",
        product_rating: null,
        product_categories: [
            {
                label: "Áo thun nam",
                value: "8,9"
            }
        ]
    },
    {
        product_id: 65,
        product_date: "2021-11-09T11:12:33.000Z",
        shop_id: 1,
        product_avatar: "https://103.207.38.200:333/api/image/photo/193/e4611a028c71342a5b083d2cbf59c494",
        product_quantity: null,
        product_view: 0,
        product_price: 40000,
        product_sale: 0,
        product_title: "Áo THUN Giữ Nhiệt Nam Cổ Cao",
        product_image: [
            "https://103.207.38.200:333/api/image/photo/194/e4611a028c71342a5b083d2cbf59c494",
            "https://103.207.38.200:333/api/image/photo/195/e4611a028c71342a5b083d2cbf59c494"
        ],
        product_description: "Áo thun tay lỡ UNISEX_ Dành cho cả nam và nữ - Xuất xứ: Việt Nam - Chất liệu: thun Cotton MỀM- MỊN- MÁT, không mỏng, không xù lông, hình in shop sử dụng mực in dẻo KHÔNG BONG TRÓC, hàng đẹp thấm hút mồ hôi cực tốt, mềm mại cho làn da, cầm mát tay. THÔNG SỐ ÁO: - Size áo: FREESIZE form rộng - Chiều dài áo: 67cm - Chiều rộng áo: 53cm - Chiều dài tay áo: 26cm - Từ 45-65KG (mặc rộng thoải mái) - Từ 66-75KG (mặc rộng vừa).",
        last_update: 0,
        status: 1,
        product_image_id: [
            "194",
            "195"
        ],
        product_avatar_id: "193",
        product_rating: null,
        product_categories: [
            {
                label: "Áo thun nam",
                value: "8,9"
            }
        ]
    },
    {
        product_id: 67,
        product_date: "2021-11-09T11:12:33.000Z",
        shop_id: 1,
        product_avatar: "https://103.207.38.200:333/api/image/photo/199/e4611a028c71342a5b083d2cbf59c494",
        product_quantity: null,
        product_view: 0,
        product_price: 75000,
        product_sale: 0,
        product_title: "[Mã MAHM12 hoàn 15% đơn 99K tối đa 50K xu] Áo Thun Tay Dài - Nam Nữ Long Tee Unisex Phong Cách Hàn Quốc Chất Cao Cấp",
        product_image: [
            "https://103.207.38.200:333/api/image/photo/200/e4611a028c71342a5b083d2cbf59c494",
            "https://103.207.38.200:333/api/image/photo/201/e4611a028c71342a5b083d2cbf59c494"
        ],
        product_description: "Áo thun tay lỡ UNISEX_ Dành cho cả nam và nữ - Xuất xứ: Việt Nam - Chất liệu: thun Cotton MỀM- MỊN- MÁT, không mỏng, không xù lông, hình in shop sử dụng mực in dẻo KHÔNG BONG TRÓC, hàng đẹp thấm hút mồ hôi cực tốt, mềm mại cho làn da, cầm mát tay. THÔNG SỐ ÁO: - Size áo: FREESIZE form rộng - Chiều dài áo: 67cm - Chiều rộng áo: 53cm - Chiều dài tay áo: 26cm - Từ 45-65KG (mặc rộng thoải mái) - Từ 66-75KG (mặc rộng vừa).",
        last_update: 0,
        status: 1,
        product_image_id: [
            "200",
            "201"
        ],
        product_avatar_id: "199",
        product_rating: null,
        product_categories: [
            {
                label: "Áo thun nam",
                value: "8,9"
            }
        ]
    },
    {
        product_id: 68,
        product_date: "2021-11-09T11:12:33.000Z",
        shop_id: 1,
        product_avatar: "https://103.207.38.200:333/api/image/photo/202/e4611a028c71342a5b083d2cbf59c494",
        product_quantity: null,
        product_view: 0,
        product_price: 68000,
        product_sale: 0,
        product_title: "Áo thun nam nữ tay lỡ YINXX, áo phông form rộng ATL193",
        product_image: [
            "https://103.207.38.200:333/api/image/photo/203/e4611a028c71342a5b083d2cbf59c494",
            "https://103.207.38.200:333/api/image/photo/204/e4611a028c71342a5b083d2cbf59c494"
        ],
        product_description: "Áo thun tay lỡ UNISEX_ Dành cho cả nam và nữ - Xuất xứ: Việt Nam - Chất liệu: thun Cotton MỀM- MỊN- MÁT, không mỏng, không xù lông, hình in shop sử dụng mực in dẻo KHÔNG BONG TRÓC, hàng đẹp thấm hút mồ hôi cực tốt, mềm mại cho làn da, cầm mát tay. THÔNG SỐ ÁO: - Size áo: FREESIZE form rộng - Chiều dài áo: 67cm - Chiều rộng áo: 53cm - Chiều dài tay áo: 26cm - Từ 45-65KG (mặc rộng thoải mái) - Từ 66-75KG (mặc rộng vừa).",
        last_update: 0,
        status: 1,
        product_image_id: [
            "203",
            "204"
        ],
        product_avatar_id: "202",
        product_rating: null,
        product_categories: [
            {
                label: "Áo thun nam",
                value: "8,9"
            }
        ]
    },
    {
        product_id: 70,
        product_date: "2021-11-09T11:12:33.000Z",
        shop_id: 1,
        product_avatar: "https://103.207.38.200:333/api/image/photo/208/e4611a028c71342a5b083d2cbf59c494",
        product_quantity: null,
        product_view: 0,
        product_price: 9900,
        product_sale: 0,
        product_title: "Áo Thun Nam Nữ Cotton - Trơn Cổ Tròn vải mịn mát BM02 (nhiều màu)",
        product_image: [
            "https://103.207.38.200:333/api/image/photo/209/e4611a028c71342a5b083d2cbf59c494",
            "https://103.207.38.200:333/api/image/photo/210/e4611a028c71342a5b083d2cbf59c494"
        ],
        product_description: "Áo thun tay lỡ UNISEX_ Dành cho cả nam và nữ - Xuất xứ: Việt Nam - Chất liệu: thun Cotton MỀM- MỊN- MÁT, không mỏng, không xù lông, hình in shop sử dụng mực in dẻo KHÔNG BONG TRÓC, hàng đẹp thấm hút mồ hôi cực tốt, mềm mại cho làn da, cầm mát tay. THÔNG SỐ ÁO: - Size áo: FREESIZE form rộng - Chiều dài áo: 67cm - Chiều rộng áo: 53cm - Chiều dài tay áo: 26cm - Từ 45-65KG (mặc rộng thoải mái) - Từ 66-75KG (mặc rộng vừa).",
        last_update: 0,
        status: 1,
        product_image_id: [
            "209",
            "210"
        ],
        product_avatar_id: "208",
        product_rating: null,
        product_categories: [
            {
                label: "Áo thun nam",
                value: "8,9"
            }
        ]
    }
]

export default function ShopDetail(props: any) {
    const [page, setPage] = useState<number>(1);
    const { navigate } = useNavigation();
    const { navigation } = props;
    const { getParam } = navigation;
    const shop_id = getParam('shop_id');
    const shopState: ShopState = useSelector((state: State) => state.shopReducer);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { info }: { info: ShopModel } = shopState;
    const [_productShop, setProductShop] = useState<any>();

    useEffect(() => {
        dispatch(getShopInfo(shop_id, 1));
    }, [])

    useEffect(() => {
        if (Object.keys(info).length) {
            setProductShop(productShop);
            setIsLoading(false);
        }
    }, [info])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    // useEffect(() => {
    //     dispatch(getProductsShop(shop_id, page));
    // }, [page])

    return (
        <View style={styles.containerTop}>
            <HeaderTitle title="Sản phẩm shop" />
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
                                        _productShop && _productShop.map((product: any, index: number) => <Product key={index} productInfo={product} />)

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