import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../components/HeaderTitle';
import COLORS from '../../consts/Colors';
import * as ImagePicker from 'expo-image-picker';

export default function EditSlide(props: any) {
    const { navigation } = props;
    const { getParam } = navigation;
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [avatarError, setAvatarError] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>('');
    const [statusSwitch, setStatusSwitch] = useState<number>(1)
    const slide =  {
        slider_id: 1,
        slider_image: "https://103.207.38.200:333/api/image/photo/374/e4611a028c71342a5b083d2cbf59c494",
        slider_title: "Slider 1 nè",
        status: 1,
        slider_image_id: 374
    }
    
    useEffect(() => {
        setAvatar(slide.slider_image)
        setStatusSwitch(slide.status)
    }, [])

    //submit form, lay du lieu tu data
    const onSubmitForm = (data:any)=>{
        console.log(data,statusSwitch)
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
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:10}}>
                <Text style={[styles.txtTitle,{marginTop:20,marginBottom:5}]}>Chọn ảnh :</Text>
                <TouchableOpacity onPress={getImg} style={{marginBottom:20}}>
                    <Image source={{uri:slide.slider_image}} style={{width:'100%',height:150,resizeMode:'contain'}} />
                </TouchableOpacity>
                      
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
                                style={{fontSize:18,color:'#333'}}
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
                        defaultValue={slide.slider_title.toString()}
                    />
                </View>
                {errors.slider_title && <Text style={styles.txtError}>* Tiêu đề cho slide phải có và dưới 15 ký tự</Text>}
                
                <Text style={[styles.txtTitle,{marginTop:20}]}>Trạng thái slide :</Text>
                <View style={{flexDirection:'row',borderRadius:5}}>
                    <TouchableOpacity onPress={()=>setStatusSwitch(1)} style={statusSwitch ? styles.btnOn : styles.btnOff}>
                        <Text style={statusSwitch ? styles.txtOn : styles.txtOff}>Bật</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setStatusSwitch(0)} style={statusSwitch ? styles.btnOff : styles.btnOn}>
                        <Text style={statusSwitch ? styles.txtOff : styles.txtOn}>Tắt</Text>
                    </TouchableOpacity>
                </View>
                        
                <TouchableOpacity onPress={handleSubmit(onSubmitForm)} style={{backgroundColor:COLORS.primary,borderRadius:6,marginTop:40}}>
                    <View style={{padding:8}}>
                        <Text style={{textAlign:'center',fontSize:18,color:'#fff'}}>Thêm</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    btnOn:{
        flex:1,
        backgroundColor:COLORS.primary,
        padding:8,
    },
    txtOn:{
        color:"#fff",
        textAlign:'center',
        fontSize:18,
        fontWeight:'bold'
    },
    btnOff:{
        flex:1,
        borderColor:COLORS.primary,
        borderWidth:1,
        padding:8
    },
    txtOff:{
        color:COLORS.primary,
        textAlign:'center',
        fontSize:18
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
        marginBottom: 6,
        fontWeight:'700'
    },
});
