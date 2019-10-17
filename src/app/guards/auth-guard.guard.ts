import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../service/account.service';
import { take, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private acct : AccountService, private router: Router, private toastr: ToastrService) { }

  canActivate( route: ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<boolean> 
  {
      return this.acct.isLoggesIn.pipe(take(1), map((loginStatus : boolean) => 
      {
            const destination: string  = state.url;
            const productId = route.params.id;

          // To check if user is not logged in
          if(!loginStatus) 
          {
              this.router.navigate(['/login'], {queryParams: {returnUrl : state.url}});
              this.toastr.error("You need to login to access this page");
              return false;
          }

          // if the user is already logged in
          switch(destination) 
          {
              case '/dashboard' :
              {
                  if(localStorage.getItem("loginStatus") === "1") 
                  {
                      return true;
                  }
              }
              case '/dashboard/profile' :
              {
                  if(localStorage.getItem("loginStatus") === "1") 
                  {
                      return true;
                  }
              }
              case '/dashboard/deposit' : 
              {
                if(localStorage.getItem("loginStatus") === "1") 
                {
                    return true;
                }
              }
              case '/dashboard/transfer' : 
              {
                if(localStorage.getItem("loginStatus") === "1") 
                {
                    return true;
                }
              }
             default:
                  return false;
          }
      }));
    
  }
  
}
