import { Dispatch } from "redux";
import axios from 'axios';
import { AdminActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface GetAccessAction {
    readonly type: AdminActionType.GET_ACCESS,
    payload: any
}

export interface AdminErrorAction {
    readonly type: AdminActionType.ON_ADMIN_ERROR,
    payload: any
}

export interface GetRevenueAction {
    readonly type: AdminActionType.GET_REVENUE,
    payload: any
}

export interface UpdateCommissionAction {
    readonly type: AdminActionType.UPDATE_COMMISSION,
    payload: any
}

export interface GetCommissionAction {
    readonly type: AdminActionType.GET_COMMISSION,
    payload: any
}

export interface UpdateShipAction {
    readonly type: AdminActionType.UPDATE_SHIP,
    payload: any
}

export interface GetComplaintAction {
    readonly type: AdminActionType.GET_COMPLAINT,
    payload: any
}

export interface GetShipAction {
    readonly type: AdminActionType.GET_SHIP,
    payload: any
}

export type AdminActions = GetAccessAction | AdminErrorAction | GetRevenueAction | UpdateCommissionAction | GetCommissionAction | UpdateShipAction | GetShipAction | GetComplaintAction;

export const getAccess = () => {
    return async (dispatch: Dispatch<AdminActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/access/get/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: AdminActionType.ON_ADMIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: AdminActionType.GET_ACCESS,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: AdminActionType.ON_ADMIN_ERROR,
                payload: error
            })
        }

    }
}

export const getRevenue = () => {
    return async (dispatch: Dispatch<AdminActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/revenue/get/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: AdminActionType.ON_ADMIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: AdminActionType.GET_REVENUE,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: AdminActionType.ON_ADMIN_ERROR,
                payload: error
            })
        }

    }
}

export const updateCommission = (commission_rate: number, last_update: number) => {
    return async (dispatch: Dispatch<AdminActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/commission/update/${commission_rate}/${last_update}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: AdminActionType.ON_ADMIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: AdminActionType.UPDATE_COMMISSION,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: AdminActionType.ON_ADMIN_ERROR,
                payload: error
            })
        }

    }
}

export const getCommission = () => {
    return async (dispatch: Dispatch<AdminActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/commission/get/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: AdminActionType.ON_ADMIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: AdminActionType.GET_COMMISSION,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: AdminActionType.ON_ADMIN_ERROR,
                payload: error
            })
        }

    }
}

export const updateShip = (ship_price: number, last_update: number) => {
    return async (dispatch: Dispatch<AdminActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/ship/update/${ship_price}/${last_update}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: AdminActionType.ON_ADMIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: AdminActionType.UPDATE_SHIP,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: AdminActionType.ON_ADMIN_ERROR,
                payload: error
            })
        }

    }
}

export const getShip = () => {
    return async (dispatch: Dispatch<AdminActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/ship/get/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: AdminActionType.ON_ADMIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: AdminActionType.GET_SHIP,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: AdminActionType.ON_ADMIN_ERROR,
                payload: error
            })
        }

    }
}

export const getComplaint = (page: number = 1) => {
    return async (dispatch: Dispatch<AdminActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/complaint/all/${page}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: AdminActionType.ON_ADMIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: AdminActionType.GET_COMPLAINT,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: AdminActionType.ON_ADMIN_ERROR,
                payload: error
            })
        }

    }
}
