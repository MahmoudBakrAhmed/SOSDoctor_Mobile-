import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NoRequestsPage } from '../no-requests/no-requests';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-rate-last-visit',
  templateUrl: 'rate-last-visit.html',
})
export class RateLastVisitPage {
    Rate: any;
    StartTime: any;
    PatientName: any;
    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public events: Events, private webService: WebServiceProvider, private storage: Storage) {
    }

    ionViewDidEnter() {
        this.storage.set("UnRatedVisit", true);
        this.storage.get('StartTime').then((val) => {
            this.StartTime = val;
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
        if(this.Rate == 0 || this.Rate == null)
        {
            loading.dismiss();
            alert("You should give rate");
        }
        else
        {
            this.storage.get('access_token').then((val) => {
                this.storage.get('VisitID').then((value) => {
                    this.webService.RateVisit(val, value,this.Rate, (<HTMLInputElement>document.getElementById("DoctorComment")).value).subscribe(res =>{
                        if (res.message == "success"){
                            this.storage.set("UnRatedVisit", null);
                            loading.dismiss();
                            this.navCtrl.push(NoRequestsPage);
                        }
                    },error =>{
                        loading.dismiss();
                        alert(error);
                    });
                });
                
            });
        }
        
    }
    FirstStarButton(){
        let FirstStar = <HTMLInputElement>document.getElementById("firstStar");
        let SecondStar = <HTMLInputElement>document.getElementById("secondStar");
        let ThirdStar = <HTMLInputElement>document.getElementById("thirdStar");
        let ForthStar = <HTMLInputElement>document.getElementById("forthStar");
        let FifthStar = <HTMLInputElement>document.getElementById("fifthStar");
        if(FirstStar.style.color != "yellow"){
            FirstStar.style.color = "yellow";
            this.Rate = 1;
        }
        else if(SecondStar.style.color != "yellow"){
            FirstStar.style.color = "black";
            this.Rate = 0;
        }
        else{
            FirstStar.style.color = "yellow";
            SecondStar.style.color = "black";
            ThirdStar.style.color = "black";
            ForthStar.style.color = "black";
            FifthStar.style.color = "black";
            this.Rate = 1;
        }
    }
    SecondStarButton(){
        let FirstStar = <HTMLInputElement>document.getElementById("firstStar");
        let SecondStar = <HTMLInputElement>document.getElementById("secondStar");
        let ThirdStar = <HTMLInputElement>document.getElementById("thirdStar");
        let ForthStar = <HTMLInputElement>document.getElementById("forthStar");
        let FifthStar = <HTMLInputElement>document.getElementById("fifthStar");
        if(SecondStar.style.color != "yellow" ){
            FirstStar.style.color = "yellow";
            SecondStar.style.color = "yellow";
            this.Rate = 2;
        }
        else if(ThirdStar.style.color != "yellow"){
            FirstStar.style.color = "black";
            SecondStar.style.color = "black";
            this.Rate = 0;
        }
        else{
            FirstStar.style.color = "yellow";
            SecondStar.style.color = "yellow";
            ThirdStar.style.color = "black";
            ForthStar.style.color = "black";
            FifthStar.style.color = "black";
            this.Rate = 2;
        }
    }
    ThirdStarButton(){
        let FirstStar = <HTMLInputElement>document.getElementById("firstStar");
        let SecondStar = <HTMLInputElement>document.getElementById("secondStar");
        let ThirdStar = <HTMLInputElement>document.getElementById("thirdStar");
        let ForthStar = <HTMLInputElement>document.getElementById("forthStar");
        let FifthStar = <HTMLInputElement>document.getElementById("fifthStar");
        if(ThirdStar.style.color != "yellow"){
            FirstStar.style.color = "yellow";
            SecondStar.style.color = "yellow";
            ThirdStar.style.color = "yellow";
            this.Rate = 3;
        }
        else if(ForthStar.style.color != "yellow"){
            FirstStar.style.color = "black";
            SecondStar.style.color = "black";
            ThirdStar.style.color = "black";
            this.Rate = 0;
        }
        else{
            FirstStar.style.color = "yellow";
            SecondStar.style.color = "yellow";
            ThirdStar.style.color = "yellow";
            ForthStar.style.color = "black";
            FifthStar.style.color = "black";
            this.Rate = 3;
        }
    }
    ForthStarButton(){
        let FirstStar = <HTMLInputElement>document.getElementById("firstStar");
        let SecondStar = <HTMLInputElement>document.getElementById("secondStar");
        let ThirdStar = <HTMLInputElement>document.getElementById("thirdStar");
        let ForthStar = <HTMLInputElement>document.getElementById("forthStar");
        let FifthStar = <HTMLInputElement>document.getElementById("fifthStar");
        if(ForthStar.style.color != "yellow"){
            FirstStar.style.color = "yellow";
            SecondStar.style.color = "yellow";
            ThirdStar.style.color = "yellow";
            ForthStar.style.color = "yellow";
            this.Rate = 4;
        }
        else if(FifthStar.style.color != "yellow"){
            FirstStar.style.color = "black";
            SecondStar.style.color = "black";
            ThirdStar.style.color = "black";
            ForthStar.style.color = "black";
            this.Rate = 0;
        }
        else{
            FirstStar.style.color = "yellow";
            SecondStar.style.color = "yellow";
            ThirdStar.style.color = "yellow";
            ForthStar.style.color = "yellow";
            FifthStar.style.color = "black";
            this.Rate = 4;
        }
    }
    FifthStarButton(){
        let FirstStar = <HTMLInputElement>document.getElementById("firstStar");
        let SecondStar = <HTMLInputElement>document.getElementById("secondStar");
        let ThirdStar = <HTMLInputElement>document.getElementById("thirdStar");
        let ForthStar = <HTMLInputElement>document.getElementById("forthStar");
        let FifthStar = <HTMLInputElement>document.getElementById("fifthStar");
        if(FifthStar.style.color != "yellow"){
            FirstStar.style.color = "yellow";
            SecondStar.style.color = "yellow";
            ThirdStar.style.color = "yellow";
            ForthStar.style.color = "yellow";
            FifthStar.style.color = "yellow";
            this.Rate = 5;
        }
        else{
            FirstStar.style.color = "black";
            SecondStar.style.color = "black";
            ThirdStar.style.color = "black";
            ForthStar.style.color = "black";
            FifthStar.style.color = "black";
            this.Rate = 0;
        }
    }
}
