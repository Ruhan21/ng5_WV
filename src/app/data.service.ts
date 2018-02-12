import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class DataService {

  private navigationButtons = new BehaviorSubject<any>(['Home','Venue','Guests','Messages']);
  private currentPage = new BehaviorSubject<any>('');

  navBtns = this.navigationButtons.asObservable();
  curPage = this.currentPage.asObservable();

  constructor() { }

  changeCurPage(page) {
    console.log(page);
    this.currentPage.next(page)
  }

}
