import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'shared/models/products';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input('product') product!: Product;
    @Input('show-actions') showActions = true;
    @Input('shopping-cart') shoppingCart!: ShoppingCart;
    constructor(private shoppingCartService: ShoppingCartService) {}

    ngOnInit(): void {}

    addToCart() {
        this.shoppingCartService.addToCart(this.product);
    }
}
