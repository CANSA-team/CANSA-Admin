import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '../../utils/useNavigation';
import { useDispatch, useSelector } from 'react-redux';
import SlideItem from '../../components/SlideItem';
import { getSlider, SliderModel, SliderState, State } from '../../redux';

const slider = [
    {
        slider_id: 1,
        slider_image: "https://103.207.38.200:333/api/image/photo/374/e4611a028c71342a5b083d2cbf59c494",
        slider_title: "Slider 1 nè",
        status: 1,
        slider_image_id: 374
    },
    {
        slider_id: 2,
        slider_image: "https://103.207.38.200:333/api/image/photo/375/e4611a028c71342a5b083d2cbf59c494",
        slider_title: "Slider 2 nè",
        status: 1,
        slider_image_id: 375
    },
    {
        slider_id: 3,
        slider_image: "https://103.207.38.200:333/api/image/photo/376/e4611a028c71342a5b083d2cbf59c494",
        slider_title: "Slider 3 nè",
        status: 1,
        slider_image_id: 376
    },
    {
        slider_id: 4,
        slider_image: "https://103.207.38.200:333/api/image/photo/377/e4611a028c71342a5b083d2cbf59c494",
        slider_title: "Slider 4",
        status: 1,
        slider_image_id: 377
    },
    {
        slider_id: 5,
        slider_image: "https://103.207.38.200:333/api/image/photo/378/e4611a028c71342a5b083d2cbf59c494",
        slider_title: "Slider 5",
        status: 1,
        slider_image_id: 378
    },
    {
        slider_id: 6,
        slider_image: "https://103.207.38.200:333/api/image/photo/379/e4611a028c71342a5b083d2cbf59c494",
        slider_title: "Slider 6",
        status: 1,
        slider_image_id: 379
    },
    {
        slider_id: 7,
        slider_image: "https://103.207.38.200:333/api/image/photo/380/e4611a028c71342a5b083d2cbf59c494",
        slider_title: "Slider 7",
        status: 1,
        slider_image_id: 380
    }
]

export default function ManagerSlider(props: any) {
    const { navigation } = props;
    const { navigate } = useNavigation();
    const [isLoading, setisLoading] = useState(false)
    const [isLoadMore, setisLoadMore] = useState(false)
    const sliderState: SliderState = useSelector((state: State) => state.sliderReducer);
    const { slider }: { slider: SliderModel[] } = sliderState;
    const dispatch = useDispatch();

    //Lay slider
    useEffect(() => {
        dispatch(getSlider());
    }, [])

    //Huy loadding neu co slider
    useEffect(() => {
        if (slider?.length) {
            setisLoading(false)
        }
    }, [slider])

    const onTapEdit = (slide: SliderModel) => {
        navigate('EditSlide', { slide })
    }

    const onTapDelete = (slider_id: number) => {
        Alert.alert(
            "Thông báo!",
            'Xác nhận xoá slide',
            [
                { text: "Xác nhận", onPress: () => console.log(slider_id) },
                { text: "Huỷ" }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <HeaderTitle title="Quản lí Slider" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="ios-add" onPress={() => navigate('NewSlide')} size={35} color="white" />
                </TouchableOpacity>
            </View>

            {isLoading ?
                (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../images/loader.gif')} />
                </View>)
                :
                (
                    <View style={{ marginTop: 5, marginBottom: 10, flex: 1 }}>
                        <ScrollView
                            scrollEventThrottle={400}
                            showsVerticalScrollIndicator={false}>
                            {
                                slider?.length !== 0 &&
                                slider.map((slide: SliderModel) =>
                                    <SlideItem onTapDelete={() => onTapDelete(slide.slider_id)} onTapEdit={() => onTapEdit(slide)} key={slide.slider_id} slide={slide} />
                                )
                            }
                            {
                                isLoadMore &&
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" color="#00ff00" />
                                </View>
                            }
                        </ScrollView>
                    </View>
                )}
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