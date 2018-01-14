import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AcceptedVisitPage } from '../accepted-visit/accepted-visit';
import { CancelRequestPage } from '../cancel-request/cancel-request';
import { Storage } from '@ionic/storage';
import { WebServiceProvider } from '../../providers/web-service/web-service';

@Component({
  selector: 'page-coming-requests',
  templateUrl: 'coming-requests.html',
})
export class ComingRequestsPage {
    PatientName: String;
    constructor(public navCtrl: NavController, private storage: Storage, public loadingCtrl: LoadingController, public navParams: NavParams, public events: Events, private webService: WebServiceProvider) {
        this.events.publish('hideHeader', { isHidden: false});
    }

    ionViewDidEnter() {
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('access_token').then((value) => {
            this.storage.get('VisitID').then((val) => {
                this.webService.PatientInfo(value, val).subscribe(res =>{
                    loading.dismiss();
                    //this.storage.set('PatientName',res.patient_name);
                    this.storage.set('Photo',res.patient_image);
                    this.storage.set('Problem',res.patient_problem);
                    //this.storage.set('Rate',res.patient_rate);
                }, error => {
                    alert(error);
                    loading.dismiss();
                });
            });
        });
        this.storage.get('PatientName').then((val) => {
            if(val != null){
                this.PatientName = val.replace('\"', '').replace('\"', '');
            }
        });
    }
    SubmitButton(){
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('access_token').then((value) => {
            this.storage.get('VisitID').then((val) => {
                this.webService.AcceptVisit(value, val).subscribe(res =>{
                    loading.dismiss();
                    if(res.message == "success"){
                        this.storage.set('notification', null);
                        this.storage.set('AcceptedVisit', "true");
                        this.navCtrl.push(AcceptedVisitPage);
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
    CancelButton(){
        this.navCtrl.push(CancelRequestPage);
    }

}
