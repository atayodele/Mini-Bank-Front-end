import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  insertForm: FormGroup;
  Email: FormControl;
  Password: FormControl;
  returnUrl: string;
  ErrorMessage: string;
  invalidLogin: boolean;

  constructor(private acct: AccountService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

    onSubmit() {
      let userlogin = this.insertForm.value;

      this.acct.login(userlogin.Email, userlogin.Password).subscribe(result => {
          //if authentication is successful
          let tok = (<any>result).user;

          if(tok.photoUrl == null){
            this.router.navigate(['/dashboard/profile']);
            this.toastr.info('Please Upload Passport First!');
          }else{
            this.toastr.success("User Logged In Successfully");
            this.invalidLogin = false;
            this.router.navigateByUrl(this.returnUrl);
          }
      },
      error => {
        this.invalidLogin = true;
        this.ErrorMessage = error.error.loginError;
        this.toastr.error(this.ErrorMessage);
      })
    }

  ngOnInit() {
    // Initialize Form Controls
    this.Email = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Initialize FormGroup using FormBuilder
    this.insertForm = this.fb.group({
      "Email": this.Email,
      "Password": this.Password
    });
  }

}
