import { Dispatch } from "redux";
import axios from 'axios';
import { OrderActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface GetOrdersAction {
    readonly type: OrderActionType.GET_ALL_ORDER,
    payload: any
}

export interface GetOrderAction {
    readonly type: OrderActionType.GET_ODER,
    payload: any
}

export interface UpdateOrdersAction {
    readonly type: OrderActionType.UPDATE_STATUS_ORDER_LIST,
    payload: any
}

export interface UpdateOrderAction {
    readonly type: OrderActionType.UPDATE_STATUS_ORDER,
    payload: any
}

export interface OrderErrorAction {
    readonly type: OrderActionType.ON_ORDER_ERROR,
    payload: any
}

export type OrderActions = GetOrdersAction | UpdateOrderAction | OrderErrorAction | GetOrderAction | UpdateOrdersAction;

export const getOders = (page: number = 1) => {
    return async (dispatch: Dispatch<OrderActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/oder/all_admin/${page}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: OrderActionType.ON_ORDER_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: OrderActionType.GET_ALL_ORDER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: OrderActionType.ON_ORDER_ERROR,
                payload: error
            })
        }

    }
}

export const updateStatusOrder = (oder_id: number, status: number) => {
    return async (dispatch: Dispatch<OrderActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/oder/change_status/${oder_id}/${status}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: OrderActionType.ON_ORDER_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: OrderActionType.UPDATE_STATUS_ORDER_LIST,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: OrderActionType.ON_ORDER_ERROR,
                payload: error
            })
        }

    }
}

export const getOder = (order_id: number) => {
    return async (dispatch: Dispatch<OrderActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/oder/get_admin/${order_id}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: OrderActionType.ON_ORDER_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: OrderActionType.GET_ODER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: OrderActionType.ON_ORDER_ERROR,
                payload: error
            })
        }

    }
}

export const updateStatusOder = (order_id: number, product_id: number, status: number) => {
    return async (dispatch: Dispatch<OrderActions>) => {
        const data = {
            order_id: order_id,
            product_id: product_id,
            status: status,
        }
        try {
            const response = await axios.post<any>(`${cansa[1]}/api/oder/change_product/e4611a028c71342a5b083d2cbf59c494`, data)
            if (!response) {
                dispatch({
                    type: OrderActionType.ON_ORDER_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: OrderActionType.UPDATE_STATUS_ORDER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: OrderActionType.ON_ORDER_ERROR,
                payload: error
            })
        }

    }
}