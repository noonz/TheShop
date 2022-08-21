import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
    @Input('cart') cart!: ShoppingCart;
    constructor() {}

    ngOnInit(): void {}
}
