import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { StartedVisitPage } from '../started-visit/started-visit';
import { CancelRequestPage } from '../cancel-request/cancel-request';
import { Storage } from '@ionic/storage';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-accepted-visit',
  templateUrl: 'accepted-visit.html',
})
export class AcceptedVisitPage {
    PatientName: String;
    PatientImage: any;
    constructor(public navCtrl: NavController, private storage: Storage, public loadingCtrl: LoadingController, private webService: WebServiceProvider, public navParams: NavParams, private events: Events) {
        this.events.publish('hideHeader', { isHidden: false});
    }

    ionViewDidEnter() {
        this.storage.get('PatientName').then((val) => {
            if(val != null){
                this.PatientName = val.replace('\"', '').replace('\"', '');
            }
        });
        this.storage.get('Photo').then((val) => {
            if(val != null){
                this.PatientImage = "data:image/png;base64," + val.replace('\"', '').replace('\"', '');
            }else{
                this.PatientImage = "assets/images/doctor-pic.png";
            }
        });
        let checked = <HTMLInputElement>document.getElementsByTagName("input")[1];
        if(checked){
            checked.readOnly = true;
        }
    }
    SubmitButton(){
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('access_token').then((value) => {
            this.storage.get('VisitID').then((val) => {
                this.webService.StartVisit(value, val).subscribe(res =>{
                    loading.dismiss();
                    if(res.message == "success"){
                        this.storage.set('StartedVisit', "true");
                        this.navCtrl.push(StartedVisitPage);
                    }
                    else{
                        alert(res.message);
                    }
                }, error => {
                    alert(error);
                    loading.dismiss();
                });
            });
        });
        
    }
    MapButton(){
        this.navCtrl.push(MapPage);
    }
    CancelButton(){
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('access_token').then((value) => {
            this.storage.get('VisitID').then((val) => {
                console.log(val);
                this.webService.CancelVisit(value, val).subscribe(res =>{
                    console.log(res);
                    loading.dismiss();
                    if(res.message == "Visit Cancelled"){
                        this.navCtrl.push(CancelRequestPage);
                    }
                    else{
                        alert(res.message);
                    }
                });
            });
        });
        
    }

}
