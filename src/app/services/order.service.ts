import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(
        private db: AngularFireDatabase,
        private cartService: ShoppingCartService
    ) {}

    public async placeOrder(order: any) {
        let res = await this.db.list(`/orders`).push(order);
        this.cartService.clearCart();
        return res;
    }
}
