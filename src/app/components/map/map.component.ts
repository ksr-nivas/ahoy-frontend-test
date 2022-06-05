import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { APIService } from '../../shared/api.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styles: [
    `
      .bg-effected {
        background-color: #f5a2a2;
        width: 24px;
        height: 24px;
      }

      .bg-no-data {
        background-color: #cccccc;
        width: 24px;
        height: 24px;
      }

      .w-15 {
        width: 20% !important;
      }

    `
  ],
})
export class MapComponent implements OnInit {
  chartType: ChartType = ChartType.GeoChart;
  chartData = [
    ['Country', 'Value'],
  ];
  options = {
          datalessRegionColor: '#cccccc',
          defaultColor: '#f5a2a2',
  };
  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.apiService
      .getCovid19EffectedCountries()
      .pipe(take(1))
      .subscribe((countries) => {
        this.chartData = countries;
      });
  }
}
