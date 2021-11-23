import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderBar from '../components/HeaderBar';
import Menu from '../components/Menu';
import COLORS from '../consts/Colors';
import { AccessModel, AdminState, getAccess, State } from '../redux';
import { useNavigation } from '../utils/useNavigation';


export default function Home() {
    const { navigate } = useNavigation();
    const adminSate: AdminState = useSelector((state: State) => state.adminReducer);
    const { access_list }: { access_list: AccessModel[] } = adminSate;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAccess());
    }, [])

    useEffect(() => {
        if (access_list?.length) {
            setIsLoading(false);
        }
    }, [access_list])

    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Image source={require('../images/loader.gif')} />
                    </View>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <HeaderBar />
                        <View style={styles.viewShop}>
                            <View style={{ flex: 1 }}>
                                <Image style={styles.imgShop} source={{ uri: 'https://www.elleman.vn/wp-content/uploads/2020/06/03/179235/cover-logo-thuong-hieu-elle-man-0620-logoworks.png' }} />
                            </View>
                            <View style={styles.shopContainer}>
                                <Text style={{ fontSize: 20, color: "#222", fontWeight: 'bold' }}>Quản lí các hoạt động của App</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Text style={{ fontSize: 14 }}>Lượng truy cập app : </Text>
                                    <Text style={{ fontSize: 14 }}>{access_list[0].access_times} lượt truy cập tháng {access_list[0].month}/{access_list[0].year} </Text>
                                </View>
                            </View>

                        </View>
                        <Text style={styles.txtAction}>Actions :</Text>
                        <View style={styles.menuList}>
                            <Menu onTab={() => navigate('ManagerApp')} icon="sync" title="Quản lý App" description="Quản lý thông tin phí giao hàng, phần trăm hoa hồng" />
                            <Menu onTab={() => navigate('CategoryList')} icon="appstore-o" title="Quản lý danh mục" description="Quản lý các danh mục của app tại đây" />
                            <Menu onTab={() => navigate('ManagerSlider')} icon="picture" title="Quản lý slide" description="Quản lý slider của app" />
                            <Menu onTab={() => navigate('ManagerShop')} icon="isv" title="Quản lý các shop" description="Quản lý những người bán hàng" />
                            <Menu onTab={() => navigate('ManagerUser')} icon="team" title="Quản lý người dùng" description="Quản lý những người người dùng app" />
                            <Menu onTab={() => navigate('ManagerRevenue')} icon="barschart" title="Quản lý doanh thu" description="Quản lý doanh thu của app" />
                            <Menu onTab={() => navigate('Ordered')} icon="inbox" title="Quản lí order" description="Quản lí các sản phẩm người dùng đã đặt" />
                            <Menu icon="notification" title="Thông báo" description="Thông báo tới các shop" />
                            <Menu onTab={() => navigate('ManagerReport')} icon="warning" title="Quản lý report" description="Quản lý các report của khách hàng" />
                        </View>
                    </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: '#fff',
    },
    menuList: {
        flex: 1,
        marginHorizontal: 15,
        marginBottom: 15
    },
    shopContainer: {
        flex: 2,
        marginLeft: 10,
        justifyContent: 'center',
    },
    viewShop: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgShop: {
        width: 120,
        height: 120,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    txtContact: {
        fontSize: 20,
        color: "#222",
        marginLeft: 5,
        flexWrap: 'wrap'
    },
    txtAction: {
        color: COLORS.primary,
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 15,
        marginLeft: 10,
    }
});