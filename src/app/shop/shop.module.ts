import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingFormComponent } from 'app/shop/components/shipping-form/shipping-form.component';
import { OrderSummaryComponent } from 'app/shop/components/order-summary/order-summary.component';
import { ProductFilterComponent } from 'app/core/components/product-filter/product-filter.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

@NgModule({
    declarations: [
        ProductsComponent,
        ShoppingCartComponent,
        CheckOutComponent,
        OrderSuccessComponent,
        MyOrdersComponent,
        ProductFilterComponent,
        OrderSummaryComponent,
        ShippingFormComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'products', component: ProductsComponent },
            { path: 'shopping-cart', component: ShoppingCartComponent },
            {
                path: 'orders',
                component: MyOrdersComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'check-out',
                component: CheckOutComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'order-success/:id',
                component: OrderSuccessComponent,
                canActivate: [AuthGuardService]
            }
        ])
    ]
})
export class ShopModule {}
