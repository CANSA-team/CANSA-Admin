import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '../../utils/useNavigation';
import { CategoryModel } from '../../redux';
import CategoryItem from '../../components/CategoryItem';
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
export default function CategoryList(props:any) {
    const { navigation } = props;
    const { navigate } = useNavigation();
    const [isLoading, setisLoading] = useState(false)

    return (
        <View style={styles.container}>
        <HeaderTitle title="Danh mục lớn" />
        <View style={styles.header}>
            <TouchableOpacity>
                <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="ios-add" onPress={() => navigate('NewCategory')} size={35} color="white" />
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
                            categories.map((category:CategoryModel)=> 
                                <CategoryItem key={category.category_id} category={category} />
                            )
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