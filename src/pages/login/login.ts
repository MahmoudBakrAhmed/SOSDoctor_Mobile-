import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    username: any;
    password: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private webService: WebServiceProvider, public loadingCtrl: LoadingController, private storage: Storage) {
        events.publish('hideHeader', { isHidden: true});
        events.publish('hideMenu', { isHidden: true});
    }
    ionViewDidLoad() {
        this.events.publish('hideHeader', { isHidden: true});
        this.events.publish('hideMenu', { isHidden: true});
    }
    ionViewDidLeave() {
        this.events.publish('hideMenu', { isHidden: false});
    }
    signIn()
    {
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        
        if((<HTMLInputElement>document.getElementById("username")).value == "" || (<HTMLInputElement>document.getElementById("password")).value == "")
        {
            alert("There is an empty feild!");
            loading.dismiss();
        }
        else
        {
            loading.present();
            this.webService.GetAccessToken((<HTMLInputElement>document.getElementById("username")).value,(<HTMLInputElement>document.getElementById("password")).value).subscribe(response => {
                this.storage.set('access_token', response.access_token);
                this.storage.get('PlayerID').then((val) => {
                    this.webService.PlayerID(response.access_token, val).subscribe(res =>{
                        if (res.message == "success"){
                        }
                    },error =>{
                        alert(error);
                    });
                });
                
                this.navCtrl.setRoot(HomePage);
                loading.dismiss();
            },error =>{
                loading.dismiss();
                if(error.status == "401")
                {
                    alert("your username or password is wrong");
                }else {
                    alert(error);
                }  
            });
        }
    }
}
