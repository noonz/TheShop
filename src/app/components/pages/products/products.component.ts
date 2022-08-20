import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    filteredProducts!: Product[];
    subscription: Subscription[] = [];
    category!: string;
    cart: any;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private shoppingCartService: ShoppingCartService
    ) {}

    async ngOnInit() {
        this.subscription.push(
            this.productService
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
                )
        );

        this.subscription.push(
            (await this.shoppingCartService.getCart()).subscribe(cart => {
                this.cart = cart;
            })
        );
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.forEach(sub => {
                sub.unsubscribe();
            });
        }
    }
}
