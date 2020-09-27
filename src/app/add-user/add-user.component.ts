import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  messageFirstName = null;
  messageLastName = null;
  messagePhoneNumber = null;

  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private userService: UserService,
              private toastrService: ToastrService) {
  };

  ngOnInit(): void {
  }

  addContact() {
    if (this.validate()) {
      this.userService.createUser(this.data).subscribe(data => {
        this.toastrService.success('Add Success');
        this.dialogRef.close();
      }, error => {
        this.toastrService.error('Add Error');
        this.dialogRef.close();
      });
    }
  }

  editContact() {
    if (this.validate()) {
      this.userService.editUser(this.data).subscribe(data => {
        this.toastrService.success('Add Success');
        this.dialogRef.close();
      }, error => {
        this.toastrService.error('Add Error');
        this.dialogRef.close();
      });
    }
  }

  validate(): boolean {
    this.messagePhoneNumber = null;
    this.messageLastName = null;
    this.messageFirstName = null;
    let check = true;
    if (this.data.firstName == null || this.data.firstName.trim() == '') {
      this.messageFirstName = 'First Name is required';
      check = false;
    }

    if (this.data.lastName == null || this.data.lastName.trim() == '') {
      this.messageLastName = 'Last Name is required';
      check = false;
    }

    if (this.data.phoneNumber == null || this.data.phoneNumber.trim() == '') {
      this.messagePhoneNumber = 'Phone Number is required';
      check = false;
    } else {
      let regex = /^\d+$/;
      let phoneNumber = this.data.phoneNumber.substring(0, 1) == '+' ? this.data.phoneNumber.substring(1) : this.data.phoneNumber;
      if (!regex.test(phoneNumber)) {
        this.messagePhoneNumber = 'Phone Number is number character';
        check = false;
      }
    }

    return check;
  }
}
