import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Model
import { ApiMap } from '../model/api-map.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(apiMap: ApiMap) {
    return this.httpClient.get<T>(`${environment.apiUrl}${apiMap.url}`);
  }

  post<T>(apiMap: ApiMap, body: any) {
    return this.httpClient.post<T>(`${environment.apiUrl}${apiMap.url}`, body);
  }
}
