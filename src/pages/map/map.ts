import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  }
  ionViewDidLoad() {
    this.loadMap();
  }
  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var indianapolis = {lat: 30.0657982, lng: 31.2111215};
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: this.map
        });
        var request = {
          destination: indianapolis,
          origin: latLng,
          travelMode: 'DRIVING'
        };
        
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
          if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
          }
        });
        //this.addMarker();
    }, (err) => {
      console.log(err);
    });
  }
  addMarker(){
    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
    });
    let content = "<h4>Your Location!</h4>";
    this.addInfoWindow(marker, content);
  }
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
        content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
    });
  }

}
