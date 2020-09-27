import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../model/user';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
  }

}
