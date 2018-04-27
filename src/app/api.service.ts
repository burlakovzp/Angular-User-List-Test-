import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

declare var $:any;

@Injectable()
export class ApiService {

  constructor(public http: Http) { }

  // Adding new user
  public insertNew(data){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post ('https://api.mlab.com/api/1/databases/burlakov_db/collections/Users?apiKey=j1a4Zugf-iFIG4ayfgFTvxoWc4Sb2Kou', data, options)
    .map((response: Response) => response.json());
  }

  // Getting all users
  public getUsers(){
    return this.http.get ('https://api.mlab.com/api/1/databases/burlakov_db/collections/Users?apiKey=j1a4Zugf-iFIG4ayfgFTvxoWc4Sb2Kou');
  }

  // Deleting user
  public deleteUser(id){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.delete ('https://api.mlab.com/api/1/databases/burlakov_db/collections/Users/'+ id +'?apiKey=j1a4Zugf-iFIG4ayfgFTvxoWc4Sb2Kou', options)
    .map((response: Response) => response.json());
  }
}

