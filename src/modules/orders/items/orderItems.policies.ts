import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { OrderItem } from "./orderItem.entity";
import { Product } from "../../products/product.entity";

@Injectable()
export class OrderItemsPolicies {

    protected checkRentability(price, originalPrice, productName) {
        const acceptableValue = (originalPrice / 100) * 10;

        if (price < acceptableValue) {
            throw new UnprocessableEntityException(`A rentabilidade do item ${productName} está ruim, o mesmo não pode compor o pedido!`);
        }
    }

    protected checkMultiple(quantity, multiple, productName) {
        if (multiple && (quantity % multiple) !== 0) {
            throw new UnprocessableEntityException(`O ${productName} só pode ser vendido em múltiplos de ${multiple}.`);
        }
    }

    execute(item: OrderItem, product: Product) {
        this.checkRentability(item.unit_price, product.unit_price, product.name);
        this.checkMultiple(item.quantity, product.multiple, product.name);
    }
}