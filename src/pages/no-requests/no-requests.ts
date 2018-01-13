import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-no-requests',
  templateUrl: 'no-requests.html',
})
export class NoRequestsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private webService: WebServiceProvider, public loadingCtrl: LoadingController, private events: Events, private storage: Storage) {
      this.events.publish('hideHeader', { isHidden: true});
  }

    ionViewDidEnter() {
        let checked = <HTMLInputElement>document.getElementById("ActiveToggleSwitch");
        
        if(checked){
            checked.addEventListener("click", () => {
                this.Navigation();
            }, false);
        }
    }
    Navigation(){
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        if(!this.navCtrl.isTransitioning()){ 
            this.storage.get('access_token').then((val) => {
                this.webService.DeactiviteDoctor(val).subscribe(res =>{
                    if (res.message == "success"){
                        this.events.publish('hideHeader', { isHidden: true});
                        loading.dismiss();
                        this.storage.set('isActive', 'false');
                        this.navCtrl.setRoot(HomePage);
                    }
                },error =>{
                    let checked = <HTMLInputElement>document.getElementById("ActiveToggleSwitch");
                    if(checked){
                        checked.checked = true;
                    }
                    loading.dismiss();
                    alert(error);
                });
            });
        }
    }
}
