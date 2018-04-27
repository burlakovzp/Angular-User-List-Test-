import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: any = [];
  public initUserList: any = [];

  constructor(public api: ApiService) { }

  ngOnInit() {
    // Getting users
    this.api.getUsers().subscribe(response => {
      this.initUserList = JSON.parse(response['_body']);
      this.users = this.initUserList;
    })
  }


  // User search on his data
  onUserSearch(event) {
    this.users = [];
    for (let i = 0; i < this.initUserList.length; i++) {
      if (this.initUserList[i]['first_name'].indexOf(event.target.value) > -1 || this.initUserList[i]['last_name'].indexOf(event.target.value) > -1
      || this.initUserList[i]['birth_date'].indexOf(event.target.value) > -1 || this.initUserList[i]['email'].indexOf(event.target.value) > -1) {
        this.users.push(this.initUserList[i]);
      }
    }
  }


  // Adding new user
  onSubmitNewUser(form: NgForm) {
    $('#errorInput').hide();

    if (!form.valid) {
      $('#errorInput').show();
      return;
    }

    let data = {};

    data['first_name'] = form.value.first_name;
    data['last_name'] = form.value.last_name;
    data['birth_date'] = form.value.birth_date;
    data['email'] = form.value.email;

    // Check email 
    if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data['email'])) {

      // Request
      this.api.insertNew(JSON.stringify(data)).subscribe(response => {
        this.api.getUsers().subscribe(response => {
          this.initUserList = JSON.parse(response['_body']);
          this.users = this.initUserList;
        })
        form.reset();
        $('#exampleModal').modal('hide');
      })
    } else {
      $('#errorInput').show()
    };
  }


  // Deleting user
  onDeleteUser(id) {
    this.api.deleteUser(id.$oid).subscribe(response => {
      for (let i = 0; i < this.initUserList.length; i++) {
        if(this.initUserList[i]['_id']['$oid'] === id.$oid) {
          this.initUserList.splice(i, 1);
          this.users = this.initUserList;
        }
      }
    })
  }
}
