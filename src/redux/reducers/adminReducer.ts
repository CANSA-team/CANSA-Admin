import { AdminActionType } from "../action-types";
import { AdminActions } from "../actions/adminActions";
import { AdminState, RevenueModel, CommissionModel, ShipModel, AccessModel,ComplaintModel } from "../models";

const initialState: AdminState = {
    revenue_list: [] as RevenueModel[],
    commission_rate: {} as CommissionModel,
    ship_price: {} as ShipModel,
    access_list: [] as AccessModel[],
    complantList: [] as ComplaintModel[],
    error: undefined
}

const productReducer = (state: AdminState = initialState, action: AdminActions) => {
    switch (action.type) {
        case AdminActionType.GET_ACCESS:
            return {
                ...state,
                access_list: action.payload
            }
        case AdminActionType.GET_REVENUE:
            return {
                ...state,
                revenue_list: action.payload
            }
        case AdminActionType.GET_COMMISSION:
        case AdminActionType.UPDATE_COMMISSION:
            return {
                ...state,
                commission_rate: action.payload
            }
        case AdminActionType.GET_SHIP:
        case AdminActionType.UPDATE_SHIP:
            return {
                ...state,
                ship_price: action.payload
            }
        case AdminActionType.GET_COMPLAINT:
            return {
                ...state,
                complantList : action.payload
            }
        default:
            return state;
    }
}

export default productReducer;