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
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        ProductsComponent,
        ShoppingCartComponent,
        CheckOutComponent,
        OrderSuccessComponent,
        MyOrdersComponent,
        AdminProductsComponent,
        AdminOrdersComponent,
        LoginComponent,
        ProductFormComponent
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
            { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
            { path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuardService] },
            { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
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
    providers: [AuthService, AuthGuardService, AdminAuthGuardService, UserService, CategoryService, ProductService],
    bootstrap: [AppComponent]
})
export class AppModule {}
