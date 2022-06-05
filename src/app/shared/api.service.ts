import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class APIService {
  constructor(private httpClient: HttpClient) {}

  getCovid19EffectedCountries(flat?: boolean): Observable<any> {
    return this.httpClient.get('https://covid-193.p.rapidapi.com/countries')
      .pipe(
        map((data: any) => {
          if(flat) {
            return data.response;
          }
          let countries = [];
          for(let val of data.response) {
            countries.push([val, val]);
          }
          return countries;
        }),
        shareReplay(1)
      );
  }

  getCovid19Statistics(country?: string) {
    let params: HttpParams = new HttpParams();
    if(country) {
      params = params.append('country', country);
    }
    return this.httpClient.get(`https://covid-193.p.rapidapi.com/statistics`, {params: params})
      .pipe(
        map((data: any) => {
          return data.response.map( (item: any) => {
            return [item.country, item.cases.total, item.population];
          });
        })
      );
  }

  getCovid19History(country?: string, day?: any) {
    let params: HttpParams = new HttpParams();
    if(country) {
      params = params.set('country', country);
    }
    if(day) {
      params = params.set('day', day);
    }
    return this.httpClient.get(`https://covid-193.p.rapidapi.com/history`, {params: params})
      .pipe(
        map((data: any) => {
          return data.response.map( (item: any) => {
            return {date: item.day, population: item.population, new: parseInt(item.cases.new), total: item.cases.total};
          });
        })
      );
  }
}
