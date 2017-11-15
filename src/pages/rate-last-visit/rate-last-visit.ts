import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ComingRequestsPage } from '../coming-requests/coming-requests';

@Component({
  selector: 'page-rate-last-visit',
  templateUrl: 'rate-last-visit.html',
})
export class RateLastVisitPage {

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
        this.navCtrl.push(ComingRequestsPage);
    }

}
