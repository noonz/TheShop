import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {
    constructor(private db: AngularFireDatabase) {}

    private create() {
        return this.db.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        });
    }

    private getCart(cardId: string) {
        return this.db.object(`/shopping-carts/${cardId}`);
    }

    private async getOrCreateCartId() {
        let cartId = localStorage.getItem('cardId');
        if (!cartId) {
            let res = await this.create();
            localStorage.setItem('cardId', res.key!);
            return res.key;
        }

        return cartId;
    }

    async addToCart(product: Product) {
        let cartId = await this.getOrCreateCartId();
        let item = this.db.object(
            `/shopping-carts/${cartId}/items/${product.key}`
        );
        item.valueChanges()
            .pipe(take(1))
            .subscribe((cartItem: any) => {
                let quantity = (cartItem?.quantity || 0)
                if (cartItem) {
                    item.update({
                        quantity: quantity + 1
                    })
                } else {
                    item.set({
                        product: product, quantity: 1
                    });
                }

            });
    }
}
