import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'theShop';
    constructor(
        private auth: AuthService,
        private router: Router
    ) {
        this.auth.user$!.subscribe(user => {
            console.log(user);
            if (user) {
                let returnUrl = localStorage.getItem('returnUrl')!;
                this.router.navigateByUrl(returnUrl);
            }
        });
    }
}
