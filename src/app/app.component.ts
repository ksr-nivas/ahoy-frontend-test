import { Component, OnInit, VERSION } from '@angular/core';
import { UtilsService } from './shared/utils.service';

@Component({
  selector: 'ahoy',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;
  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
      this.utilsService.getIsLoading().subscribe(value => this.isLoading = value);
  }
}
