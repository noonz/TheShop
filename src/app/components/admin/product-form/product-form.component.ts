import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
    categories$: any;
    product: any = {};
    productId!: string;

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.categories$ = this.categoryService.getCategories();
        this.loadItem();
    }

    save(product: any): void {
        if (this.productId) {
            this.productService.updateItem(this.productId, this.product);
        } else {
            this.productService.create(product);
        }
        this.router.navigate(['/admin/products']);
    }

    delete() {
        if (confirm('Are you sure?')) {
            this.productService.deleteItem(this.productId);
            this.router.navigate(['/admin/products']);
        }
    }

    loadItem() {
        this.productId = this.route.snapshot.paramMap.get('id')!;
        console.log(this.productId);
        if (this.productId) {
            this.productService
                .getItem(this.productId)
                .valueChanges()
                .pipe(take(1))
                .subscribe((p) => (this.product = p));
        }
    }

    ngOnInit(): void {}
}
