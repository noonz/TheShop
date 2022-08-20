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
            .object<ShoppingCart>(`/shopping-carts/${cartId}`)
            .valueChanges()
            .pipe(
                map((cart) => {
                    return new ShoppingCart(cart!.items);
                })
            );
    }

    addToCart(product: Product) {
        this.updateItems(product, 1);
    }

    removeFromCart(product: Product) {
        this.updateItems(product, -1);
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
        let item = this.getItem(cartId!, product.key!);
        item.valueChanges()
            .pipe(take(1))
            .subscribe((cartItem: any) => {
                item.update({
                    product: product,
                    quantity: (cartItem?.quantity || 0) + change
                });
            });
    }
}
