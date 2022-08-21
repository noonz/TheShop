import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from 'environments/environment';
import { SharedModule } from 'shared/shared.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { ProductsComponent } from './shop/components/products/products.component';
import { AdminModule } from './admin/admin.module';
import { ShopModule } from './shop/shop.module';
import { CoreModule } from './core/core.module';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        SharedModule,
        AdminModule,
        ShopModule,
        CoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot([
            { path: '', component: ProductsComponent },
            { path: 'login', component: LoginComponent }
        ])
    ],
    providers: [AdminAuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule {}
