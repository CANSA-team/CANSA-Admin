import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import COLORS from '../consts/Colors';


export default function Home() {

    return (
        <View style={styles.container}>
            <Text>Home</Text>
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