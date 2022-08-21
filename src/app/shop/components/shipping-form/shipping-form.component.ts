import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
    selector: 'app-shipping-form',
    templateUrl: './shipping-form.component.html',
    styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
    @Input('cart') cart!: ShoppingCart;
    public shipping: any = {};
    public subscriptions: Subscription[] = [];
    public userId!: string;

    constructor(
        private router: Router,
        private orderService: OrderService,
        private authService: AuthService
    ) {
        this.subscriptions.push(
            this.authService.user$.subscribe(
                (user) => (this.userId = user!.uid)
            )
        );
    }

    ngOnInit(): void {}

    public async placeOrder() {
        let order = new Order(this.userId, this.shipping, this.cart);
        let res = await this.orderService.placeOrder(order);
        this.router.navigate(['/order-success', res.key]);
    }
}
