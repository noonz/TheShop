import { Injectable } from '@angular/core';
import {
    AngularFireDatabase,
    AngularFireList
} from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Order } from '../models/order';
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

    getOrders() {
        return this.db
            .list<AngularFireList<Order>>('/orders')
            .snapshotChanges()
            .pipe(
                map((changes) =>
                    changes.map((c) => {
                        return { key: c.payload.key, ...c.payload.val() };
                    })
                )
            );
    }

    getOrdersByUser(userId: string) {
        return this.db
            .list<Order[]>('/orders', (ref) =>
                ref.orderByChild('userId').equalTo(userId)
            )
            .snapshotChanges()
            .pipe(
                map((data) =>
                    data.map((c) => {
                        return { key: c.payload.key, ...c.payload.val() };
                    })
                )
            );
    }
}
