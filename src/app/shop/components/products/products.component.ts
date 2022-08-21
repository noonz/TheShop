import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Product } from 'shared/models/products';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

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
    cart$!: Observable<ShoppingCart>;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private cartService: ShoppingCartService
    ) {}

    async ngOnInit() {
        this.generateProducts();
        this.cart$ = await this.cartService.getCart();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.forEach((sub) => {
                sub.unsubscribe();
            });
        }
    }

    private generateProducts() {
        this.subscription.push(
            this.productService
                .getAll()
                .pipe(
                    map((changes) =>
                        changes.map((c) => {
                            return {
                                key: c.payload.key!,
                                ...(c.payload.val() as {
                                    title: string;
                                    price: number;
                                    category: string;
                                    imageUrl: string;
                                })
                            };
                        })
                    )
                )
                .subscribe(
                    (products) => (
                        (this.products = products),
                        this.route.queryParamMap.subscribe((params) => {
                            this.category = params.get('category')!;
                            this.applyFilter();
                        })
                    )
                )
        );
    }

    private applyFilter() {
        this.filteredProducts = this.category
            ? this.products.filter((p) => p.category === this.category)
            : this.products;
    }
}
