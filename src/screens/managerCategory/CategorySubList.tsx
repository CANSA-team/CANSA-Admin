import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '../../utils/useNavigation';
import { CategoryModel, CategoryState, deleteCategory, getCategory, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import CategorySubItem from '../../components/CategorySubItem';

export default function CategorySubList(props: any) {
  const { navigation } = props;
  const { navigate } = useNavigation();
  const { getParam } = navigation;
  const category:CategoryModel = getParam('category');
  const [isLoading, setisLoading] = useState(true)
  const categoryState: CategoryState = useSelector((state: State) => state.categoryReducer);
  const { categories }: { categories: CategoryModel[] } = categoryState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  useEffect(() => {
    if (categories?.length) {
      setisLoading(false)
    }
  }, [categories])

  const removeCategory = (category_id: number) => {
    Alert.alert(
      "Thông báo!",
      'Xác nhận xoá danh mục',
      [
        { text: "Xác nhận", onPress: () => { setisLoading(true); dispatch(deleteCategory(category_id)) } },
        { text: "Huỷ" }
      ]
    );

  }

  const onEdit = (category:CategoryModel) => {
    navigate('EditCategory',{ category })
  }

  return (
    <View style={styles.container}>
      <HeaderTitle title="Danh mục con" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={35} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('NewCategory')}>
          <Ionicons name="ios-add" size={35} color="white" />
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
                  category.categories.map((category: CategoryModel) =>
                  <CategorySubItem key={category.category_id} onEdit={()=>onEdit(category)} category={category} onTap={removeCategory} />
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