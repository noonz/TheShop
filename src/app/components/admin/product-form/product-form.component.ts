import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
    categories$: any;

    constructor(
        public categoryService: CategoryService,
        private productService: ProductService
    ) {
        this.categories$ = categoryService.getCategories();
    }

    save(product: any): void {
        this.productService.create(product);
    }

    ngOnInit(): void {
    }

}
