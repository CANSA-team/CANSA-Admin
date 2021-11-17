import { ProductActionType } from "../action-types";
import { ProductActions } from "../actions/productActions";
import { ProductModel, ProductState, ChangeStatus } from "../models";


const initialState: ProductState = {
    productList: [] as ProductModel[],
    productShop: [] as ProductModel[],
    update_status: {} as ChangeStatus,
    error: undefined
}

const productReducer = (state: ProductState = initialState, action: ProductActions) => {
    switch (action.type) {
        case ProductActionType.GET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload
            }
        case ProductActionType.GET_PRODUCT_SHOP:
            return {
                ...state,
                productShop: action.payload
            }
        case ProductActionType.UPDATE_PRODUCT_STATUS:
            return {
                ...state,
                update_status: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;
