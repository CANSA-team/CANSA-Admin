import { CategoryActionType } from "../action-types";
import { CategoryActions } from "../actions/categoryActions";
import { CategoryModel, CategoryState } from "../models";


const initialState: CategoryState = {
    categories: [] as CategoryModel[],
    error: undefined
}

const categoryReducer = (state: CategoryState = initialState, action: CategoryActions) => {
    switch (action.type) {
        case CategoryActionType.GET_ALL_CATEGORY:
        case CategoryActionType.CREATE_CATEGORY:
        case CategoryActionType.UPDATE_CATEGORY:
        case CategoryActionType.DELETE_CATEGORY:
            return {
                ...state,
                categories: action.payload
            }
        case CategoryActionType.ON_CATEGORY_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default categoryReducer;