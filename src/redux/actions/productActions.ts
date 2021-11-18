import { Dispatch } from "redux";
import { ProductModel } from "../models";
import axios from 'axios';
import { ProductActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface ProductErrorAction {
    readonly type: ProductActionType.ON_PRODUCT_ERROR,
    payload: any
}

export interface GetProductList {
    readonly type: ProductActionType.GET_PRODUCT_LIST,
    payload?: ProductModel[]
}

export interface GetProductShop {
    readonly type: ProductActionType.GET_PRODUCT_SHOP,
    payload?: ProductModel[]
}

export interface UpdateStatusProduct {
    readonly type: ProductActionType.UPDATE_PRODUCT_STATUS,
    payload?: ProductModel[]
}

export type ProductActions = ProductErrorAction | GetProductList | GetProductShop | UpdateStatusProduct;

export const getProductList = (page: number = 1, option: number = 1) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/all/${page}/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT_LIST,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }

    }
}

export const getProductsShop = (shop_id: number, page: number = 1, option: number = 0) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/shop/${page}/${shop_id}/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT_SHOP,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }

    }
}

export const updateStatusProduct = (product_id: number, status: number, shop_id: number, page: number = 1) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/status_id/${status}/${product_id}/${shop_id}/${page}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ProductActionType.UPDATE_PRODUCT_STATUS,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }
    }
}
