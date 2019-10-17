import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private acct: AccountService) { }

    LoginStatus$: Observable<boolean>;

    UserName$: Observable<string>;

    ngOnInit() {

      this.LoginStatus$ = this.acct.isLoggesIn;

      this.UserName$ = this.acct.currentUserName;
    }

    onLogout() {
      this.acct.logout();
    }

}
