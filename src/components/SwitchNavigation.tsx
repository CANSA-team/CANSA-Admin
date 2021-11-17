import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import COLORS from '../consts/Colors';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CategoryList from '../screens/managerCategory/CategoryList';
import ManagerApp from '../screens/mangerApp/ManagerApp';
import ManagerReport from '../screens/managerReport/ManagerReport';
import ManagerSlider from './../screens/managerSlider/ManagerSlider';
import NewSlide from '../screens/managerSlider/NewSlide';
import EditSlide from '../screens/managerSlider/EditSlide';
import ManagerRevenue from '../screens/managerRevenue/ManagerRevenue';
import ShopDetail from '../screens/managerShop/ShopDetail';
import ManagerShop from '../screens/managerShop/ManagerShop';

const DIMENS = {
    iconSize: 30,
    fontNameCategory: 15
}
const switchNavigator = createSwitchNavigator({
    homeStack: createBottomTabNavigator({
        home: {
            screen: createStackNavigator({
                Home,
                CategoryList,
                ManagerApp,
                ManagerReport,
                ManagerShop,
                ManagerSlider,
                NewSlide,
                EditSlide,
                ManagerRevenue,
                ShopDetail,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },

            }),
            navigationOptions: {
                tabBarIcon: ({ focused }) => {
                    let icon = focused ? <FontAwesome name="pagelines" size={DIMENS.iconSize} color={COLORS.primary} /> : <FontAwesome name="pagelines" size={DIMENS.iconSize} color='gray' />
                    return icon;
                },
                tabBarLabel: "Admin"
            },

        },
        account: {
            screen: createStackNavigator({
                Account,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },

            }),
            navigationOptions: {
                tabBarIcon: ({ focused }) => {
                    let icon = focused ? <Ionicons name="person" size={DIMENS.iconSize} color={COLORS.primary} /> : <Ionicons name="person" size={DIMENS.iconSize} color='gray' />
                    return icon;
                },
                tabBarLabel: "Tài khoản"
            },

        },
    }
        , {
            tabBarOptions: {
                activeTintColor: COLORS.primary,
                inactiveTintColor: COLORS.colorFontInit,
                labelStyle: {
                    fontSize: DIMENS.fontNameCategory,
                    fontWeight: '600'
                },
                style: {
                    padding: 8,
                    height: 60,
                },
                allowFontScaling: true
            }
        }),
});
const AppNavigation = createAppContainer(switchNavigator);

export default function SwitchNavigation() {
    return (
        <AppNavigation />
    )
}
