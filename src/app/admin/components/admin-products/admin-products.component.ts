import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, Subscription } from 'rxjs';
import { Product } from 'shared/models/products';
import { ProductService } from 'shared/services/product.service';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    products!: Product[];
    subscription!: Subscription;

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    constructor(private productService: ProductService) {
        this.subscription = this.productService
            .getAll()
            .pipe(
                map((changes) =>
                    changes.map((c) => {
                        this.dtTrigger.next(null);
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
            .subscribe((products) => (this.products = products));
    }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            retrieve: true
        };
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.dtTrigger.unsubscribe();
    }
}
