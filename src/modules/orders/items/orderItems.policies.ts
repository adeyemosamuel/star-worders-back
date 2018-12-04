import { Injectable, UnprocessableEntityException } from "@nestjs/common";

@Injectable()
export class OrderItemsPolicies {

    checkRentability(price: number, originalPrice: number, productName: string): void {
        const acceptableValue = originalPrice - (originalPrice / 100) * 10;

        if (price < acceptableValue) {
            throw new UnprocessableEntityException(
                `A rentabilidade do item ${productName} está ruim, o mesmo não pode compor o pedido!`
            );
        }
    }

    checkMultiple(quantity: number, multiple: number, productName: string): void {
        if (multiple && (quantity % multiple) !== 0) {
            throw new UnprocessableEntityException(
                `O ${productName} só pode ser vendido em múltiplos de ${multiple}.`
            );
        }
    }
}