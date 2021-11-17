import React, { useRef } from 'react'
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SlugStrTitle } from '../consts/Selector';
import { ProductModel } from '../redux';
const WIDTH = Dimensions.get('window').width;

interface ProductProps {
    productInfo: ProductModel;
}
export default function Product(props: ProductProps) {
    const { productInfo }: ProductProps = props;
    const swipeableRef = useRef<any>(null);

    const closeSwipeable = () => {
        swipeableRef.current.close();
    }

    const isStatus = (status: number) => {
        const messenger = status ? `Xác nhận mở khoá sản phẩm ${productInfo.product_title}?` : `Xác nhận khoá shop ${productInfo.product_title}?`
        Alert.alert(
            "Thông báo!",
            messenger,
            [
                { text: "Xác nhận", onPress: () => console.log(status) },
                { text: "Huỷ" }
            ]
        );
    }

    const boxRenderRight = () => {
        return (
            <>
                {productInfo.status ?
                    <TouchableOpacity onPress={() => isStatus(0)} style={{ width: 80, height: 110, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>Khoá</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => isStatus(1)} style={{ width: 80, height: 110, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>Mở khoá</Text>
                    </TouchableOpacity>
                }

            </>
        )
    }


    return (
        <Swipeable ref={swipeableRef} friction={2} overshootLeft={false} overshootRight={false} renderRightActions={boxRenderRight}>
            <View style={styles.container}>
                <View style={{ height: 110, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 110, width: 110, resizeMode: 'center' }} source={{ uri: productInfo.product_avatar }}></Image>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: 5 }}>
                    <Text style={{ fontSize: 16 }}>{SlugStrTitle(productInfo.product_title, 115)} </Text>
                </View>
            </View>
        </Swipeable>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 110,
        backgroundColor: 'white',
        width: WIDTH,
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft: 1,
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center'
    },
});