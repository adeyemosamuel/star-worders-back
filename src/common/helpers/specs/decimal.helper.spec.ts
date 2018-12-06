import { countDecimals } from '../decimal.helper';

describe('Decimal Helper Tests', () => {
    it('should return the number of decimal places', () => {
        let value = 500.22;

        expect(countDecimals(value)).toEqual(2);

        value = 500.23698;

        expect(countDecimals(value)).toEqual(5);

        value = 100.20;

        expect(countDecimals(value)).toEqual(1);

        value = 10;

        expect(countDecimals(value)).toEqual(0);
    });
});