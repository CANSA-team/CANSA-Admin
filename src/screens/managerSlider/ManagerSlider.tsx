import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '../../utils/useNavigation';
import { getSlider, SliderModel, SliderState, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import SlideItem from '../../components/SlideItem';

export default function ManagerSlider(props: any) {
    const { navigation } = props;
    const { navigate } = useNavigation();
    const [isLoading, setisLoading] = useState(true)
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
        if (slider.length) {
            setisLoading(false)
        }
    }, [slider])

    const onTapEdit = (slide: SliderModel) => {
        navigate('EditSlide', { slide })
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
                                slider.length &&
                                slider.map((slide:SliderModel)=>
                                    <SlideItem onTapEdit={()=>onTapEdit(slide)} key={slide.slider_id} slide={slide} /> 
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