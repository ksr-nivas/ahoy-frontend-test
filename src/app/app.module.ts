import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleChartsModule } from 'angular-google-charts';
import { AppDashboardComponent } from './components/dashboard/dashboard.component';
import { CacheInterceptor } from './shared/interceptors/cache.interceptor';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { HistoryComponent } from './components/history/history.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    GoogleChartsModule,
    NgSelectModule
  ],
  declarations: [ 
    AppComponent,
    AppDashboardComponent,
    MapComponent,
    StatisticsComponent,
    HistoryComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
