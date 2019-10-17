import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { Observable, EMPTY } from 'rxjs';
import { AccountService } from '../service/account.service';
import { catchError } from 'rxjs/operators';
import { UserService } from '../service/user.service';

@Injectable({
    providedIn: 'root'
  })
export class MemberEditResolver implements Resolve<User> {

    constructor(private userService: UserService,
                private router: Router,
                private toaster: ToastrService,
                private auth: AccountService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        //debugger;
        return this.userService.getUserById(this.auth.decodeToken.nameid).pipe(catchError(error => {
            this.toaster.error('Problem retrieving data');
            this.router.navigate(['/']);
            return EMPTY;
        }));
    }
}