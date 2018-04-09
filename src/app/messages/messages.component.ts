import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {AngularFireStorage} from 'angularfire2/storage';

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
  messagesLoaded = false;
  uploadPercentage: any = 0;
  downloadURL: any;

  base64textString: any = '';

  messageModel: string;
  user: any;

  constructor(private _data: DataService, private storage: AngularFireStorage) {
    this._data.messages.subscribe(res => this.setupTiles(res));
    this._data.user.subscribe(res => this.user = res);
  }

  ngOnInit() {
    this._data.changeCurPage(this.currPage);
  }

  setupTiles(res) {
    if (res.length) {
      this.messagesLoaded = false;
      const vm = this;
      let count = 0;
      vm.tiles = [];
      vm.tiles1 = [];
      vm.tiles2 = [];

      res.reverse().forEach(function (value) {
        switch (count) {
          case 0: vm.tiles1.push(value);
            break;
          case 1: vm.tiles.push(value);
            break;
          case 2: vm.tiles2.push(value);
            break;
        }

        if (count === 2) {
          count = 0;
        } else {
          count++;
        }

      });

      this.messagesLoaded = true;
    }
  }

  fileClick() {
    document.getElementById('file').click();
  }

  setupPayload(key) {
    const payload = {
      from: this.user.displayName,
      photoUrl: this.user.photoURL,
      message: this.messageModel,
      attachmentUrl: this.downloadURL,
      key: key
    };

    return payload;
  }

  addPost(form) {

    const newMes = this._data.fbRefMessageList.push({});
    if (this.base64textString) {
      this.uploadImage(newMes.key).then(res => {
        if (res) {
          newMes.set(this.setupPayload(newMes.key));
          form.resetForm();
          this.base64textString = '';
          this.uploadPercentage = 0;
        }
      });
    } else {
      newMes.set(this.setupPayload(newMes.key));
      form.resetForm();
      this.base64textString = '';
      this.uploadPercentage = 0;
    }
  }

  uploadImage(id) {
    const promise = new Promise((resolve, reject) => {
      const ref = this.storage.ref(`${id}`);
      const task = ref.putString(this.base64textString, 'data_url');

      this.uploadPercentage = task.percentageChanges();
      task.downloadURL().subscribe(res => {
        this.downloadURL = res;
        resolve(true);
      });
    });

    return promise;
  }

  _handleReaderLoaded(file, readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = 'data:' + file.type + ';base64,' + btoa(binaryString);
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this, file);

      reader.readAsBinaryString(file);
    }
  }

}
