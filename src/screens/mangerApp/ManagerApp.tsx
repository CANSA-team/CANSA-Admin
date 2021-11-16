import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../components/HeaderTitle';

export default function ManagerApp(props:any) {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <HeaderTitle title="Quản lí App" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
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
});