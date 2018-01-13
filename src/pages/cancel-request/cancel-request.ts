import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ComingRequestsPage } from '../coming-requests/coming-requests';
import { NoRequestsPage } from '../no-requests/no-requests';
import { Storage } from '@ionic/storage';
import { WebServiceProvider } from '../../providers/web-service/web-service';

@Component({
  selector: 'page-cancel-request',
  templateUrl: 'cancel-request.html',
})
export class CancelRequestPage {

    constructor(public navCtrl: NavController, private webService: WebServiceProvider, private storage: Storage, public loadingCtrl: LoadingController, public navParams: NavParams, public events: Events) {
        this.events.publish('hideHeader', { isHidden: false});        
    }

    ionViewDidEnter() {
    }
    SubmitButton(){
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('access_token').then((value) => {
            this.storage.get('VisitID').then((val) => {
                this.webService.CancelVisit(value, val).subscribe(res =>{
                    loading.dismiss();
                    if(res.message == "Visit Cancelled"){
                        this.storage.set('notification', null);
                        this.navCtrl.push(NoRequestsPage);
                    }
                    else{
                        alert(res.message);
                    }
                },error =>{
                    loading.dismiss();
                    alert(error);
                });
            });
        });
        
    }
    CancelButton(){
        this.navCtrl.push(ComingRequestsPage);
    }
}
