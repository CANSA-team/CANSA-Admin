import { SliderActionType, UserActionType } from "../action-types";
import { UserActions } from "../actions/userActions";
import { UserStage, UserModel } from "../models";


const initialState: UserStage = {
    check: false,
    userInfor: undefined,
    error: undefined,
    dataLogin: undefined,
    userAll: undefined,
    checkEditStatus: undefined,
}

const userReducer = (state: UserStage = initialState, action: UserActions) => {
    switch (action.type) {
        case UserActionType.CHECK_LOGIN:
            return {
                ...state,
                check: action.payload
            }
        case UserActionType.LOGIN:
            return {
                ...state,
                dataLogin: action.payload
            }
        case UserActionType.GET_UER_INFO:
            return {
                ...state,
                userInfor: action.payload
            }
        case UserActionType.GET_ALL_USER:
            return {
                ...state,
                userAll: action.payload
            }
        case UserActionType.EDIT_STATUS:
            return {
                ...state,
                checkEditStatus: action.payload
            }
        case UserActionType.ON_LOGIN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default userReducer;