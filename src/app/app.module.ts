import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CustomFormsModule } from 'ng2-validation';
import { DataTablesModule } from 'angular-datatables';
//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/overlay/navbar/navbar.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/pages/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { LoginComponent } from './components/overlay/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ProductFilterComponent } from './components/overlay/product-filter/product-filter.component';
import { ProductCardComponent } from './components/overlay/product-card/product-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './components/overlay/product-quantity/product-quantity.component';
import { OrderService } from './services/order.service';
import { OrderSummaryComponent } from './components/overlay/order-summary/order-summary.component';
import { ShippingFormComponent } from './components/overlay/shipping-form/shipping-form.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProductsComponent,
        ShoppingCartComponent,
        CheckOutComponent,
        OrderSuccessComponent,
        MyOrdersComponent,
        AdminProductsComponent,
        AdminOrdersComponent,
        LoginComponent,
        ProductFormComponent,
        ProductFilterComponent,
        ProductCardComponent,
        ProductQuantityComponent,
        OrderSummaryComponent,
        ShippingFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        NgbModule,
        DataTablesModule,
        CustomFormsModule,
        RouterModule.forRoot([
            { path: '', component: ProductsComponent }, //ideally, we want a real home page
            { path: 'login', component: LoginComponent },
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
            },
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
    providers: [
        AuthService,
        AuthGuardService,
        AdminAuthGuardService,
        UserService,
        CategoryService,
        ProductService,
        ShoppingCartService,
        OrderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
