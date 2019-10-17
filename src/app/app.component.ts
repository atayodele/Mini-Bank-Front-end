import { Component } from '@angular/core';
import { AccountService } from './service/account.service';
import * as jwt_decode from "jwt-decode";
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mini Bank';
  constructor(private authService: AccountService) { }

  ngOnInit() {
    const token = localStorage.getItem('jwt');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodeToken = jwt_decode(token);
    }

    if (user) {
      this.authService.currentUser = user;
      if (this.authService.currentUser.photoUrl != null) {
        this.authService.changeMemberPhoto(user.photoUrl);
      } else {
        this.authService.changeMemberPhoto('../../assets/images/user.png');
      }
    }

  }
}
