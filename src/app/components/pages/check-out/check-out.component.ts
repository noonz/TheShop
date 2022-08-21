import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
    shipping: any = {};
    userId!: string;
    cart!: ShoppingCart;
    subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private cartService: ShoppingCartService,
        private orderService: OrderService,
        private authService: AuthService
    ) {}
    async ngOnInit() {
        let cart$ = await this.cartService.getCart();
        this.subscriptions.push(cart$.subscribe((cart) => (this.cart = cart)));
        this.subscriptions.push(
            this.authService.user$.subscribe(
                (user) => (this.userId = user!.uid)
            )
        );
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach((sub) => {
                sub.unsubscribe();
            });
        }
    }

    public async placeOrder() {
        let order = new Order(this.userId, this.shipping, this.cart);
        let res = await this.orderService.placeOrder(order);
        this.router.navigate(['/order-success', res.key]);
    }
}
