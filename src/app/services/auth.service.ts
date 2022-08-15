import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, switchMap, of } from 'rxjs';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$!: Observable<firebase.User|null>;

    constructor(
        private afAuth: AngularFireAuth,
        private route: ActivatedRoute,
        private userService: UserService
    ) {
        this.user$ = afAuth.authState;
    }

    login(): void {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', returnUrl);
        this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    logout(): void {
        this.afAuth.signOut();
    }

    get appUser$(): Observable<AppUser|null> {
        return this.user$.pipe(
                switchMap(user => {
                    if (user) {
                        return this.userService.get(user.uid).valueChanges()
                    }
                    return of(null);
                })
            );
    }
}
