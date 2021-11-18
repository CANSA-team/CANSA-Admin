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
const categories = [
  {
    category_id: 1,
    category_image: "https://103.207.38.200:333/api/image/photo/334/e4611a028c71342a5b083d2cbf59c494",
    category_view: 0,
    category_name: "Thời trang nữ",
    category_category: null,
    last_update: 0,
    status: 1,
    category_image_id: 334,
    categories: [
      {
        category_id: 2,
        category_image: "https://103.207.38.200:333/api/image/photo/335/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Đồ lót nữ",
        category_category: 1,
        last_update: 0,
        status: 1,
        category_image_id: 335,
        categories: [

        ]
      },
      {
        category_id: 3,
        category_image: "https://103.207.38.200:333/api/image/photo/336/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Quần nữ",
        category_category: 1,
        last_update: 0,
        status: 1,
        category_image_id: 336,
        categories: [

        ]
      },
      {
        category_id: 4,
        category_image: "https://103.207.38.200:333/api/image/photo/337/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Đầm nữ",
        category_category: 1,
        last_update: 0,
        status: 1,
        category_image_id: 337,
        categories: [

        ]
      },
      {
        category_id: 5,
        category_image: "https://103.207.38.200:333/api/image/photo/338/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Chân váy",
        category_category: 1,
        last_update: 0,
        status: 1,
        category_image_id: 338,
        categories: [

        ]
      },
      {
        category_id: 6,
        category_image: "https://103.207.38.200:333/api/image/photo/339/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Trang phục bơi nữ",
        category_category: 1,
        last_update: 0,
        status: 1,
        category_image_id: 339,
        categories: [

        ]
      },
      {
        category_id: 7,
        category_image: "https://103.207.38.200:333/api/image/photo/340/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Áo nữ",
        category_category: 1,
        last_update: 0,
        status: 1,
        category_image_id: 340,
        categories: [

        ]
      }
    ]
  },
  {
    category_id: 8,
    category_image: "https://103.207.38.200:333/api/image/photo/341/e4611a028c71342a5b083d2cbf59c494",
    category_view: 0,
    category_name: "Thời trang nam",
    category_category: null,
    last_update: 0,
    status: 1,
    category_image_id: 341,
    categories: [
      {
        category_id: 9,
        category_image: "https://103.207.38.200:333/api/image/photo/342/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Áo thun nam",
        category_category: 8,
        last_update: 0,
        status: 1,
        category_image_id: 342,
        categories: [

        ]
      },
      {
        category_id: 10,
        category_image: "https://103.207.38.200:333/api/image/photo/343/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Quần nam",
        category_category: 8,
        last_update: 0,
        status: 1,
        category_image_id: 343,
        categories: [

        ]
      },
      {
        category_id: 11,
        category_image: "https://103.207.38.200:333/api/image/photo/344/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Áo vest - Áo khoác nam",
        category_category: 8,
        last_update: 0,
        status: 1,
        category_image_id: 344,
        categories: [

        ]
      },
      {
        category_id: 12,
        category_image: "https://103.207.38.200:333/api/image/photo/345/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Áo sơ mi nam",
        category_category: 8,
        last_update: 0,
        status: 1,
        category_image_id: 345,
        categories: [

        ]
      }
    ]
  },
  {
    category_id: 13,
    category_image: "https://103.207.38.200:333/api/image/photo/346/e4611a028c71342a5b083d2cbf59c494",
    category_view: 0,
    category_name: "Phụ Kiện Điện Thoại và Máy Tính Bảng",
    category_category: null,
    last_update: 0,
    status: 1,
    category_image_id: 346,
    categories: [
      {
        category_id: 14,
        category_image: "https://103.207.38.200:333/api/image/photo/347/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Bao Da - Ốp Lưng",
        category_category: 13,
        last_update: 0,
        status: 1,
        category_image_id: 347,
        categories: [

        ]
      },
      {
        category_id: 15,
        category_image: "https://103.207.38.200:333/api/image/photo/348/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Miếng Dán Màn Hình",
        category_category: 13,
        last_update: 0,
        status: 1,
        category_image_id: 348,
        categories: [

        ]
      },
      {
        category_id: 16,
        category_image: "https://103.207.38.200:333/api/image/photo/349/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Dây Sạc - Dây Cáp",
        category_category: 13,
        last_update: 0,
        status: 1,
        category_image_id: 349,
        categories: [

        ]
      },
      {
        category_id: 17,
        category_image: "https://103.207.38.200:333/api/image/photo/350/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Adapter - Củ Sạc",
        category_category: 13,
        last_update: 0,
        status: 1,
        category_image_id: 350,
        categories: [

        ]
      }
    ]
  },
  {
    category_id: 18,
    category_image: "https://103.207.38.200:333/api/image/photo/351/e4611a028c71342a5b083d2cbf59c494",
    category_view: 0,
    category_name: "Phụ kiện máy tính và Laptop",
    category_category: null,
    last_update: 0,
    status: 1,
    category_image_id: 351,
    categories: [
      {
        category_id: 19,
        category_image: "https://103.207.38.200:333/api/image/photo/352/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Các Loại Cáp Chuyển Đổi",
        category_category: 18,
        last_update: 0,
        status: 1,
        category_image_id: 352,
        categories: [

        ]
      },
      {
        category_id: 20,
        category_image: "https://103.207.38.200:333/api/image/photo/353/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Tai Nghe Máy Tính",
        category_category: 18,
        last_update: 0,
        status: 1,
        category_image_id: 353,
        categories: [

        ]
      },
      {
        category_id: 21,
        category_image: "https://103.207.38.200:333/api/image/photo/354/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Webcam Máy Tính",
        category_category: 18,
        last_update: 0,
        status: 1,
        category_image_id: 354,
        categories: [

        ]
      },
      {
        category_id: 22,
        category_image: "https://103.207.38.200:333/api/image/photo/355/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Bút Trình Chiếu",
        category_category: 18,
        last_update: 0,
        status: 1,
        category_image_id: 355,
        categories: [

        ]
      }
    ]
  },
  {
    category_id: 23,
    category_image: "https://103.207.38.200:333/api/image/photo/356/e4611a028c71342a5b083d2cbf59c494",
    category_view: 0,
    category_name: "Máy Ảnh - Máy Quay Phim",
    category_category: null,
    last_update: 0,
    status: 1,
    category_image_id: 356,
    categories: [
      {
        category_id: 24,
        category_image: "https://103.207.38.200:333/api/image/photo/357/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Phụ Kiện Máy Ảnh, Máy Quay",
        category_category: 23,
        last_update: 0,
        status: 1,
        category_image_id: 357,
        categories: [

        ]
      },
      {
        category_id: 25,
        category_image: "https://103.207.38.200:333/api/image/photo/358/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Camera Giám Sát",
        category_category: 23,
        last_update: 0,
        status: 1,
        category_image_id: 358,
        categories: [

        ]
      },
      {
        category_id: 26,
        category_image: "https://103.207.38.200:333/api/image/photo/359/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Camera Hành Trình",
        category_category: 23,
        last_update: 0,
        status: 1,
        category_image_id: 359,
        categories: [

        ]
      },
      {
        category_id: 27,
        category_image: "https://103.207.38.200:333/api/image/photo/360/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Thiết Bị Ánh Sáng",
        category_category: 23,
        last_update: 0,
        status: 1,
        category_image_id: 360,
        categories: [

        ]
      },
      {
        category_id: 28,
        category_image: "https://103.207.38.200:333/api/image/photo/361/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Ống Kính (Lens)",
        category_category: 23,
        last_update: 0,
        status: 1,
        category_image_id: 361,
        categories: [

        ]
      }
    ]
  },
  {
    category_id: 29,
    category_image: "https://103.207.38.200:333/api/image/photo/362/e4611a028c71342a5b083d2cbf59c494",
    category_view: 0,
    category_name: "Làm Đẹp - Sức Khỏe",
    category_category: null,
    last_update: 0,
    status: 1,
    category_image_id: 362,
    categories: [
      {
        category_id: 30,
        category_image: "https://103.207.38.200:333/api/image/photo/363/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Chăm sóc da mặt",
        category_category: 29,
        last_update: 0,
        status: 1,
        category_image_id: 363,
        categories: [

        ]
      },
      {
        category_id: 31,
        category_image: "https://103.207.38.200:333/api/image/photo/364/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Dụng cụ làm đẹp",
        category_category: 29,
        last_update: 0,
        status: 1,
        category_image_id: 364,
        categories: [

        ]
      },
      {
        category_id: 32,
        category_image: "https://103.207.38.200:333/api/image/photo/365/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Thực phẩm chức năng",
        category_category: 29,
        last_update: 0,
        status: 1,
        category_image_id: 365,
        categories: [

        ]
      },
      {
        category_id: 33,
        category_image: "https://103.207.38.200:333/api/image/photo/366/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Chăm sóc cơ thể",
        category_category: 29,
        last_update: 0,
        status: 1,
        category_image_id: 366,
        categories: [

        ]
      },
      {
        category_id: 34,
        category_image: "https://103.207.38.200:333/api/image/photo/367/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Nước hoa",
        category_category: 29,
        last_update: 0,
        status: 1,
        category_image_id: 367,
        categories: [

        ]
      },
      {
        category_id: 35,
        category_image: "https://103.207.38.200:333/api/image/photo/368/e4611a028c71342a5b083d2cbf59c494",
        category_view: 0,
        category_name: "Hỗ trợ tình dục",
        category_category: 29,
        last_update: 0,
        status: 1,
        category_image_id: 368,
        categories: [

        ]
      }
    ]
  }
]

interface CatRender {
  label: string,
  value: number | null
}
export default function NewCategory(props: any) {
  const { navigation } = props;
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const [avatar, setAvatar] = useState('https://103.207.38.200:333/api/image/photo/46/e4611a028c71342a5b083d2cbf59c494');
  const [catagoryRender, setCatagoryRender] = useState<CatRender[]>([] as CatRender[])
  const [valueCategory, setValueCategory] = useState<number | null>(null)
  const [isLoading, setisLoading] = useState(true)
  const categoryState: CategoryState = useSelector((state: State) => state.categoryReducer);
  const { categories }: { categories: CategoryModel[] } = categoryState;
  const dispatch = useDispatch();


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
    console.log(data, valueCategory)
    setisLoading(true);
    let saveAvt: Promise<void>
    let _avatar: ImageId = { id: 0 };

    if (avatar != 'https://103.207.38.200:333/api/image/photo/46/e4611a028c71342a5b083d2cbf59c494') {
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
        navigation.goBack();
      })
    }
  }

  //lay anh
  let getImg = async () => {
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
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text style={[styles.txtTitle, { marginTop: 20, marginBottom: 5 }]}>Chọn ảnh :</Text>
        <TouchableOpacity onPress={getImg} style={{ marginBottom: 20 }}>
          <Image source={{ uri: avatar }} style={{ width: '100%', height: 150, resizeMode: 'contain' }} />
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
