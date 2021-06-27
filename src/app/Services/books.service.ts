import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private httpClient: HttpClient
  ) { }

  async getBooksList() {

    const response: any = await this.httpClient.get<any>(`http://localhost:9000/api`).toPromise();

    return response;
  }

  async createBook(book: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const response: any = await this.httpClient.post<any>(`http://localhost:9000/api`, book, httpOptions
    ).toPromise();

    return response;
  }

  async deleteBook(id: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const response: any = await this.httpClient.delete(`http://localhost:9000/api/${id}`, httpOptions).toPromise();

    return response;
  }

  async updateBook(id: number, book: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const response: any = await this.httpClient.put<any>(`http://localhost:9000/api/${id}`, book, httpOptions).toPromise();

    return response;
  }
}
