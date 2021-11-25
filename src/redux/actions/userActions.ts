import { Dispatch } from "redux";
import { UserModel } from "../models";
import axios from 'axios';
import { UserActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface CheckLogin {
    readonly type: UserActionType.CHECK_LOGIN,
    payload?: boolean,
}
export interface login {
    readonly type: UserActionType.LOGIN,
    payload?: any,
}

export interface UserErrorAction {
    readonly type: UserActionType.ON_LOGIN_ERROR,
    payload: any
}

export interface GetUserInfor {
    readonly type: UserActionType.GET_UER_INFO,
    payload?: UserModel
}
export interface GetAllUser {
    readonly type: UserActionType.GET_ALL_USER,
    payload?: UserModel
}
export interface EditStatus {
    readonly type: UserActionType.EDIT_STATUS,
    payload?: UserModel
}
export type UserActions = CheckLogin | UserErrorAction | GetUserInfor | login | GetAllUser | EditStatus;

export const checkLogin = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/check/login`)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.CHECK_LOGIN,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}
export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const data = {
                email: email,
                password: password,
            }
            const response = await axios.post<any>(`${cansa[1]}/api/user/login/admin/e4611a028c71342a5b083d2cbf59c494`, data, { withCredentials: true })
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.LOGIN,
                    payload: response.data.data
                })
            }
        } catch (error) {
            dispatch({
                type: UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}
export const GetAllUser = (option: string, page: number, numPage: number) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/get/${option}/${page}/${numPage}`)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.GET_ALL_USER,
                    payload: response.data.data
                })
            }
        } catch (error) {
            dispatch({
                type: UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}

export const getUserInfo = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/get/user`)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.GET_UER_INFO,
                    payload: response.data.data
                })
            }
        } catch (error) {
            dispatch({
                type: UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}
export const EditStatus = (id:number,status:number) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/update/status/${id}/${status}`)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                let editStatusData:any = {id:id,status:status,ischeck:response.data.data}
                dispatch({
                    type: UserActionType.EDIT_STATUS,
                    payload: editStatusData
                })
            }
        } catch (error) {
            dispatch({
                type: UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}