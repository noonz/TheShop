import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Product } from 'src/app/models/products';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    filteredProducts!: Product[];
    subscription!: Subscription;
    categories$!: any;
    category!: string;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.subscription = this.productService
            .getAll()
            .pipe(
                map((changes) =>
                    changes.map((c) => {
                        return {
                            key: c.payload.key!,
                            ...(c.payload.val() as Product)
                        };
                    })
                )
            )
            .subscribe(
                (products) => (
                    (this.products = products),
                    this.route.queryParamMap.subscribe((params) => {
                        this.category = params.get('category')!;
                        this.filteredProducts = this.category
                            ? this.products.filter(
                                  (p) => p.category === this.category
                              )
                            : this.products;
                    })
                )
            );

        this.categories$ = this.categoryService.getAll();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
