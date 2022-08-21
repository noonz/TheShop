import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, take } from 'rxjs';
import { Product } from '../models/products';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {
    constructor(private db: AngularFireDatabase) {}

    public async getCart(): Promise<Observable<ShoppingCart>> {
        let cartId = await this.getOrCreateCartId();
        return this.db
            .object(`/shopping-carts/${cartId}`)
            .valueChanges()
            .pipe(
                map((cart: any) => {
                    return new ShoppingCart(cart.items);
                })
            );
    }

    public async addToCart(product: Product) {
        this.updateItems(product, 1);
    }

    public async removeFromCart(product: Product) {
        this.updateItems(product, -1);
    }

    public async clearCart() {
        let cartId = await this.getOrCreateCartId();
        this.db.object(`/shopping-carts/${cartId}/items`).remove();
    }

    private create() {
        return this.db.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        });
    }

    private getItem(cartId: string, productId: string) {
        return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
    }

    private async getOrCreateCartId(): Promise<string> {
        let cartId = localStorage.getItem('cardId');
        if (!cartId) {
            let res = await this.create();
            localStorage.setItem('cardId', res.key!);
            return res.key!;
        }

        return cartId;
    }

    private async updateItems(product: Product, change: number) {
        let cartId = await this.getOrCreateCartId();
        let item = this.getItem(cartId!, product.key);
        item.valueChanges()
            .pipe(take(1))
            .subscribe((cartItem: any) => {
                let quantity = (cartItem?.quantity || 0) + change;
                if (quantity === 0) {
                    item.remove();
                } else {
                    item.update({
                        title: product.title,
                        imageUrl: product.imageUrl,
                        price: product.price,
                        quantity: quantity
                    });
                }
            });
    }
}
