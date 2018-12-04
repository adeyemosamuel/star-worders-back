import { orderItemDto } from "./items/orderItem.dto";

export interface orderDto {
    customer_id: number;
    items: orderItemDto[];
}