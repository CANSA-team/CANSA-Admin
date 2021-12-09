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

export interface RemoveUserInfor {
    readonly type: UserActionType.REMOVE_USER_INFO,
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
export interface CreateUser {
    readonly type: UserActionType.CREATE_USER,
    payload?: any
}
export interface Logout {
    readonly type: UserActionType.LOGOUT,
    payload?: string
}

export interface TimeCheckLogin {
    readonly type: UserActionType.TIME_CHECK_LOGIN,
    payload?: number
}

export type UserActions = CheckLogin | UserErrorAction | GetUserInfor | RemoveUserInfor | login | GetAllUser | EditStatus | CreateUser | Logout | TimeCheckLogin;

export const removeUserInfor = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch({
            type: UserActionType.REMOVE_USER_INFO,
            payload: {} as UserModel
        })
    }
}

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
                var time = Math.floor(Date.now() + 1000000)
                dispatch({
                    type: UserActionType.CHECK_LOGIN,
                    payload: response.data.data
                })
                dispatch({
                    type: UserActionType.TIME_CHECK_LOGIN,
                    payload: time
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
                dispatch({
                    type: UserActionType.LOGIN,
                    payload: { data: response.data.data, time: Math.floor(Date.now()) }
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
export const GetAllUser = (option: string = 'asc_id', page: number = 0, numPage: number = 15) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/get/${option}/${page}/${numPage}`)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
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
export const CreateUser = (premisss: string, name: string, password: string, email: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/create/${premisss}/${name}/${password}/${email}/e4611a028c71342a5b083d2cbf59c494`)
            console.log(response.data);
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.CREATE_USER,
                    payload: response.data
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
export const EditStatus = (id: number, status: number) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/update/status/${id}/${status}`)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                let editStatusData: any = { id: id, status: status, ischeck: response.data.data }
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

export const logout = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/logout`, { withCredentials: true })
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                let status = 'success'
                if (response.data.status == 'success') {
                    status = 'Faild';
                }
                // save our location in local storage
                dispatch({
                    type: UserActionType.LOGOUT,
                    payload: status
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