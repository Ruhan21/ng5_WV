import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {isNullOrUndefined} from "util";

@Injectable()
export class DataService {

  private UserData = new BehaviorSubject<any>({isAnon: false, displayName: '', photoURL: '', uid: ''});
  private navigationButtons = new BehaviorSubject<any>(['Home', 'Venue', 'Guests', 'Messages', 'Login']);
  private currentPage = new BehaviorSubject<any>('');
  private expenseTable = new BehaviorSubject<any>([]);
  private incomeTable = new BehaviorSubject<any>([]);
  private guestTable = new BehaviorSubject<any>([]);
  private lookupTable = new BehaviorSubject<any>([]);
  private messageCenter = new BehaviorSubject<any>([]);
  private isLoggedIn = new BehaviorSubject<any>(false);
  private validToken = new BehaviorSubject<any>(false);

  token = this.validToken.asObservable();
  loggedIn = this.isLoggedIn.asObservable();
  user = this.UserData.asObservable();
  navBtns = this.navigationButtons.asObservable();
  curPage = this.currentPage.asObservable();
  expenses = this.expenseTable.asObservable();
  income = this.incomeTable.asObservable();
  guests = this.guestTable.asObservable();
  lookups = this.lookupTable.asObservable();
  messages = this.messageCenter.asObservable();

  // firbase

  fbRefExpenseList: AngularFireList<any>;
  fbExpenseObservable: any;
  fbRefIncomeList: AngularFireList<any>;
  fbIncomeObservable: any;
  fbRefGuestList: AngularFireList<any>;
  fbGuestObservable: any;
  fbRefLookupList: AngularFireList<any>;
  fbLookupObservable: any;
  fbRefMessageList: AngularFireList<any>;
  fbMessageObservable: any;

  constructor(public af: AngularFireDatabase, private router: Router) {
    this.fbRefExpenseList = this.createList('expenseTable');
    this.fbExpenseObservable = this.createObs(this.fbRefExpenseList, this.expenseTable);

    this.fbRefIncomeList = this.createList('incomeTable');
    this.fbIncomeObservable = this.createObs(this.fbRefIncomeList, this.incomeTable);

    this.fbRefGuestList = this.createList('guestsTable');
    this.fbGuestObservable = this.createObs(this.fbRefGuestList, this.guestTable);

    this.fbRefLookupList = this.createList('lookups');
    this.fbLookupObservable = this.createObs(this.fbRefLookupList, this.lookupTable);

    this.fbRefMessageList = this.createList('messages');
    this.fbMessageObservable = this.createObs(this.fbRefMessageList, this.messageCenter);
  }

  createList(list) {
    return this.af.list('/' + list);
  }

  createObs(refList, table) {
    let temp: Observable<any[]>;

    temp = refList.valueChanges();
    return temp.subscribe(res => table.next(res));
  }

  changeCurPage(page) {
    console.log(page);
    this.currentPage.next(page);
  }

  navigateTo(page) {
    this.router.navigate([page.toLowerCase()]);
  }

  updateList(list, item) {
    console.log(item);
    this[list].update(item.key, item);
  }

  addToList(list, item) {
    const newSongRef = this[list].push({});
    item.key = newSongRef.key;
    newSongRef.set(item);
  }

  removeItemFormList(list, item) {
    this[list].remove(item.key);
  }

  OrderArray(list, property) {
    return list.sort(function compare(a, b) {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
  }

  setUser(user) {
    if (isNullOrUndefined(user.displayName)) {
      this.getNewUserContext(user.uid);
    } else {
      this.UserData.next({isAnon: false, displayName: user.displayName, photoURL: user.photoURL, uid: user.uid});
    }

    if (!this.checkToken(user.uid)) {
      this.isLoggedIn.next(false);
    }
  }

  getNewUserContext(uid) {
    const vm = this;
    const currentUid = uid;
    const $guestList = this.guestTable;
    let foundUser = false;

    $guestList.subscribe(res => {
      res.forEach(function (value) {
        if (value.uid === uid) {
          foundUser = true;
          vm.UserData.next({
            isAnon: true,
            displayName: value.name + ' ' + value.surname,
            photoURL: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
            uid: currentUid
          });
        }
      });

      if (!foundUser) {
        vm.UserData.next({
          isAnon: true,
          displayName: null,
          photoURL: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
          uid: currentUid
        });
      }
    });
  }

  signOut() {
    this.isLoggedIn.next(false);
    this.UserData.next({isAnon: false, displayName: '', photoURL: '', uid: ''});
    this.currentPage.next('');
  }

  checkToken(uid) {
    const vm = this;
    let returnToken = false;
    this.guests.forEach(function (value) {
      value.forEach(function (obj) {
        if (obj.uid) {
          if (obj.uid === uid) {
            returnToken = true;
            vm.isLoggedIn.next(true);
            if (vm.currentPage.getValue() === '') {
              vm.navigateTo('home');
            } else {
              vm.navigateTo(vm.currentPage.getValue());
            }
          }
        }
      });
    });

    return returnToken;
  }

  newToken(token: number, uid) {
    let returnToken = false;
    let updateItem: any;

    const vm = this;

    this.guests.forEach(function (value) {

      value.forEach(function (obj) {
        if (obj.token === token) {
          updateItem = {...obj};

          updateItem.uid = uid;
          vm.updateList('fbRefGuestList', updateItem);
          if (isNullOrUndefined(vm.UserData.getValue().displayName)) {
            vm.UserData.next({
              isAnon: true,
              displayName: updateItem.name + ' ' + updateItem.surname,
              photoURL: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
              uid: uid
            });
          }
          vm.isLoggedIn.next(true);
          returnToken = true;
        }
      });

    });

    return returnToken;
  }
}
