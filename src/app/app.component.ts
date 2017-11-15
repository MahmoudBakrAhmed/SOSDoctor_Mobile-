import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { RateLastVisitPage } from '../pages/rate-last-visit/rate-last-visit';
import { NoRequestsPage } from '../pages/no-requests/no-requests';
import { AcceptedVisitPage } from '../pages/accepted-visit/accepted-visit';
import { StartedVisitPage } from '../pages/started-visit/started-visit';
import { CancelRequestPage } from '../pages/cancel-request/cancel-request';
import { FinishedVisitPage } from '../pages/finished-visit/finished-visit';
import { ComingRequestsPage } from '../pages/coming-requests/coming-requests';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
     public footerIsHidden: boolean = false;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events) {
        events.subscribe('hideHeader', (data) => {
            this.footerIsHidden = data.isHidden;
        });
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        
    }
}

