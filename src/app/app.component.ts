import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { RateLastVisitPage } from '../pages/rate-last-visit/rate-last-visit';
import { LoginPage } from '../pages/login/login';
import { NoRequestsPage } from '../pages/no-requests/no-requests';
import { AcceptedVisitPage } from '../pages/accepted-visit/accepted-visit';
import { StartedVisitPage } from '../pages/started-visit/started-visit';
import { CancelRequestPage } from '../pages/cancel-request/cancel-request';
import { FinishedVisitPage } from '../pages/finished-visit/finished-visit';
import { ComingRequestsPage } from '../pages/coming-requests/coming-requests';
import { Storage } from '@ionic/storage';
import { WebServiceProvider } from '../providers/web-service/web-service';
import { MapPage } from '../pages/map/map';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage : any;
    @ViewChild(Nav) nav: Nav;
    public footerIsHidden: boolean = false;
    public MenuIsHidden: boolean = false;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events, private storage: Storage, public loadingCtrl: LoadingController, private webService: WebServiceProvider) {
        this.events.publish('hideHeader', { isHidden: false});
        // this.storage.set('VisitID',"359");
        // this.storage.set('PatientName',"SOS Patient");
        // this.storage.set('AcceptedVisit', null);
        // this.storage.set('StartedVisit', null);
        var notificationOpenedCallback = (jsonData) => {
            this.storage.set('VisitID',JSON.stringify(jsonData.notification.payload.additionalData.visit_id));         
            if(jsonData.action.actionID == "doctor_show_visit"){
                this.storage.set('notification', true);
                this.nav.setRoot(ComingRequestsPage);
            }
            else if(jsonData.action.actionID == "doctor_cancel_visit"){
                this.storage.set('notification', "cancel");
                this.nav.setRoot(CancelRequestPage);
            }
        };
        // this.storage.get('access_token').then((val) => {
        //     if(val == null){
                
        //         this.rootPage = LoginPage;
        //     }
        //     else{
        //         this.storage.get('isActive').then((ActiveVal) => {
        //             this.storage.get('UnRatedVisit').then((UnRatedVisitVal) => {
        //                 if(UnRatedVisitVal == null){
        //                     if(ActiveVal == null || ActiveVal == 'false')
        //                         this.rootPage = HomePage;
        //                     else{
        //                         this.storage.get('AcceptedVisit').then((AcceptedVisitVal) => {
        //                             if(AcceptedVisitVal == null)
        //                                 this.rootPage = NoRequestsPage;
        //                             else{
        //                                 this.storage.get('StartedVisit').then((StartedVisitVal) => {
        //                                     if(StartedVisitVal == null)
        //                                         this.rootPage = AcceptedVisitPage;
        //                                     else{
        //                                         this.rootPage = StartedVisitPage;
        //                                     }
        //                                 });
        //                             }
        //                         });
        //                     }
        //                 }
        //                 else{
        //                     this.rootPage = ComingRequestsPage;
        //                 }
        //             });
        //         });
        //     }
            
        // });
        platform.ready().then(() => {
            events.subscribe('hideHeader', (data) => {
                this.footerIsHidden = data.isHidden;
            });
            statusBar.styleDefault();
            splashScreen.hide();
            window["plugins"].OneSignal
            .startInit("394c719f-6ff8-40ea-a91c-716284e412f0", "1:312789563630:android:e562faf5ff11d7ca")
            .getIds((ids) => {
                this.storage.set('PlayerID',ids.userId);
            });
            window["plugins"].OneSignal
            .startInit("394c719f-6ff8-40ea-a91c-716284e412f0", "1:312789563630:android:e562faf5ff11d7ca")
            .handleNotificationOpened(notificationOpenedCallback);
            window["plugins"].OneSignal.endInit();
            
            this.storage.get('access_token').then((val) => {
                if(val == null){
                    events.subscribe('hideMenu', (data) => {
                        this.MenuIsHidden = data.isHidden;
                    });
                    this.rootPage = LoginPage;
                }
                else{
                    this.storage.get('isActive').then((ActiveVal) => {
                        if(ActiveVal == null || ActiveVal == 'false')
                            this.rootPage = HomePage;
                        else{
                            this.storage.get('notification').then((value) => {
                                if(value == true){
                                    this.rootPage = ComingRequestsPage;
                                }
                                if(value == "cancel"){
                                    this.rootPage = CancelRequestPage;
                                }
                                if(value == null){
                                    this.storage.get('AcceptedVisit').then((AcceptedVisitVal) => {
                                        if(AcceptedVisitVal == null)
                                            this.rootPage = NoRequestsPage;
                                        else{
                                            this.storage.get('StartedVisit').then((StartedVisitVal) => {
                                                if(StartedVisitVal == null)
                                                    this.rootPage = AcceptedVisitPage;
                                                else{
                                                    this.rootPage = StartedVisitPage;
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                
            });
            
        });
        
    }
    Logout(){
        const loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.events.subscribe('hideMenu', (data) => {
            this.MenuIsHidden = data.isHidden;
        });
        this.storage.get('isActive').then((val) => {
            if(val == 'true'){
                this.storage.get('access_token').then((value) => {
                    this.webService.DeactiviteDoctor(value).subscribe(res =>{
                        if (res.message == "success"){
                            this.storage.set('isActive', 'false');
                            this.events.publish('hideHeader', { isHidden: true});
                            loading.dismiss();
                            this.storage.set('access_token', null);
                            this.nav.setRoot(LoginPage);
                        }
                    },error =>{
                        loading.dismiss();
                        alert(error);
                    });
                });
            }
            else{
                this.events.publish('hideHeader', { isHidden: true});
                
                loading.dismiss();
                this.storage.set('access_token', null);
                this.nav.setRoot(LoginPage);
            }
        });
    }
}

