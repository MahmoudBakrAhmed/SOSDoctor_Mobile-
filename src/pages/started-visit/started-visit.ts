import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FinishedVisitPage } from '../finished-visit/finished-visit';

@Component({
  selector: 'page-started-visit',
  templateUrl: 'started-visit.html',
})
export class StartedVisitPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events) {
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
        this.navCtrl.push(FinishedVisitPage);
    }

}
