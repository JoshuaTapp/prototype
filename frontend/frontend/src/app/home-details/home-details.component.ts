import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, Router } from '@angular/router';
import { HomesService } from './homes.service';
import { Home } from './homes.service';
import { InspectionChecklist } from '../inspections/inspections.service';

@Component({
  selector: 'app-home-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-details.component.html',
  styleUrl: './home-details.component.css',
})
export class HomeDetailsComponent {
  home!: Home;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomesService,
    private router: Router
  ) {
    const homeId = this.route.snapshot.paramMap.get('homeId');
    this.homeService.getHome(Number(homeId)).subscribe((home) => {
      this.home = home;
      this.home.inspections.map((inspection) => {
        inspection.dateTime = new Date(inspection.dateTime).toLocaleString();
      });
    });
  }

  goToInspection(inspectionId: number) {
    this.router.navigate([`/inspection-details/${inspectionId}`]);
  }
}
