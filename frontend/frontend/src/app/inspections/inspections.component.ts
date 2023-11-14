import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InspectionsService } from './inspections.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
export interface inspectionData {
  inspectorId: number;
  fireChecklist: [] | null;
  structuralChecklist: [] | null;
  plumbingChecklist: [] | null;
  electricalChecklist: [] | null;
  id: number;
  dateTime: string;
}

export interface tableData {
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
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './inspections.component.html',
  styleUrl: './inspections.component.css',
})
export class InspectionsComponent {
  inspectionData: tableData[] = [];
  dataSource: MatTableDataSource<tableData> =
    new MatTableDataSource<tableData>();

  inspectionTypes = ['Fire', 'Structural', 'Plumbing', 'Electrical'];
  selectedInspectionType = ['Fire', 'Structural', 'Plumbing', 'Electrical'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = [
    'inspectorName',
    'dateTime',
    'home',
    'zipCode',
    'inspection',
    'inspectionType',
  ];

  constructor(
    private inspectionService: InspectionsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.inspectionService.getInspectionTableData().subscribe((data) => {
      data.forEach((element) => {
        element.dateTime = new Date(element.dateTime).toLocaleString();
        element.zipCode = element.zipCode.slice(0, 5);
      });
      this.inspectionData = data;
      this.dataSource = new MatTableDataSource<tableData>(this.inspectionData);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterData() {
    console.log(this.selectedInspectionType);
    const filter = this.selectedInspectionType.join(', ');

    if (this.selectedInspectionType.length === this.inspectionTypes.length) {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filterPredicate = (data: tableData, filter: string) => {
        return data.inspectionType === filter;
      };

      this.dataSource.filter = filter;
    }
  }

  goToHome(id: number) {
    this.router.navigate(['/home-details', id]);
  }

  goToInspection(inspectionId: number) {
    this.router.navigate(['/inspection-details', inspectionId]);
  }
}
