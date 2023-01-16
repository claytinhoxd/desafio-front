import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListarService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getValor(sigla:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/regiao/${sigla}`);
  }
}
