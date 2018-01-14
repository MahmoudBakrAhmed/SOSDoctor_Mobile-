import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { RateLastVisitPage } from '../rate-last-visit/rate-last-visit';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-finished-visit',
  templateUrl: 'finished-visit.html',
})
export class FinishedVisitPage {
    EndTime: String;
    StartTime: String;
    constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private events: Events) {
        this.events.publish('hideHeader', { isHidden: false});        
    }

    ionViewDidEnter() {
        this.storage.get('StartTime').then((val) => {
            this.StartTime = val;
        });
        var Time = new Date();
        var smallHour = "";
        var zeroMenite = "";
        smallHour = Time.getHours() + "";
        if(Time.getHours() > 12){
            smallHour = "0" + (Time.getHours() - 12);
        }
        else if(Time.getHours() < 10){
            smallHour = "0" + Time.getHours();
        }
        if(Time.getMinutes() < 10){
            zeroMenite = "0" + Time.getMinutes();
        }
        else{
            zeroMenite = Time.getMinutes() + "";
        }
        if(Time.getHours() >= 12){
            zeroMenite += " PM"
        }
        else{
            zeroMenite += " AM"
        }
        this.EndTime = smallHour + ":" + zeroMenite + "";
    }
    Navigation(){
        if(!this.navCtrl.isTransitioning()){
           this.events.publish('hideHeader', { isHidden: true});
        }
        this.navCtrl.popToRoot();
    }
    SubmitButton(){
        this.navCtrl.push(RateLastVisitPage);
    }

}
