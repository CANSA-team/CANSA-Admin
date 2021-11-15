import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import COLORS from '../consts/Colors';
import Home from '../screens/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DIMENS = {
    iconSize: 30,
    fontNameCategory: 15
}
const switchNavigator = createSwitchNavigator({
    homeStack: createBottomTabNavigator({
        home: {
            screen: createStackNavigator({
                Home: Home,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },

            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <MaterialCommunityIcons name="storefront" size={DIMENS.iconSize} color={COLORS.primary} /> : <MaterialCommunityIcons name="storefront-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit} />
                    return icon;
                },
                tabBarLabel: "Cửa hàng"
            },

        }
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
