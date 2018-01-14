import { Component } from '@angular/core';
import { NavController, Platform, NavParams, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { NoRequestsPage } from '../no-requests/no-requests';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { Storage } from '@ionic/storage';
import { AcceptedVisitPage } from '../accepted-visit/accepted-visit';
import { ComingRequestsPage } from '../coming-requests/coming-requests';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
    constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public events: Events, private webService: WebServiceProvider, public loadingCtrl: LoadingController, private storage: Storage) {
        platform.registerBackButtonAction(() => {
            this.platform.exitApp();
        });

    }
    ionViewDidLoad() {
        this.events.publish('hideHeader', { isHidden: true});
        let checked = <HTMLInputElement>document.getElementById("HomeActivationTogglee");
        
        if(checked){
            checked.addEventListener("click", () => {
                this.Navigation();
            }, false);
        }
        this.storage.get('access_token').then((val) => {
            this.webService.DoctorInfo(val).subscribe(res => {
                if (res.message == "success"){
                    let UsernameLabel = <HTMLInputElement>document.getElementById("UsernameMenuLabel");
                    UsernameLabel.innerHTML = JSON.stringify(res.doctor.name).replace('\"', '').replace('\"', '');
                }else{
                    alert(res.message);
                }
            },error =>{
                alert(error);
            });
        });
        
    }
    ionViewWillLeave() {
        //Make footer visiable while leaving the page.
        let checked = <HTMLInputElement>document.getElementById("HomeActivationTogglee");
        
        if(checked){
            checked.checked = false;
        }
        //this.events.publish('hideHeader', { isHidden: false});
    }
    Navigation(){
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.storage.get('access_token').then((val) => {
            this.webService.ActiviteDoctor(val).subscribe(res =>{
                if (res.message == "success"){
                    loading.dismiss();
                    this.storage.set('isActive', 'true');
                    this.navCtrl.push(NoRequestsPage);
                }
            },error =>{
                let checked = <HTMLInputElement>document.getElementById("HomeActivationTogglee");
                if(checked){
                    checked.checked = false;
                }
                loading.dismiss();
                alert(error);
            });
        });
        
    }
}
