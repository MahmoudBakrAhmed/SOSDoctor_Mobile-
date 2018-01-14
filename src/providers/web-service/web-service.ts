import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WebServiceProvider {
    url: String = "http://192.168.1.4:8000";
    constructor(public http: Http) {
    }
    //Get User Login.
    GetAccessToken(Username: String, Password: String){
        return this.http.post(this.url + '/oauth/token',{ grant_type : 'password' , client_id : '2', client_secret : 'plFPOb8fuz0PIn604LOUwoiJxAEUPAGmNI3kbJbw', provider : 'doctors' , username : Username , password : Password, scope : "*"}).map((res: Response) =>
            res.json());
    }
    //Get Device id for oneSignal Notification.
    PlayerID(AccessToken: String, Identifer: String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + AccessToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/api/doctor/updateIdentifier', { mobile_identifier : Identifer }, options).map( (response: Response) => response.json());
    }
    //Get Doctor Information.
    DoctorInfo(AccessToken: String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + AccessToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/api/doctor/doctorInfo', options).map( (response: Response) => response.json());
    }
    //Make Doctor active.
    ActiviteDoctor(AccessToken: String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + AccessToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/api/doctor/activateDoctor', options).map( (response: Response) => response.json());
    }
    //MakeDoctor Inactive.
    DeactiviteDoctor(AccessToken: String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + AccessToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url + '/api/doctor/deactivateDoctor', options).map( (response: Response) => response.json());
    }
    //Accept new Visit.
    AcceptVisit(AccessToken: String, VisitID: String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + AccessToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/api/doctor/acceptVisit', { visit_id : VisitID }, options).map( (response: Response) => response.json());
    }
    //Start new visit.
    StartVisit(AccessToken: String, VisitID: String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + AccessToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/api/doctor/startVisit', { visit_id : VisitID }, options).map( (response: Response) => response.json());
    }
    //Cancel current Visit.
    CancelVisit(AccessToken: String, VisitID: String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + AccessToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/api/doctor/cancelVisit', { visit_id : VisitID }, options).map( (response: Response) => response.json());
    }
    //End current Visit.
    EndVisit(AccessToken: String, VisitID: String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + AccessToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/api/doctor/endVisit', { visit_id : VisitID }, options).map( (response: Response) => response.json());
    }
    //Get Patient Information.
    PatientInfo(AccessToken: String, VisitID: String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + AccessToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/api/doctor/patientInfo', { visit_id : VisitID }, options).map( (response: Response) => response.json());
    }
    //Make Doctor rate last Visit.
    RateVisit(AccessToken: String, VisitID: String, Rate: String, DoctorComment: String){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + AccessToken);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + '/api/doctor/rate', { visit_id : VisitID, rate : Rate, doctor_comment : DoctorComment }, options).map( (response: Response) => response.json());
    }
}
