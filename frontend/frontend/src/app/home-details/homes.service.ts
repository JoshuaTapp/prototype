import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inspectionData } from '../inspections/inspections.component';
import { Observable } from 'rxjs';
import {
  InspectionChecklist,
  Inspection,
} from '../inspections/inspections.service';

export interface Home {
  id: number;
  addressField1: string;
  addressField2: string;
  city: string;
  state: string;
  zip: string;
  inspections: Inspection[];
}

@Injectable({
  providedIn: 'root',
})
export class HomesService {
  host = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getHome(homeId: number): Observable<Home> {
    return this.http.get<Home>(`${this.host}/homes/find-home/${homeId}`);
  }
}
