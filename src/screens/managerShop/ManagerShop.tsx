import React from 'react'
import { TouchableOpacity, View, StyleSheet, ScrollView, Text, Image } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SlugStrTitle } from '../../consts/Selector';

const shopList = [
    {
        shop_id: 1,
        shop_name: "Cansa-shop",
        shop_description: "shop này chuyên bán cần sa",
        shop_owner: 1,
        shop_avatar: "https://103.207.38.200:333/api/image/photo/1/e4611a028c71342a5b083d2cbf59c494",
        last_update: 0,
        status: 1
    },
    {
        shop_id: 2,
        shop_name: "Kush-shop",
        shop_description: "Deal Cam Kush các loại",
        shop_owner: 2,
        shop_avatar: "https://103.207.38.200:333/api/image/photo/2/e4611a028c71342a5b083d2cbf59c494",
        last_update: 0,
        status: 1
    }
]

export default function ManagerShop(props: any) {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <HeaderTitle title="Quản lí các shop" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <Text style={[styles.containerCenter, { fontWeight: 'bold', fontSize: 18, marginVertical: 10 }]}>Danh sách các shop</Text>
                {shopList?.length ?
                    shopList.map((item: any, index: number) =>
                        <TouchableOpacity key={index} style={{ backgroundColor: '#fff', marginBottom: 10 }}>

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
                                        <TouchableOpacity>
                                            <Text style={{ backgroundColor: "red", color: "#fff", borderRadius: 5, padding: 3 }}>Khoá shop</Text>
                                        </TouchableOpacity>
                                    </Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    ) :
                    <View></View>}


            </ScrollView>
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