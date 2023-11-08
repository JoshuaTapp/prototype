import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { InspectionsService } from './inspections.service';
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

@Component({
  selector: 'app-inspections',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './inspections.component.html',
  styleUrl: './inspections.component.css',
})
export class InspectionsComponent {
  inspectionData: Inspection[];
  dataSource: tableData[];

  displayedColumns = [
    'inspectorName',
    'dateTime',
    'home',
    'zipCode',
    'inspection',
    'inspectionType',
  ];

  constructor(private inspectionService: InspectionsService) {
    this.inspectionData = [];
    this.dataSource = [];
  }

  ngOnInit() {
    this.inspectionService.getInspections().subscribe((data) => {
      this.inspectionData = data as Inspection[];
    });

    // Transform inspectionData and assign it to dataSource
    this.dataSource = this.inspectionData.map((inspection) => {
      return {
        // Todo: grab the inspector name from the database using inspector id
        inspectorName: `Inspector ${inspection.inspectorId}`,
        dateTime: new Date(inspection.dateTime).toLocaleDateString(),
        home: '123 Main St', // ToDo: grab the home address from the database using home id
        zipCode: '12345',
        inspection: `Inspection ${inspection.id}`,
        // hack to get the list to display correctly based on if a checklist
        // for that type exists or not. e.x. "Fire, Structural, Electrical"
        inspectionType:
          inspection.fireChecklist === null &&
          inspection.structuralChecklist === null &&
          inspection.plumbingChecklist === null &&
          inspection.electricalChecklist === null
            ? ''
            : `
              ${inspection.fireChecklist ? 'Fire, ' : ''}
              ${inspection.structuralChecklist ? 'Structural, ' : ''}
              ${inspection.plumbingChecklist ? 'Plumbing, ' : ''}
              ${inspection.electricalChecklist ? 'Electrical' : ''}
              `,
      };
    });
  }
}
