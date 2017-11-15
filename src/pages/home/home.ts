import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { RateLastVisitPage } from '../rate-last-visit/rate-last-visit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
        events.publish('hideHeader', { isHidden: true});
        
        
    }
    ionViewDidLoad() {
        let checked = <HTMLInputElement>document.getElementById("ActivationTogglee");
        
        if(checked){
            checked.addEventListener("click", () => {
                checked.checked = false;
                this.Navigation();
            }, false);
        }
    }
    ionViewWillLeave() {
        //Make footer visiable while leaving the page.
        this.events.publish('hideHeader', { isHidden: false});
    }
    Navigation(){
        this.navCtrl.push(RateLastVisitPage);
    }
}
