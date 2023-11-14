import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inspection } from '../inspections/inspections.service';
import { InspectionChecklist } from '../inspections/inspections.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionDetailsService {
  constructor(private http: HttpClient) {}

  host = 'http://localhost:3000';

  getInspection(inspectionId: number): Observable<Inspection> {
    return this.http.get<Inspection>(
      `${this.host}/inspections/${inspectionId}`
    );
  }
}
