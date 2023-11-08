import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InspectionsService {
  host = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getInspections() {
    return this.http.get(`${this.host}/inspections`).pipe(map((data) => data));
  }
}
