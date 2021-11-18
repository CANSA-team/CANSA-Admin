import { OrderActions } from "..";
import { OrderActionType } from "../action-types";
import { OrderState, OrderModel } from "../models";

const initialState: OrderState = {
    orderList: [] as OrderModel[],
    order: {} as OrderModel,
    error: undefined
}

const productReducer = (state: OrderState = initialState, action: OrderActions) => {
    switch (action.type) {
        case OrderActionType.GET_ALL_ORDER:
        case OrderActionType.UPDATE_STATUS_ORDER_LIST:
            return {
                ...state,
                orderList: action.payload
            }
        case OrderActionType.ON_ORDER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case OrderActionType.UPDATE_STATUS_ORDER:
        case OrderActionType.GET_ODER:
            return {
                ...state,
                order: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;