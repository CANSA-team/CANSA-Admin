import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Pagination from "@mui/material/Pagination";
import COLORS from '../../consts/Colors';


const userList = [
    {
        user_id: 1,
        user_key: "3",
        user_name: "Natswar",
        user_avatar: "426",
        last_update: 1,
        status: 1
    },
    {
        user_id: 2,
        user_key: null,
        user_name: "WhiteKing",
        user_avatar: "372",
        last_update: 0,
        status: 1
    },
    {
        user_id: 124,
        user_key: null,
        user_name: "2051568581664238",
        user_avatar: "454",
        last_update: 124,
        status: 0
    },
    {
        user_id: 126,
        user_key: null,
        user_name: "1517619531926611",
        user_avatar: null,
        last_update: 0,
        status: 1
    },
    {
        user_id: 128,
        user_key: null,
        user_name: "sdsdsa",
        user_avatar: null,
        last_update: 0,
        status: 1
    },
    {
        user_id: 128,
        user_key: null,
        user_name: "sdsdsa",
        user_avatar: null,
        last_update: 0,
        status: 1
    },

]

export default function ManagerUser(props: any) {
    const { navigation } = props;
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState(userList);
    const [isLoadMore, setisLoadMore] = useState(false)

    const isStatus = (status: number, id: number) => {
        const messenger = status ? "Xác nhận mở khoá tài khoản?" : "Xác nhận khoá tài khoản?"
        Alert.alert(
            "Thông báo!",
            messenger,
            [
                { text: "Xác nhận", onPress: () => console.log(status) },
                { text: "Huỷ" }
            ]
        );
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    useEffect(() => {
        let test = [...data, ...userList]
        setData(test)
        setisLoadMore(false)
    }, [page])

    return (
        <View style={{ flex: 1 }}>
            <HeaderTitle title="Quản lí người dùng" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>

            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setPage(page + 1);
                        setisLoadMore(true);
                    }
                }}
                scrollEventThrottle={400}
                showsVerticalScrollIndicator={false}>
                <View style={[styles.containerCenter, { marginTop: 10 }]}>
                    <Text style={{ fontSize: 20, color: '#ABA9A9' }}>Danh sách tài khoản người dùng</Text>
                </View>

                {data?.length ?
                    data.map((item: any, index: number) =>
                        <View style={styles.container} key={index}>
                            <View>
                                <Text>{item.user_id}.</Text>
                            </View>
                            <View style={styles.textView}>
                                <View>
                                    <Text>{item.user_name}</Text>
                                </View>
                            </View>
                            <View style={{ marginLeft: "auto" }}>
                                {item.status ?
                                    <TouchableOpacity onPress={() => isStatus(0, item.user_id)}>
                                        <Text style={{ backgroundColor: "#dc3545", color: "#fff", borderRadius: 5, padding: 3 }}>Khoá</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => isStatus(1, item.user_id)}>
                                        <Text style={{ backgroundColor: COLORS.primary, color: "#fff", borderRadius: 5, padding: 3 }}>Mở khoá</Text>
                                    </TouchableOpacity>
                                }

                            </View>
                        </View>

                    ) :
                    <View></View>}

                {
                    isLoadMore &&
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                }

            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        backgroundColor: "#fff",
        padding: 10
    },

    textView: {
        marginHorizontal: 10,
        textAlign: "center"
    },
});