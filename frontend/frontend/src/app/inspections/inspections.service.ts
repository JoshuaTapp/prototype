import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

interface Inspection {
  inspectorId: number;
  fireChecklist: [] | null;
  structuralChecklist: [] | null;
  plumbingChecklist: [] | null;
  electricalChecklist: [] | null;
  id: number;
  dateTime: string;
}

interface tableData {
  inspectorName: string;
  dateTime: string;
  home: string;
  zipCode: string;
  inspection: string;
  inspectionType: string;
}

@Injectable({
  providedIn: 'root',
})
export class InspectionsService {
  host = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getInspections(): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(`${this.host}/inspections`);
  }

  getInspectionTableData() {
    return this.http.get<tableData[]>(
      `${this.host}/inspections/get-inspections-table`
    );
  }
}
