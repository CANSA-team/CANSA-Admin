import { SliderActionType, UserActionType } from "../action-types";
import { UserActions } from "../actions/userActions";
import { UserStage, UserModel, UserPermissionsModel } from "../models";


const initialState: UserStage = {
    check: false,
    userInfor: {} as UserModel,
    error: undefined,
    dataLogin: undefined,
    userAll: undefined,
    timeSampCheckLogin: 0,
    checkEditStatus: undefined,
    dataCreateUser: undefined,
    userPermission: {} as UserPermissionsModel,
}

const userReducer = (state: UserStage = initialState, action: UserActions) => {
    switch (action.type) {
        case UserActionType.CHECK_LOGIN:
            return {
                ...state,
                check: action.payload
            }
        case UserActionType.TIME_CHECK_LOGIN:
            return {
                ...state,
                timeSampCheckLogin: action.payload
            }
        case UserActionType.LOGIN:
            return {
                ...state,
                dataLogin: action.payload
            }
        case UserActionType.GET_UER_INFO:
        case UserActionType.REMOVE_USER_INFO:
            return {
                ...state,
                userInfor: action.payload
            }
        case UserActionType.GET_ALL_USER:
            return {
                ...state,
                userAll: action.payload
            }
        case UserActionType.CREATE_USER:
            return {
                ...state,
                dataCreateUser: action.payload
            }
        case UserActionType.LOGOUT:
            return {
                ...state,
                dataLogin: action.payload
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
        case UserActionType.GET_PERMISSIONS:
            return {
                ...state,
                userPermission: action.payload
            }
        default:
            return state;

    }
}

export default userReducer;