import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { take } from 'rxjs';
import { APIService } from 'src/app/shared/api.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: [],
  providers: [ DatePipe ]
})
export class HistoryComponent implements OnInit {

  chartType: ChartType = ChartType.ComboChart;
  chartData = [
    ['Month', 'Total', 'New']
  ];
  countries: any[] = [];
  selectedCountry: string = 'UAE';

  options = {
    title : 'Monthly Covid Total Cases',
    vAxis: {
      title: 'Cases',
      gridlines: {
        multiple: 50000
      }
    },
    hAxis: {
      title: 'Month',
      gridlines: {units: {
        months: {format: ['MMM']}
      }}
    },
    seriesType: 'bars',
    series: {12: {type: 'line'}}
  };

  constructor(private apiService: APIService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getCountries();
    this.getHistory('UAE');
  }

  getCountries() {
    this.apiService.getCovid19EffectedCountries(true).pipe(take(1)).subscribe(data => this.countries = data)
  }

  getCountryData() {
    this.getHistory(this.selectedCountry);
  }

  getHistory(country?: string) {
    this.apiService.getCovid19History(country).pipe(take(1)).subscribe((data: []) => {
      this.chartData = this.getGroupDataByMonth(data);
    });
  }

  getGroupDataByMonth(data: []) {
    console.log(data);
    let month, year;
    let group: Map<string, any> = data.reduce( (acc: any, curr) => {
      month = this.datePipe.transform(curr['date'], 'MMM') || '';
      year = this.datePipe.transform(curr['date'], 'YY') || '';
      let monthData = acc.get(month+'-'+year) || {};
      // monthData['population'] = curr['population'] || '';
      if(!monthData['total']) {
        monthData['total'] = curr['total'];
      }
      // monthData['total'] += curr['new'];
      monthData['new'] = curr['new'];
      acc.set(month+'-'+year, monthData);
      return acc;
    }, new Map());
    console.log(group);
    console.log();
    let chart = [];
    for (const iterator of group.entries()) {
      chart.push([Object.values(iterator)[0], Object.values(iterator[1])[0], Object.values(iterator[1])[1]]);
    }
    // console.table(chart);
    return chart.reverse();
  }

}
