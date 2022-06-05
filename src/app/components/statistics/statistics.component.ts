import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { pipe, take } from 'rxjs';
import { APIService } from 'src/app/shared/api.service';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: []
})
export class StatisticsComponent implements OnInit {

  chartType: ChartType = ChartType.BarChart;
  chartData = [
    ['Country', 'Cases', 'Population']
  ];
  countries: any[] = [];
  selectedCountry: string = 'UAE';

  options = {
    bars: 'horizontal',
    height: 200,
    legend: {position: 'right', maxLines: 2},
    hAxis: {
      minValue: 0,
      ticks: [0, .3, .6, .9, 1]
    },
    colors: ['#d95f02', '#46acf5']
  };

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.getCountries();
    this.getStatistics('UAE');
  }

  getCountries() {
    this.apiService.getCovid19EffectedCountries(true).pipe(take(1)).subscribe(data => this.countries = data)
  }

  getCountryData() {
    this.getStatistics(this.selectedCountry);
  }

  getStatistics(country?: string) {
    this.apiService.getCovid19Statistics(country).pipe(take(1)).subscribe(data => {
      this.chartData = data;
    });
  }

}
