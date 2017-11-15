import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AcceptedVisitPage } from '../accepted-visit/accepted-visit';
import { CancelRequestPage } from '../cancel-request/cancel-request';

@Component({
  selector: 'page-coming-requests',
  templateUrl: 'coming-requests.html',
})
export class ComingRequestsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    }

    ionViewDidEnter() {
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
        this.navCtrl.push(AcceptedVisitPage);
    }
    CancelButton(){
        this.navCtrl.push(CancelRequestPage);
    }

}
