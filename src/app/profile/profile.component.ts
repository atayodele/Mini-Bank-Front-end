import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //debugger;
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

}
