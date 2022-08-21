import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

@NgModule({
    declarations: [NavbarComponent, LoginComponent],
    imports: [SharedModule, RouterModule.forChild([])],
    exports: [NavbarComponent]
})
export class CoreModule {}
