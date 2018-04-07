import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service'
import {AngularFireStorage} from 'angularfire2/storage'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  currPage = 'Messages';
  tiles = [];
  tiles1 = [];
  tiles2 = [];
  messages = [];
  uploadPercentage: any;
  downloadURL:any;

  base64textString: any;

  messageModel:string;

  constructor(private _data:DataService, private storage: AngularFireStorage) {
    this._data.messages.subscribe(res => this.setupTiles(res));
  }

  ngOnInit() {
    this._data.changeCurPage(this.currPage);
  }

  setupTiles(res){
    let vm = this;
    vm.tiles = [];
    vm.messages = res;

    vm.messages.forEach(function (value) {
      console.log(value.length);
      if(value.length > 1000){
        vm.tiles.push({text: value, cols: 2, rows: 3})
      } else if(value.length < 1000 && value.length > 500){
        vm.tiles.push({text: value, cols: 1, rows: 3})
      } else if(value.length < 500 && value.length > 250){
        vm.tiles.push({text: value, cols: 1, rows: 2})
      } else if(value.length < 250 && value.length > 100){
        vm.tiles.push({text: value, cols: 1, rows: 2})
      } else if(value.length < 100){
        vm.tiles.push({text: value, cols: 1, rows: 1})
      }

    });

    vm.tiles1 = [...vm.tiles];
    vm.tiles1.reverse();
    vm.tiles2 = [...vm.tiles];
    vm.tiles2.splice(0,1);
    console.log(vm.tiles);
  }

  addPost(){
    this._data.addToList('fbRefMessageList',this.messageModel)
  }

  uploadImage(id){
    const ref = this.storage.ref(`${id}.jpg`);
    const task = ref.putString(this.base64textString,'data_url');

    this.uploadPercentage = task.percentageChanges();
    this.downloadURL = task.downloadURL();
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= 'data:image/jpeg;base64,' + btoa(binaryString);
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }

    this.uploadImage('uniqueID')
  }

}
