import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RateLastVisitPage } from '../pages/rate-last-visit/rate-last-visit';
import { NoRequestsPage } from '../pages/no-requests/no-requests';
import { MapPage } from '../pages/map/map';
import { ComingRequestsPage } from '../pages/coming-requests/coming-requests';
import { AcceptedVisitPage } from '../pages/accepted-visit/accepted-visit';
import { StartedVisitPage } from '../pages/started-visit/started-visit';
import { CancelRequestPage } from '../pages/cancel-request/cancel-request';
import { FinishedVisitPage } from '../pages/finished-visit/finished-visit';
import { WebServiceProvider } from '../providers/web-service/web-service';
import { Geolocation } from '@ionic-native/geolocation';

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
    FinishedVisitPage,
    LoginPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
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
    FinishedVisitPage,
    LoginPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebServiceProvider,
    Geolocation
  ]
})
export class AppModule {}
