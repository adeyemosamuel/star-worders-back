import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { countDecimals } from '../../../common/helpers/decimal.helper';

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

    checkQuantity(quantity: number, productName: string): void {
        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new UnprocessableEntityException(
                `A quantidade do ${productName} deve ser um número inteiro e maior que zero.`
            );
        }
    }

    checkUnitPrice(price: number, productName: string): void {
        if (countDecimals(price) > 2 || price < 0) {
            throw new UnprocessableEntityException(
                `O preço unitário do ${productName} deve possuir até 2 casas decimais e ser um número maior do que zero.`
            );
        }
    }
}