import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  upload(xml: string): Observable<HttpEvent<any>> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/xml'
  });
    const req = new HttpRequest('POST', `${this.baseUrl}/agentes`, xml, {
      headers: headers,
      responseType: 'json',
    });

    return this.http.request(req);
  }
}