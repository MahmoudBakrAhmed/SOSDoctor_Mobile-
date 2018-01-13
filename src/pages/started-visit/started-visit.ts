import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FinishedVisitPage } from '../finished-visit/finished-visit';
import { Storage } from '@ionic/storage';
import { WebServiceProvider } from '../../providers/web-service/web-service';

@Component({
  selector: 'page-started-visit',
  templateUrl: 'started-visit.html',
})
export class StartedVisitPage {
    StartTime: String;
    constructor(public navCtrl: NavController, private storage: Storage, public loadingCtrl: LoadingController, private webService: WebServiceProvider, public navParams: NavParams, private events: Events) {
    }

    ionViewDidEnter() {
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
        if(Time.getHours() > 12){
            zeroMenite += " PM"
        }
        else{
            zeroMenite += " AM"
        }
        this.StartTime = smallHour + ":" + zeroMenite ;
        this.storage.set("StartTime", this.StartTime);
        let checked = <HTMLInputElement>document.getElementsByTagName("input")[1];
        if(checked){
            checked.addEventListener("click", () => {
                this.Navigation();
            }, false);
        }
    }
    Navigation(){
        if(!this.navCtrl.isTransitioning()){
           this.events.publish('hideHeader', { isHidden: true});
        }
        this.navCtrl.popToRoot();
    }
    SubmitButton(){
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('access_token').then((value) => {
            this.storage.get('VisitID').then((val) => {
                console.log(val);
                this.webService.EndVisit(value, val).subscribe(res =>{
                    //console.log(res);
                    loading.dismiss();
                    if(res.message == "Visit Ended"){
                        this.navCtrl.push(FinishedVisitPage);
                    }
                    else{
                        alert(res.message);
                    }
                });
            });
        });
        
    }

}
