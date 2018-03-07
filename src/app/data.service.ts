import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {Router} from '@angular/router';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class DataService {

  private navigationButtons = new BehaviorSubject<any>(['Home','Venue','Guests','Messages']);
  private currentPage = new BehaviorSubject<any>('');
  private expenseTable = new BehaviorSubject<any>([]);
  private incomeTable = new BehaviorSubject<any>([]);
  private guestTable = new BehaviorSubject<any>([]);
  private lookupTable = new BehaviorSubject<any>([]);

  navBtns = this.navigationButtons.asObservable();
  curPage = this.currentPage.asObservable();
  expenses = this.expenseTable.asObservable();
  income = this.incomeTable.asObservable();
  guests = this.guestTable.asObservable();
  lookups = this.lookupTable.asObservable();

  // firbase

  fbRefExpenseList: AngularFireList<any>;
  fbExpenseObservable: any;
  fbRefIncomeList: AngularFireList<any>;
  fbIncomeObservable: any;
  fbRefGuestList: AngularFireList<any>;
  fbGuestObservable: any;
  fbRefLookupList: AngularFireList<any>;
  fbLookupObservable: any;

  constructor(public af: AngularFireDatabase, private router: Router) {
    this.fbRefExpenseList = this.createList('expenseTable');
    this.fbExpenseObservable = this.createObs(this.fbRefExpenseList,this.expenseTable);

    this.fbRefIncomeList = this.createList('incomeTable');
    this.fbIncomeObservable = this.createObs(this.fbRefIncomeList,this.incomeTable);

    this.fbRefGuestList = this.createList('guestsTable');
    this.fbGuestObservable = this.createObs(this.fbRefGuestList,this.guestTable);

    this.fbRefLookupList = this.createList('lookups');
    this.fbLookupObservable = this.createObs(this.fbRefLookupList,this.lookupTable);
  }

  createList(list){
    return this.af.list('/'+list);
  }

  createObs(refList,table) {
    let temp: Observable<any[]>;

    temp = refList.valueChanges();
    return temp.subscribe(res => table.next(res))
  }

  changeCurPage(page) {
    console.log(page);
    this.currentPage.next(page)
  }

  navigateTo(page) {
    this.router.navigate([page.toLowerCase()]);
  }

  updateList(list,item){
    this[list].update(item.key,item);
  }

  addToList(list,item){
    let newSongRef = this[list].push({});
    item.key = newSongRef.key;
    newSongRef.set(item);
  }

}
