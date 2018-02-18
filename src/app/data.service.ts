import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {Router} from '@angular/router';

@Injectable()
export class DataService {

  private navigationButtons = new BehaviorSubject<any>(['Home','Venue','Guests','Messages']);
  private currentPage = new BehaviorSubject<any>('');

  navBtns = this.navigationButtons.asObservable();
  curPage = this.currentPage.asObservable();

  constructor(private router: Router) { }

  changeCurPage(page) {
    console.log(page);
    this.currentPage.next(page)
  }

  navigateTo(page) {
    this.router.navigate([page.toLowerCase()]);
  }

}
