import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'shared/models/products';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
    @Input('product') product!: Product;
    @Input('shopping-cart') shoppingCart!: ShoppingCart;
    constructor(private shoppingCartService: ShoppingCartService) {}

    ngOnInit(): void {}

    addToCart() {
        this.shoppingCartService.addToCart(this.product);
    }

    removeFromCart() {
        this.shoppingCartService.removeFromCart(this.product);
    }

}
