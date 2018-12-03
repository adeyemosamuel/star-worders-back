import { Injectable } from "@nestjs/common";

@Injectable()
export class OrdersPolicies {

    checkRentability(price, originalPrice, productName) {
        const acceptableValue = (originalPrice / 100) * 10;

        if (price < acceptableValue) {
            throw new Error(`A rentabilidade do item ${productName} está ruim, o mesmo não pode compor o pedido!`);
        }
    }

    checkMultiple(quantity, multiple, productName) {
        if (multiple && (quantity % multiple) !== 0) {
            throw new Error(`O ${productName} só pode ser vendido em múltiplos de ${multiple}.`);
        }
    }
}