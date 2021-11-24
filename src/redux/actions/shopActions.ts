import { Dispatch } from "redux";
import { ShopModel } from "../models";
import axios from 'axios';
import { ShopActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface GetShopInfo {
    readonly type: ShopActionType.GET_SHOP_INFO,
    payload?: any
}

export interface GetShopList {
    readonly type: ShopActionType.GET_SHOP_LIST,
    payload?: any
}

export interface ShopErrorAction {
    readonly type: ShopActionType.ON_SHOP_ERROR,
    payload: any
}

export interface UpdateStatusShopAction {
    readonly type: ShopActionType.UPDATE_STATUS_SHOP,
    payload: any
}

export type ShopActions = GetShopInfo | ShopErrorAction | GetShopList | UpdateStatusShopAction;

export const getShopInfo = (shop_id: number, option: number = 0) => {
    return async (dispatch: Dispatch<ShopActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/shop/info/${shop_id}/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ShopActionType.ON_SHOP_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ShopActionType.GET_SHOP_INFO,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ShopActionType.ON_SHOP_ERROR,
                payload: error
            })
        }

    }
}

export const getShopList = (page: number = 1) => {
    return async (dispatch: Dispatch<ShopActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/shop/all/${page}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ShopActionType.ON_SHOP_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ShopActionType.GET_SHOP_LIST,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ShopActionType.ON_SHOP_ERROR,
                payload: error
            })
        }

    }
}

export const updateStatusShop = (status: number, shop_id: number, page: number = 1) => {
    return async (dispatch: Dispatch<ShopActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/shop/status/${page}/${status}/${shop_id}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ShopActionType.ON_SHOP_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ShopActionType.UPDATE_STATUS_SHOP,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ShopActionType.ON_SHOP_ERROR,
                payload: error
            })
        }

    }
}
