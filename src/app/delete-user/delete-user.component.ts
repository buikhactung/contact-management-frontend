import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private userService: UserService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  deleteContact() {
    this.userService.deleteUser(this.data.id).subscribe(data => {
      this.toastrService.success("Delete Success");
      this.dialogRef.close();
    }, error => {
      this.toastrService.error("Delete Error");
      this.dialogRef.close();
    })
  }
}
