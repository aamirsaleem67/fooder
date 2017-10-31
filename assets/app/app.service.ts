import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService{
   constructor(private http: HttpClient){}
   
   signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.post( 'http://localhost:3000/signup', body, {headers:headers});
   }
}