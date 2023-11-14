import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionDetailsService } from './inspection-details.service';
import {
  Inspection,
  InspectionChecklist,
} from '../inspections/inspections.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inspection-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inspection-details.component.html',
  styleUrl: './inspection-details.component.css',
})
export class InspectionDetailsComponent {
  inspection: Inspection = {} as Inspection;
  fireExists = false;
  structuralExists = false;
  plumbingExists = false;
  electricalExists = false;

  constructor(
    private inspectionDetailsService: InspectionDetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const inspectionId = this.route.snapshot.paramMap.get('inspectionId');
    this.inspectionDetailsService
      .getInspection(Number(inspectionId))
      .subscribe((inspection) => {
        this.inspection = inspection;
        this.inspection.dateTime = new Date(
          this.inspection.dateTime
        ).toLocaleString();
      });
    if (this.inspection.fireChecklist) {
      this.fireExists = true;
    }
    if (this.inspection.structuralChecklist) {
      this.structuralExists = true;
    }
    if (this.inspection.plumbingChecklist) {
      this.plumbingExists = true;
    }
    if (this.inspection.electricalChecklist) {
      this.electricalExists = true;
    }
  }
}
