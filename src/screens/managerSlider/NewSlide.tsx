import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../components/HeaderTitle';
import COLORS from '../../consts/Colors';
import * as ImagePicker from 'expo-image-picker';
import { createSlider, ImageId } from '../../redux';
import { saveImage } from '../../consts/Selector';
import { useDispatch } from 'react-redux';

export default function NewSlide(props: any) {
    const { navigation } = props;
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [avatarError, setAvatarError] = useState<boolean>(false);
    const [avatar, setAvatar] = useState('https://103.207.38.200:333/api/image/photo/373/e4611a028c71342a5b083d2cbf59c494');
    const [isLoading, setisLoading] = useState(false);
    const dispatch = useDispatch();

    //submit form, lay du lieu tu data
    const onSubmitForm = (data: any) => {
        Alert.alert(
            "Thông báo!",
            'Xác nhận thêm slide',
            [
                { text: "Xác nhận", onPress: () => sendData(data) },
                { text: "Huỷ" }
            ]
        );
    }

    const sendData = (data: any) => {
        setisLoading(true);
        let saveAvt: Promise<void>
        let _avatar: ImageId = { id: 0 };

        if (avatar != 'https://103.207.38.200:333/api/image/photo/373/e4611a028c71342a5b083d2cbf59c494') {
            const avatar_img = {
                uri: avatar,
                name: 'userProfile.jpg',
                type: 'image/jpg'
            }
            saveAvt = saveImage(avatar_img, _avatar);
            Promise.all([saveAvt]).then(() => {
                dispatch(createSlider(_avatar.id, data.slider_title))
                setisLoading(false);
                navigation.goBack();
            })
        }
        else {
            Alert.alert('Thông Báo', 'Bạn chưa thêm hình! Vui lòng thêm hình vào!', [
                {
                    text: "OK",
                    onPress: () => {
                        setisLoading(false);
                    },
                },]);
        }
    }

    //lay anh
    let getImg = async () => {
        setAvatarError(false);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [8, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setAvatar(result.uri);
        }
    };
    return (
        <View style={styles.container}>
            <HeaderTitle title="Thêm Slide" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <Text style={[styles.txtTitle, { marginTop: 20, marginBottom: 5 }]}>Chọn ảnh :</Text>
                <TouchableOpacity onPress={getImg} style={{ marginBottom: 20 }}>
                    <Image source={{ uri: avatar }} style={{ width: '100%', height: 150, resizeMode: 'contain' }} />
                </TouchableOpacity>
                {avatarError && <Text style={styles.txtError}>* Hình ảnh phải có</Text>}


                <Text style={styles.txtTitle}>Tiêu đề slide :</Text>
                <View style={styles.textAreaContainer}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            maxLength: 15
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{ fontSize: 18, color: '#333' }}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                underlineColorAndroid="transparent"
                                placeholder="Tiêu đề cho slide . . ."
                                placeholderTextColor="#888"
                                numberOfLines={2}
                                multiline={true}
                                value={value}
                                maxLength={15}
                            />
                        )}
                        name="slider_title"
                        defaultValue=""
                    />
                </View>
                {errors.slider_title && <Text style={styles.txtError}>* Tiêu đề cho slide phải có và dưới 15 ký tự</Text>}

                {
                    !isLoading ?
                        <TouchableOpacity onPress={handleSubmit(onSubmitForm)} style={{ backgroundColor: COLORS.primary, borderRadius: 6, marginTop: 40 }}>
                            <View style={{ padding: 8 }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>Thêm</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <View style={{ backgroundColor: COLORS.primary, borderRadius: 6, marginTop: 40 }}>
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    txtError: {
        color: '#f86161'
    },
    viewTotal: {
        marginHorizontal: 15,
        margin: 10,
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    txtTitle: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
        fontWeight: '700'
    },
});
