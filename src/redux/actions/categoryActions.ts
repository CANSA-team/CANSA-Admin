import { Dispatch } from "redux";
import { CategoryModel } from "../models";
import axios from 'axios';
import { CategoryActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface GetCategory {
    readonly type: CategoryActionType.GET_ALL_CATEGORY,
    payload?: any
}

export interface CreateCategory {
    readonly type: CategoryActionType.CREATE_CATEGORY,
    payload?: any
}

export interface UpdateCategory {
    readonly type: CategoryActionType.UPDATE_CATEGORY,
    payload?: any
}

export interface DeleteCategory {
    readonly type: CategoryActionType.DELETE_CATEGORY,
    payload?: any
}

export interface CategoryErrorAction {
    readonly type: CategoryActionType.ON_CATEGORY_ERROR,
    payload: any
}

export type CategoryActions = GetCategory | CategoryErrorAction | CreateCategory | UpdateCategory | DeleteCategory;

export const getCategory = () => {
    return async (dispatch: Dispatch<CategoryActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/category/all/1/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: CategoryActionType.ON_CATEGORY_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: CategoryActionType.GET_ALL_CATEGORY,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: CategoryActionType.ON_CATEGORY_ERROR,
                payload: error
            })
        }

    }
}

export const createCategory = (category_image: number, category_name: string, category_category: number | null) => {
    return async (dispatch: Dispatch<CategoryActions>) => {
        try {
            const data = {
                category_image: category_image,
                category_name: category_name,
                category_category: category_category
            }
            const response = await axios.post<any>(`${cansa[1]}/api/category/insert/e4611a028c71342a5b083d2cbf59c494`, data)
            if (!response) {
                dispatch({
                    type: CategoryActionType.ON_CATEGORY_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: CategoryActionType.CREATE_CATEGORY,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: CategoryActionType.ON_CATEGORY_ERROR,
                payload: error
            })
        }

    }
}

export const updateCategory = (category_image: number, category_name: string, category_category: number | null, last_update: number, category_id: number) => {
    return async (dispatch: Dispatch<CategoryActions>) => {
        try {
            const data = {
                category_image: category_image,
                category_name: category_name,
                category_category: category_category,
                category_id: category_id,
                last_update: last_update,
            }
            const response = await axios.post<any>(`${cansa[1]}/api/category/update/e4611a028c71342a5b083d2cbf59c494`, data)
            if (!response) {
                dispatch({
                    type: CategoryActionType.ON_CATEGORY_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: CategoryActionType.UPDATE_CATEGORY,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: CategoryActionType.ON_CATEGORY_ERROR,
                payload: error
            })
        }

    }
}

export const deleteCategory = (category_id: number) => {
    return async (dispatch: Dispatch<CategoryActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/remove/${category_id}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: CategoryActionType.ON_CATEGORY_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: CategoryActionType.DELETE_CATEGORY,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: CategoryActionType.ON_CATEGORY_ERROR,
                payload: error
            })
        }

    }
}