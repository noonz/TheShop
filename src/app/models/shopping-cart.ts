import { Product } from './products';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        for (let productId in this.itemsMap) {
            let item = this.itemsMap[productId];

            this.items.push(
                new ShoppingCartItem({
                    ...item,
                    key: productId
                })
            );
        }
    }

    public getQuantity(product: Product): number {
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }

    get getItemCount(): number {
        let itemCount = 0;
        for (let productId in this.itemsMap) {
            itemCount += this.itemsMap[productId].quantity;
        }
        return itemCount;
    }

    get totalPrice(): number {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }
}
