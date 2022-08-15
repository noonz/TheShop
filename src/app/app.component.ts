import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'theShop';
    constructor(
        private auth: AuthService,
        private router: Router,
        private userService: UserService
    ) {
        this.auth.user$!.subscribe(user => {
            // console.log(user);
            if (user) {
                this.userService.save(user);
                let returnUrl = localStorage.getItem('returnUrl')!;
                this.router.navigateByUrl(returnUrl);
            }
        });
    }
}
