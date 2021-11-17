import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, StyleSheet, ScrollView, Text, Image } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AdminState, ComplaintModel, getComplaint, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';

export default function ManagerReport(props: any) {
    const { navigation } = props;
    const adminSate: AdminState = useSelector((state: State) => state.adminReducer);
    const { complantList }: { complantList: ComplaintModel[] } = adminSate;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComplaint());
    }, [])

    useEffect(() => {
        if (complantList?.length) {
            setIsLoading(false);
        }
    }, [complantList])

    return (
        <View style={styles.container}>
            <HeaderTitle title="Quản lí báo cáo" />
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
                    <ScrollView>
                        {complantList.length ?
                            complantList.map((item: any, index: number) =>
                                <View key={index} style={{ backgroundColor: '#fff', marginBottom: 10 }}>
                                    <View style={[styles.containerCenter, { marginTop: 10 }]}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.shop_info.shop_name}</Text>
                                    </View>
                                    <View style={[styles.containerCenter, { marginTop: 20, marginBottom: 5 }]}>
                                        <Image source={{ uri: item.product_avatar }} style={{ width: 80, height: 80 }}></Image>
                                        <View style={styles.textView}>
                                            <View style={{ marginRight: 20 }}>
                                                <Text style={{ fontWeight: 'bold' }} >{item.product_title}</Text>
                                            </View>
                                            <View style={{ marginTop: 10, marginRight: 20 }}>
                                                <Text>{item.product_price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.containerCenter, { marginTop: 10 }]}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Nội dung báo cáo</Text>
                                    </View>
                                    <View style={[styles.containerCenter, { marginTop: 10, marginBottom: 10 }]}>
                                        <Text>{item.complaint_content}</Text>
                                    </View>
                                </View>
                            ) : <View></View>}

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