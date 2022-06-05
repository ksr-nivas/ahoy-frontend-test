import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UtilsService {

  private isLoading = new BehaviorSubject<boolean>(false);
  private isLoading$ = this.isLoading.asObservable();

  constructor() {}

  setIsLoading(value: boolean) {
    this.isLoading.next(value);
  }

  getIsLoading() {
    return this.isLoading$;
  }
}
