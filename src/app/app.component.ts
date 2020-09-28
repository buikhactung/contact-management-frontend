import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from './service/user.service';
import {User} from './model/user';
import {SearchUser} from './model/search-user';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AddUserComponent} from './add-user/add-user.component';
import {DeleteUserComponent} from './delete-user/delete-user.component';
import {DetailUserComponent} from './detail-user/detail-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'contact-management-FE';
  listUser: User[] = [];
  searchUser: SearchUser = new class implements SearchUser {
    name: string;
  };
  displayedColumns = ['name', 'phoneNumber', 'action'];

  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private userService: UserService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getAll(this.searchUser).subscribe(data => {
      console.log(data);
      this.listUser = data.object;
      this.dataSource = new MatTableDataSource(this.listUser);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event) {
    let filterValue = event.target.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource = new MatTableDataSource<User>(this.listUser.filter(user => (
        user.firstName + ' ' + user.lastName).toLowerCase().includes(filterValue.trim()) || user.phoneNumber.includes(filterValue.trim())
        )
    );
    this.dataSource.paginator = this.paginator;
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  edit(data: User) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '50%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  delete(data: User) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '50%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  detail(data: User) {
    const dialogRef = this.dialog.open(DetailUserComponent, {
      width: '50%',
      data: data
    });

  }
}
