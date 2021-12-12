import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, StyleSheet, ScrollView, Text, Alert, ActivityIndicator } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/Colors';
import { useDispatch, useSelector } from 'react-redux'
import { State, UserStage } from '../../redux'
import { GetAllUser, EditStatus } from '../../redux/actions/userActions'

export default function ManagerUser(props: any) {
    const { navigation } = props;
    const [page, setPage] = useState<number>(0);
    const [data, setData] = useState([]);
    const [isLoadMore, setisLoadMore] = useState(false)
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { userAll, checkEditStatus }: { userAll: any, checkEditStatus: any } = userState;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllUser())
    }, [])

    useEffect(() => {
        dispatch(GetAllUser('asc_id', page, 15))
        setisLoadMore(false)
    }, [page])

    useEffect(() => {
        if (userAll) {
            let test: any = [...data, ...userAll]
            setData(test)
        }
    }, [userAll])
    useEffect(() => {
        if (checkEditStatus !== undefined) {
            if (checkEditStatus.ischeck === true) {
                var temp: any = [...data];
                temp.forEach((element: any) => {
                    if (element.user_id === checkEditStatus.id) {
                        element.status = checkEditStatus.status
                    }
                });
                setData(temp)
            }
        }
    }, [checkEditStatus])

    const isStatus = (status: number, id: number) => {
        const messenger = status ? "Xác nhận mở khoá tài khoản?" : "Xác nhận khoá tài khoản?"
        Alert.alert(
            "Thông báo!",
            messenger,
            [
                {
                    text: "Xác nhận", onPress: () => {
                        dispatch(EditStatus(id, status))
                    }
                },
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
        <View style={{ flex: 1 }}>
            <HeaderTitle title="Quản lý người dùng" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setPage(page + 15);
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