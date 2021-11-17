export enum ProductActionType {
    GET_PRODUCT_LIST = 'GET_PRODUCT_LIST',
    ON_PRODUCT_ERROR = 'ON_PRODUCT_ERROR',
    GET_PRODUCT_SHOP = 'GET_PRODUCT_SHOP',
    UPDATE_PRODUCT_STATUS = 'UPDATE_PRODUCT_STATUS'
}

export enum AdminActionType {
    GET_COMMISSION = 'GET_COMMISSION',
    UPDATE_COMMISSION = 'UPDATE_COMMISSION',
    GET_SHIP = 'GET_SHIP',
    UPDATE_SHIP = 'UPDATE_SHIP',
    GET_REVENUE = 'GET_REVENUE',
    GET_ACCESS = 'GET_ACCESS',
    GET_COMPLAINT = 'GET_COMPLAINT',
    ON_ADMIN_ERROR = 'ON_ADMIN_ERROR',
}

export enum ShopActionType {
    GET_SHOP_LIST = 'GET_SHOP_LIST',
    UPDATE_STATUS_SHOP = 'UPDATE_STATUS_SHOP',
    GET_SHOP_INFO = 'GET_SHOP_INFO',
    ON_SHOP_ERROR = 'ON_SHOP_ERROR',
}

export enum SliderActionType {
    GET_ALL_SLIDER = 'GET_ALL_SLIDER',
    UPDATE_SLIDER = 'UPDATE_SLIDER',
    CREATE_SLIDER = 'CREATE_SLIDER',
    DELETE_SLIDER = 'DELETE_SLIDER',
    ON_SLIDER_ERROR = 'ON_SHOP_ERROR',
}

export enum CategoryActionType {
    GET_ALL_CATEGORY = 'GET_ALL_CATEGORY',
    CREATE_CATEGORY = 'CREATE_CATEGORY',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY',
    DELETE_CATEGORY = 'DELETE_CATEGORY',
    ON_CATEGORY_ERROR = 'ON_CATEGORY_ERROR'
}

export enum OrderActionType {
    GET_ALL_ORDER = 'GET_ALL_ORDER',
    UPDATE_STATUS_ORDER = 'UPDATE_STATUS_ORDER',
    UPDATE_STATUS_ORDER_LIST = 'UPDATE_STATUS_ORDER_LIST',
    GET_ODER = 'GET_ODER',
    ON_ORDER_ERROR = 'ON_ORDER_ERROR'
}
