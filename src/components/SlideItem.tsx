import React,{useRef} from 'react'
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SliderModel } from '../redux';
const WIDTH = Dimensions.get('window').width;

interface SlideProps{
    slide: SliderModel;
    onTapEdit:Function;
    onTapDelete:Function;
}
export default function SlideItem(props:SlideProps) {
    const { slide, onTapEdit, onTapDelete }:SlideProps = props;
    const swipeableRef = useRef<any>(null);

    const closeSwipeable = () => {
        swipeableRef.current.close();
    }
    
    const swEdit = () =>{
        closeSwipeable();
        onTapEdit();
    }

    const boxRenderRight = ()=>{
        return (
            <>
                <TouchableOpacity onPress={()=>onTapDelete()} style={{width:75,height:110,backgroundColor:'#f53a4c',justifyContent:'center',alignItems:'center'}}>
                    <AntDesign name="delete" style={{fontSize:22,color:'#fff'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={swEdit} style={{width:80,height:110,backgroundColor:'#007bff',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:18}}>Sửa</Text>
                </TouchableOpacity> 
            </>
        )
    }

    return (
        <Swipeable ref={swipeableRef} friction={2} overshootLeft={false} overshootRight={false} renderRightActions={boxRenderRight}>    
            <View style={styles.container}>     
                <View style={styles.viewImgSwipeable}>
                    <Image style={styles.imgSwipeable} source={{ uri: slide.slider_image}}></Image>
                </View>
                <View style={styles.viewTxtSwipeable}>
                    <Text style={{fontSize:16 }}>{slide.slider_title}</Text>
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
        paddingVertical:2,
        paddingRight: 20,
        paddingLeft:1,
        flexDirection:'row',
        marginBottom:8,
    }, 
    viewImgSwipeable:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    imgSwipeable:{
        marginLeft:10,
        height:'100%',
        width:'100%',
        resizeMode:'contain',
        borderWidth:1,
        borderColor:'#ccc'
    },
    viewTxtSwipeable:{
        flex:1,
        justifyContent:'center',
        marginLeft:20
    }
});