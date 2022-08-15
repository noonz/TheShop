import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    appUser!: AppUser|null;

    constructor(
        private auth: AuthService
    ) {
        auth.appUser$.subscribe(appUser => this.appUser = appUser);
    }

    logout(): void {
        this.auth.logout();
    }
}
