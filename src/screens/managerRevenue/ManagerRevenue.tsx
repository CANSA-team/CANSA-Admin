import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import { LineChart } from "react-native-gifted-charts";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AdminState, getRevenue, RevenueModel, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

interface DataChar {
    value: number,
    dataPointText?: string,
    label?: string
}


export default function ManagerRevenue(props: any) {
    let temp = [
        {
            value: 0,
            label: " "
        }
    ]
    const { navigation } = props;
    const [lineData, setLineData] = useState<DataChar[]>([]);
    const adminState: AdminState = useSelector((state: State) => state.adminReducer);
    const { revenue_list }: { revenue_list: RevenueModel[] } = adminState;
    const dispatch = useDispatch();
    const [revenueYear, setRevenueYear] = useState(temp);

    const month = (arr: RevenueModel[]) => {
        const result = arr.sort((a: RevenueModel, b: RevenueModel) => a.revenue_year - b.revenue_year == 0 ? a.revenue_month - b.revenue_month : a.revenue_year - b.revenue_year);
        return result;
    }

    useEffect(() => {
        dispatch(getRevenue())
    }, [])

    useEffect(() => {
        if (revenue_list.length) {
            const sortM = month(revenue_list);
            let dataLine: DataChar[] = [];
            for (const key in sortM) {
                const money = sortM[key].revenue_money / 1000000;
                if (sortM[key].revenue_year == revenue_list[revenue_list.length - 1].revenue_year) {
                    dataLine = [...dataLine,
                    {
                        value: money,
                        dataPointText: money.toString(),
                        label: sortM[key].revenue_month.toString()
                    }
                    ]
                }
            }
            dataLine = [{ value: 0 }, ...dataLine];
            let tempArr: Array<any> = [];


            for (let i = revenue_list.length - 1; i >= 0; i--) {
                if (!checkYear(tempArr, Number(i), revenue_list)) {
                    tempArr = [...tempArr, {
                        value: sortM[i].revenue_year,
                        label: `N??m ${sortM[i].revenue_year}`
                    }];
                }

            }
            setLineData(dataLine)
            setRevenueYear(tempArr);
        }
    }, [revenue_list])

    const checkYear = (tempArr: Array<any>, item: number, sortM: Array<any>) => {
        for (const i of tempArr) {
            if (i.label === `N??m ${sortM[item].revenue_year}`) {
                return true;
            }
        }
        return false;
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderTitle title="Doanh thu App"></HeaderTitle>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
            </View>

            {
                lineData.length ?
                    <>
                        <View style={{ backgroundColor: '#Fff', padding: 12 }}>
                            <RNPickerSelect
                                placeholder={{ label: `N??m ${revenue_list[revenue_list.length - 1].revenue_year}`, value: revenue_list[revenue_list.length - 1].revenue_year }}
                                style={{ ...pickerSelectStyles, placeholder: { color: '#acabab' } }}
                                onValueChange={(data) => {
                                    const sortM = month(revenue_list);
                                    let dataLine: DataChar[] = [];
                                    for (const key in sortM) {
                                        const money = sortM[key].revenue_money / 1000000;
                                        if (sortM[key].revenue_year == data) {
                                            dataLine = [...dataLine, {
                                                value: money,
                                                dataPointText: money.toString(),
                                                label: sortM[key].revenue_month.toString()
                                            }
                                            ]
                                        }
                                    }
                                    dataLine = [{ value: 0 }, ...dataLine];
                                    setLineData(dataLine)
                                }}
                                items={revenueYear}
                            />
                        </View>

                        <View>
                            <Text style={styles.container}>Bi????u ?????? th???? hi????n doanh thu cu??a shop trong n??m</Text>
                        </View>

                        <Text style={{ marginLeft: 5, marginBottom: 5, color: '#ABA9A9' }}>(tri????u ??????ng)</Text>
                        <View style={{ marginBottom: 20, marginRight: 30, marginLeft: 5 }}>
                            <LineChart
                                areaChart
                                isAnimated
                                animationDuration={1200}
                                startFillColor="#0BA5A4"
                                startOpacity={1}
                                endOpacity={0.3}
                                initialSpacing={0}
                                data={lineData}
                                spacing={30}
                                thickness={4}
                                hideRules
                                yAxisColor="#0BA5A4"
                                showVerticalLines
                                verticalLinesColor="rgba(14,164,164,0.5)"
                                xAxisColor="#0BA5A4"
                                color="#0BA5A4"
                            />
                        </View>

                        <View style={styles.contactContainer}>
                            <View style={styles.icons}>
                                <MaterialIcons name="horizontal-rule" size={25} color="#0BA5A4"></MaterialIcons>
                            </View>
                            <Text style={styles.textNote}>????n vi?? ti????n t????</Text>

                            <MaterialIcons name="horizontal-rule" size={25} color="#0BA5A4" style={{ marginHorizontal: 5 }}></MaterialIcons>
                            <Text style={styles.textNote}>Ca??c tha??ng trong n??m</Text>

                            <Entypo name="dot-single" size={25} style={{ textAlign: "center" }}></Entypo>
                            <Text style={styles.textNote}>S???? ti????n cu??a tha??ng</Text>
                        </View>
                    </>
                    :
                    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Image source={require('../../images/loader.gif')} />
                    </View>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 15
    },
    icons: {
        transform: [{ rotate: "90deg" }],
        alignItems: "center",
        justifyContent: "center",

    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },

    textNote: {
        fontSize: 8,
        color: '#ABA9A9'
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