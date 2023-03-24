import { Injectable } from '@angular/core';  
import { HttpClient,HttpHeaders }    from '@angular/common/http';  
import { Observable } from 'rxjs';
import { User } from '../model/user';
@Injectable({  
  providedIn: 'root'  
})  
export class ApiServiceService {
  api = 'https://localhost:7246/api/User/';
  constructor(private http: HttpClient) { }  
  httpOptions = {  
    headers: new HttpHeaders({  
      'Content-Type': 'application/json'  
    })  
  }

  getUser(): Observable<User[]>{  
    return this.http.get<User[]>(this.api + 'GetAllUsers');
  }  

  getUserById(id: any): Observable<User>{  
    return this.http.get<User>(this.api + 'GetUserById?id='+id);  
  }

  getUserByName(formData: any): Observable<User[]>{  
    return this.http.post<User[]>(this.api + 'GetUserByName', formData);  
  }

  postUser(formData: any): Observable<User[]>{  
    return this.http.post<User[]>(this.api + 'CreateUser',formData);  
  }  
  
  putUser(formData: any): Observable<User[]>{  
    return this.http.put<User[]>(this.api + 'UpdateUser',formData);  
  }  
  
  deleteUser(id: number): Observable<boolean>{  
    return this.http.delete<boolean>(this.api + 'DeleteUser?id='+id);  
  }

}
