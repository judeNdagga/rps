import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  message: string = "";

  constructor(public navCtrl: NavController, public socket: Socket) {

  }

  sendMessage(){
    this.socket.emit("message", {message: this.message})
  }

}
