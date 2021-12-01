import React, { useRef } from 'react'
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CategoryModel } from '../redux';
const WIDTH = Dimensions.get('window').width;

interface SlideProps {
    category: CategoryModel;
    onTap: Function;
    onEdit:Function;
    onCategorySub:Function;
}
export default function CategoryItem(props: SlideProps) {
    const { category, onTap, onEdit, onCategorySub } : SlideProps  = props
    const swipeableRef = useRef<any>(null);

    const closeSwipeable = () => {
        swipeableRef.current.close();
    }

    const swEdit = () => {
        closeSwipeable();
        onEdit()
    }

    const swCategorySub = () => {
        closeSwipeable();
        onCategorySub()
    }

    const boxRenderLeft = () => {
        return (
            <>
                <TouchableOpacity onPress={swCategorySub} style={{ width: 85, height: 110, backgroundColor: '#ffc106', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                    <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Danh mục con</Text>
                </TouchableOpacity>
            </>
        )
    }
    const boxRenderRight = () => {
        return (
            <>
                <TouchableOpacity onPress={() => onTap(category.category_id)} style={{ width: 75, height: 110, backgroundColor: '#f53a4c', justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="delete" style={{ fontSize: 22, color: '#fff' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={swEdit} style={{ width: 80, height: 110, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Sửa</Text>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <Swipeable ref={swipeableRef} friction={2} overshootLeft={false} overshootRight={false} renderLeftActions={boxRenderLeft} renderRightActions={boxRenderRight}>
            <View style={styles.container}>
                <View style={styles.viewImgSwipeable}>
                    <Image style={styles.imgSwipeable} source={{ uri: category.category_image }}></Image>
                </View>
                <View style={styles.viewTxtSwipeable}>
                    <Text style={{ fontSize: 16 }}>{category.category_name}</Text>
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
        paddingVertical: 2,
        paddingRight: 20,
        paddingLeft: 1,
        flexDirection: 'row',
        marginBottom: 8,
    },
    viewImgSwipeable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgSwipeable: {
        marginLeft: 10,
        height: 100,
        width: 100,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    viewTxtSwipeable: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20
    }
});