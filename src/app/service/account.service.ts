import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { User } from '../interfaces/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    
    baseUrl = environment.apiUrl;
    private baseUrlLogin: string = "account/login";
    private baseUrlRegister: string = "account/createAccount";
    decodeToken: any;
    userToken: any;
    currentUser: User;
    private photoUrl = new BehaviorSubject<string>('../../assets/images/user.png');
    currentPhotoUrl = this.photoUrl.asObservable();

    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
    private UserName = new BehaviorSubject<string>(localStorage.getItem('username'));

    register(surname: string, othername: string, phoneNumber: string,
      password: string, email: string, address: string) {
      return this.http.post<any>(this.baseUrl + this.baseUrlRegister,
        {surname, othername, phoneNumber, password, email,address }).pipe(map(result => {
        //registration was successful
        return result;
      }, error => {
        return error;
      }));
    }

    constructor(private http: HttpClient, 
      private router: Router,
      private toastr: ToastrService) { }

      changeMemberPhoto(photoUrl: string) {
        this.photoUrl.next(photoUrl);
    }

    //Login Method
    login(email: string, password: string) {
      return this.http.post<any>(this.baseUrl + this.baseUrlLogin, { email, password }).pipe(
        map(result => {
            if (result && result.tokenString) {
              this.loginStatus.next(true);
              localStorage.setItem('loginStatus', '1');
              localStorage.setItem('jwt', result.tokenString);
              localStorage.setItem('expiration', result.expiration);
              localStorage.setItem('user',JSON.stringify(result.user));
              localStorage.setItem('username', result.username);
              this.UserName.next(localStorage.getItem('username'));
              this.decodeToken = jwt_decode(result.tokenString);
              this.currentUser = result.user;
                this.userToken = result.tokenString;
                if (this.currentUser.photoUrl != null) {
                    this.changeMemberPhoto(this.currentUser.photoUrl);
                } else {
                    this.changeMemberPhoto('../../assets/images/user.png');
                }
            }
            return result;
        })
      );
    }

    logout() {
      // Set Loginstatus to false and delete saved jwt cookie
      this.loginStatus.next(false);
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      localStorage.removeItem('user');
      localStorage.removeItem('expiration');
      localStorage.setItem('loginStatus', '0');
      this.router.navigate(['/login']);
      this.toastr.info("Logged Out Successfully");
    }

    checkLoginStatus(): boolean {
        var loginCookie = localStorage.getItem("loginStatus");
        if (loginCookie == "1") {
            if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
              return false;
            }

            // Get and Decode the Token
            const token = localStorage.getItem('jwt');
            const decoded = jwt_decode(token);

            // Check if the cookie is valid
            if (decoded.exp === undefined) {
              return false;
            }

            // Get Current Date Time
            const date = new Date(0);

            // Convert EXp Time to UTC
            let tokenExpDate = date.setUTCSeconds(decoded.exp);

            // If Value of Token time greater than current datetime
            if (tokenExpDate.valueOf() > new Date().valueOf()) {
              return true;
            }
            // console.log("NEW DATE " + new Date().valueOf());
            // console.log("Token DATE " + tokenExpDate.valueOf());
            return false;
        }
        return false;
    }

    get isLoggesIn() {
      return this.loginStatus.asObservable();
    }

    get currentUserName() {
      return this.UserName.asObservable();
    }
}
