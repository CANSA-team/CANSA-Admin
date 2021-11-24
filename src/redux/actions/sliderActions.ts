import { Dispatch } from "redux";
import axios from 'axios';
import { SliderActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface GetSlider {
    readonly type: SliderActionType.GET_ALL_SLIDER,
    payload?: any
}

export interface CreateSlider {
    readonly type: SliderActionType.CREATE_SLIDER,
    payload?: any
}

export interface DeleteSlider {
    readonly type: SliderActionType.DELETE_SLIDER,
    payload?: any
}

export interface UpdateSlider {
    readonly type: SliderActionType.UPDATE_SLIDER,
    payload?: any
}

export interface SliderErrorAction {
    readonly type: SliderActionType.ON_SLIDER_ERROR,
    payload: any
}

export type SliderActions = GetSlider | SliderErrorAction | CreateSlider | DeleteSlider | UpdateSlider;

export const getSlider = () => {
    return async (dispatch: Dispatch<SliderActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[0]}/api/slider/all/1/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: SliderActionType.ON_SLIDER_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: SliderActionType.GET_ALL_SLIDER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: SliderActionType.ON_SLIDER_ERROR,
                payload: error
            })
        }

    }
}

export const createSlider = (slider_image: number, slider_title: string) => {
    return async (dispatch: Dispatch<SliderActions>) => {
        try {
            const data = {
                slider_image: slider_image,
                slider_title: slider_title,
            }
            const response = await axios.post<any>(`${cansa[0]}/api/slider/insert/e4611a028c71342a5b083d2cbf59c494`, data)
            if (!response) {
                dispatch({
                    type: SliderActionType.ON_SLIDER_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: SliderActionType.CREATE_SLIDER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: SliderActionType.ON_SLIDER_ERROR,
                payload: error
            })
        }

    }
}

export const updateSlider = (slider_id: number, slider_image: number, slider_title: string, last_update: number, status: number) => {
    return async (dispatch: Dispatch<SliderActions>) => {
        try {
            const data = {
                slider_image: slider_image,
                slider_title: slider_title,
                last_update: last_update,
                status: status,
            }
            const response = await axios.post<any>(`${cansa[0]}/api/slider/update/${slider_id}/e4611a028c71342a5b083d2cbf59c494`, data)
            if (!response) {
                dispatch({
                    type: SliderActionType.ON_SLIDER_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: SliderActionType.UPDATE_SLIDER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: SliderActionType.ON_SLIDER_ERROR,
                payload: error
            })
        }

    }
}

export const deleteSlider = (slider_id: number) => {
    return async (dispatch: Dispatch<SliderActions>) => {
        try {
            const data = {
                slider_id: slider_id,
            }
            const response = await axios.post<any>(`${cansa[0]}/api/slider/remove/e4611a028c71342a5b083d2cbf59c494`, data)
            if (!response) {
                dispatch({
                    type: SliderActionType.ON_SLIDER_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: SliderActionType.DELETE_SLIDER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: SliderActionType.ON_SLIDER_ERROR,
                payload: error
            })
        }

    }
}
    