import { NgModule } from '@angular/core';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';

@NgModule({
    declarations: [
        AdminProductsComponent,
        ProductFormComponent,
        AdminOrdersComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        RouterModule.forChild([
            {
                path: 'admin/products/new',
                component: ProductFormComponent,
                canActivate: [AuthGuardService, AdminAuthGuardService]
            },
            {
                path: 'admin/products/:id',
                component: ProductFormComponent,
                canActivate: [AuthGuardService, AdminAuthGuardService]
            },
            {
                path: 'admin/products',
                component: AdminProductsComponent,
                canActivate: [AuthGuardService, AdminAuthGuardService]
            },
            {
                path: 'admin/orders',
                component: AdminOrdersComponent,
                canActivate: [AuthGuardService, AdminAuthGuardService]
            }
        ])
    ],
    providers: [AdminAuthGuardService]
})
export class AdminModule {}
