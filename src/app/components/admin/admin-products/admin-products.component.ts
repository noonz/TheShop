import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    products!: Product[];
    filteredProducts!: Product[];
    subscription!: Subscription;

    dtOptions: DataTables.Settings = {};
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject<any>();

    constructor(private productService: ProductService) {
        this.subscription = this.productService
            .getAll()
            .subscribe(
                (products) => (this.filteredProducts = this.products = products)
            );
    }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2
        };
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.dtTrigger.unsubscribe();
    }

    filter(query: string) {
        this.filteredProducts = query
            ? this.products.filter((p) =>
                  p.title.toLowerCase().includes(query.toLowerCase())
              )
            : this.products;
    }
}
