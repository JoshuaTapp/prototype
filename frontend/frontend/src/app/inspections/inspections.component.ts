import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { InspectionsService } from './inspections.service';
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
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './inspections.component.html',
  styleUrl: './inspections.component.css',
})
export class InspectionsComponent {
  inspectionData: tableData[];
  dataSource: MatTableDataSource<tableData>;
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

  constructor(private inspectionService: InspectionsService) {
    this.inspectionData = [];

    this.inspectionService.getInspectionTableData().subscribe((data) => {
      data.forEach((element) => {
        element.dateTime = new Date(element.dateTime).toLocaleString();
        element.zipCode = element.zipCode.slice(0, 5);
      });
      this.inspectionData = data;
    });

    this.dataSource = new MatTableDataSource<tableData>(this.inspectionData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
