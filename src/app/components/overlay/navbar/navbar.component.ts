import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    appUser!: AppUser;
    subscriptions: Subscription[] = [];
    itemCount: number = 0;
    cart$!: Observable<ShoppingCart>;

    constructor(
        private auth: AuthService,
        private cartService: ShoppingCartService
    ) {}

    async ngOnInit() {
        this.subscriptions.push(
            this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser!))
        );
        this.cart$ = await this.cartService.getCart();
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((sub) => {
                sub.unsubscribe();
            });
        }
    }

    logout(): void {
        this.auth.logout();
    }
}
