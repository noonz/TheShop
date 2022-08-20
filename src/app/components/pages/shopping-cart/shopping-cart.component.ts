import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
    public cart$!: Observable<ShoppingCart>;
    constructor(private cartService: ShoppingCartService) {}

    async ngOnInit() {
        this.cart$ = await this.cartService.getCart();
    }
}
