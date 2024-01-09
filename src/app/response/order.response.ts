import { OrderDetail } from '../models/order.detail';

export interface OrderResponse {
    id: number;
    user_id: number;
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    note: string;
    total_money: number;
    order_date: Date;
    status: string;
    shipping_method: string;
    shipping_address: string;
    shipping_date: Date;
    payment_method: string;
    order_details: OrderDetail[];
}
