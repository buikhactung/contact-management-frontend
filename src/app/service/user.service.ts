import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {SearchUser} from '../model/search-user';
import {DataResponse} from '../model/data-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = "http://localhost:5000/api/users";
  constructor(private httpClient: HttpClient) { }

  getAll(searchUser: SearchUser): Observable<DataResponse>{
    return this.httpClient.post<DataResponse>(`${this.API_URL}/search`, searchUser);
  }
  createUser(user: User): Observable<DataResponse>{
    return this.httpClient.post<DataResponse>(this.API_URL, user);
  }

  editUser(user: User): Observable<DataResponse>{
    return this.httpClient.put<DataResponse>(this.API_URL, user);
  }

  deleteUser(id: number): Observable<DataResponse>{
    return this.httpClient.delete<DataResponse>(`${this.API_URL}/${id}`);
  }

  detailUser(id: number): Observable<DataResponse>{
    return this.httpClient.get<DataResponse>(`${this.API_URL}/${id}`);
  }
}
