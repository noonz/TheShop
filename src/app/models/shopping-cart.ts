import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    constructor(public items: ShoppingCartItem[]) {}

    getItemCount(): number {
        let itemCount = 0;
        for (let productId in this.items) {
            itemCount += this.items[productId].quantity;
        }
        return itemCount;
    }
}
