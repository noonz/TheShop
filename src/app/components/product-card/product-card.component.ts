import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input('product') product!: Product;
    @Input('show-actions') showActions = true;
    constructor() {}

    ngOnInit(): void {}
}
