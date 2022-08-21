import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { CustomFormsModule } from 'ng2-validation';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';

@NgModule({
    declarations: [ProductCardComponent, ProductQuantityComponent],
    imports: [
        CommonModule,
        FormsModule,
        CustomFormsModule,
        DataTablesModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        NgbModule
    ],
    exports: [
        ProductCardComponent,
        ProductQuantityComponent,
        CommonModule,
        FormsModule,
        CustomFormsModule,
        DataTablesModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        NgbModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
        UserService,
        CategoryService,
        ProductService,
        ShoppingCartService,
        OrderService
    ]
})
export class SharedModule {}
