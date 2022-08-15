import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

    constructor(
        private auth: AuthService,
        private userService: UserService
    ) { }

    canActivate(): Observable<boolean> {
        return this.auth.appUser$.pipe(
                map(appUser => appUser!.isAdmin)
            );
    }
}
