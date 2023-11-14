import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Inspection {
  id: number;
  dateTime: string;
  fireChecklist: InspectionChecklist[];
  structuralChecklist: InspectionChecklist[];
  plumbingChecklist: InspectionChecklist[];
  electricalChecklist: InspectionChecklist[];
}

export interface InspectionChecklist {
  item: string;
  status: string;
  explanation: string;
  picturesUrls: string[];
  videosUrls: string[];
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
