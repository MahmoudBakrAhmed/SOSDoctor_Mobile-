import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RateLastVisitPage } from '../pages/rate-last-visit/rate-last-visit';
import { NoRequestsPage } from '../pages/no-requests/no-requests';
import { ComingRequestsPage } from '../pages/coming-requests/coming-requests';
import { AcceptedVisitPage } from '../pages/accepted-visit/accepted-visit';
import { StartedVisitPage } from '../pages/started-visit/started-visit';
import { CancelRequestPage } from '../pages/cancel-request/cancel-request';
import { FinishedVisitPage } from '../pages/finished-visit/finished-visit';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RateLastVisitPage,
    NoRequestsPage,
    CancelRequestPage,
    ComingRequestsPage,
    AcceptedVisitPage,
    StartedVisitPage,
    FinishedVisitPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RateLastVisitPage,
    NoRequestsPage,
    CancelRequestPage,
    ComingRequestsPage,
    AcceptedVisitPage,
    StartedVisitPage,
    FinishedVisitPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
