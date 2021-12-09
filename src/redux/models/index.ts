export interface ProductModel {
    product_id: number;
    product_date: Date;
    shop_id: number;
    product_avatar: string;
    product_quantity: number;
    product_view: number;
    product_price: number;
    product_sale: number;
    product_title: string;
    product_image: string[];
    product_description: string;
    product_rating: number;
    last_update: number;
    product_image_id: number[];
    product_avatar_id: number;
    status: number;
}

export interface ProductState {
    productList: ProductModel[];
    productShop: ProductModel[];
    error: string | undefined;
}

export interface RevenueModel {
    revenue_id: number,
    revenue_month: number,
    revenue_year: number,
    revenue_seasion: number,
    revenue_money: number,
}

export interface AdminState {
    revenue_list: RevenueModel[];
    commission_rate: CommissionModel;
    ship_price: ShipModel;
    access_list: AccessModel[];
    complantList: ComplaintModel[];
    error: string | undefined;
}

export interface ShopModel {
    shop_id: number;
    shop_name: string;
    shop_description: string;
    shop_owner: number;
    shop_avatar: string;
    last_update: number;
    status: number;
    shop_avatar_id: number;
}
export interface UserModel {
    user_permission: number;
    user_id: number;
    user_phone: string;
    user_email: string;
    user_key: null;
    user_name: string;
    user_avatar: string;
    user_status: number;
    user_last_update: number;
    user_real_name: string;
    user_birthday: Date;
    user_avatar_image: string;
}

export interface ChangeStatus {
    status: string;
    data: number;
    message: string;
}

export interface CommissionModel {
    commission_rate: number;
    last_update: number;
}

export interface AccessModel {
    id: number;
    access_times: number;
    year: number;
    month: number;
    season: number;
}

export interface ShipModel {
    ship_price: number;
    last_update: number;
}

export interface ImageId {
    id: number;
}

export interface ShopState {
    info: ShopModel;
    shopList: ShopModel[];
    error: string | undefined;
}

export interface SliderModel {
    slider_id: number;
    slider_image_id: number;
    status: number;
    slider_title: string;
    slider_image: string;
    last_update: number;
}

export interface SliderState {
    slider: SliderModel[];
    error: string | undefined;
}

export interface CategoryModel {
    category_id: number;
    category_image: string;
    category_view: number;
    category_name: string;
    last_update: number;
    status: number;
    category_category: number | null;
    category_image_id: number;
    categories: any[];
}

export interface CategoryState {
    categories: CategoryModel[];
    error: string | undefined;
}

export interface ComplaintModel {
    complaint_id: number;
    complaint_content: string;
    product_id: number;
    shop_id: number;
    product_avatar: string;
    product_price: number;
    product_title: string;
    shop_info: ShopModel;
}

export interface OrderModel {
    oder_id: number;
    oder_address: string;
    oder_phone: string;
    oder_date: Date;
    oder_customer: OrderUserModel;
    status: number;
    product_oder: ProductOrderModel[];
}

export interface ProductOrderModel {
    oder_id: number;
    product_id: number;
    shop_id: number;
    product_quantity: number;
    status: number;
    product: OrderItemModel;
}

export interface OrderItemModel {
    product_title: string;
    product_price: number;
    product_sale: number;
    product_avatar: string;
}

export interface OrderUserModel {
    user_id: number;
    user_key: number;
    user_name: string;
    user_avatar: number;
    user_status: number;
    user_last_update: number;
    user_full_name: string;
}

export interface OrderState {
    orderList: OrderModel[];
    order: OrderModel;
    error: string | undefined;
}

export interface UserStage {
    check: boolean;
    timeSampCheckLogin: number;
    userInfor: UserModel;
    error: string | undefined;
    dataLogin: any;
    userAll: any;
    checkEditStatus: any;
    dataCreateUser: any;
}