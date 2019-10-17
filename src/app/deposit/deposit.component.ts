import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  insertForm: FormGroup;
  amount: FormControl;
  acctNo: FormControl;
  desc: FormControl;
  type: FormControl;
  
  ErrorMessage: string;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.amount = new FormControl('', [Validators.required]);
    this.acctNo = new FormControl('', [Validators.required]);
    this.desc = new FormControl('', [Validators.required]);
    this.type = new FormControl('0');

    this.insertForm = this.fb.group(
      {
        'amount': this.amount,
        'acctNo': this.acctNo,
        'desc': this.desc,
        'type': this.type,
      });
  }
}
