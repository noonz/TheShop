import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

    public placeOrder() {
        let order = {
            userId: this.userId,
            datePlaced: new Date().getTime(),
            shipping: this.shipping,
            items: this.cart.items.map((item) => {
                return {
                    product: {
                        title: item.title,
                        imageUrl: item.imageUrl,
                        price: item.price
                    },
                    quantity: item.quantity,
                    total: item.totalPrice
                };
            })
        };

        this.orderService.storeOrder(order);
    }
}
