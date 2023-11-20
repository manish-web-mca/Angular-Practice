import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Blogpost } from '../models/blogpost';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts'
  public errorData = {};
  constructor(private http: HttpClient) { }

  getPostList() {
    return this.http.get<Blogpost>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAllPost() {
    return new Promise((resolve, reject) => {
        this.http.get<Blogpost>(this.baseUrl).subscribe((data) => {
          if (data != undefined) {
            resolve(data);
          } else {
            reject(data);
          }          
        });
      });    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong,

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
