import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../components/HeaderTitle';
import COLORS from '../../consts/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { CategoryModel, CategoryState, createCategory, getCategory, ImageId, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { saveImage } from '../../consts/Selector';
import { useNavigation } from '../../utils/useNavigation';

interface CatRender {
  label: string,
  value: number | null
}
export default function NewCategory(props: any) {
  const { navigation } = props;
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const [avatar, setAvatar] = useState('https://103.207.38.200:333/api/image/photo/373/e4611a028c71342a5b083d2cbf59c494');
  const [catagoryRender, setCatagoryRender] = useState<CatRender[]>([] as CatRender[])
  const [valueCategory, setValueCategory] = useState<number | null>(null)
  const [isLoading, setisLoading] = useState(true)
  const categoryState: CategoryState = useSelector((state: State) => state.categoryReducer);
  const { categories }: { categories: CategoryModel[] } = categoryState;
  const dispatch = useDispatch();
  const { navigate } = useNavigation();


  useEffect(() => {
    getCatRender()
  }, [])

  const getCatRender = () => {
    const arr = categories.map((category: CategoryModel) => {
      return {
        label: category.category_name,
        value: category.category_id,
      }
    })
    setCatagoryRender(arr)
    setisLoading(false)
  }


  //submit form, lay du lieu tu data
  const onSubmitForm = (data: any) => {
    Alert.alert(
      "Thông báo!",
      'Xác nhận thêm slide',
      [
        { text: "Xác nhận", onPress: () => onSubmitSuccess(data) },
        { text: "Huỷ" }
      ]
    );
  }

  const onSubmitSuccess = (data: any) => {
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
        const category_category = valueCategory ? valueCategory : null;
        dispatch(createCategory(_avatar.id, data.slider_title, category_category))
        setisLoading(false);
        navigate('CategoryList');
      })
    }
    else {
      Alert.alert('Thông báo', 'Chưa chọn ảnh đại diện cho danh mục!', [
        { text: "OK", onPress: () => { setisLoading(false); } }
      ])
    }
  }


  //lay anh
  const getImg = async () => {
    setAvatarError(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTitle title="Thêm danh mục" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <MaterialIcons name="arrow-back" size={35} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text style={[styles.txtTitle, { marginTop: 20, marginBottom: 5 }]}>Chọn ảnh :</Text>
        <TouchableOpacity onPress={getImg} style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: avatar }} style={{ width: 150, height: 150, resizeMode: 'contain', borderWidth: 1, borderColor: '#ddd' }} />
        </TouchableOpacity>
        {avatarError && <Text style={styles.txtError}>* Hình ảnh phải có</Text>}

        <Text style={styles.txtTitle}>Tên danh mục :</Text>
        <View style={styles.textAreaContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 36
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ fontSize: 18, color: '#333' }}
                onBlur={onBlur}
                onChangeText={onChange}
                underlineColorAndroid="transparent"
                placeholder="Tên danh mục . . ."
                placeholderTextColor="#888"
                numberOfLines={2}
                multiline={true}
                value={value}
                maxLength={36}
              />
            )}
            name="slider_title"
            defaultValue=""
          />
        </View>
        {errors.slider_title && <Text style={styles.txtError}>* Tên danh mục phải có và dưới 36 ký tự</Text>}

        <Text style={[styles.txtTitle, { marginTop: 20 }]}>Chọn danh mục cha :</Text>
        <View style={styles.viewPicker}>
          {
            catagoryRender.length !== 0 &&
            <RNPickerSelect
              placeholder={{ label: "Chọn danh mục cha nếu có ", value: null }}
              style={{ ...pickerSelectStyles, placeholder: { color: '#acabab' } }}
              onValueChange={(data: any) => setValueCategory(data)}
              items={catagoryRender}
            />
          }
        </View>


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
  viewPicker: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray'
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    borderRadius: 30,
    color: 'black',
    padding: 25
  },
  inputAndroid: {
    fontSize: 20,
    borderRadius: 30,
    color: 'black',
    padding: 25
  },
});
