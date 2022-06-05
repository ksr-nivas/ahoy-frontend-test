import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  // component to show the countries affected by Coronavirus with the ability to search or filter by country.
  { path: 'world-map', component: MapComponent }

  // { path: 'second-component', component: SecondComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }