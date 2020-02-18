import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LatLng
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {

  map: GoogleMap;

  constructor(private platform: Platform) { }

  ngOnInit() {

  }

  ionViewDidLoad() {
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    /* Setting properties to googleMap */
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 22.719568,
          lng: 75.857727
        },
        zoom: 17,
        tilt: 30,
        bearing: 50
      },
      controls: {
        compass: true,
        myLocationButton: true,
        indoorPicker: true,
        zoom: true
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      }
    };

    /* Creating and getting instance of map */
    this.map = GoogleMaps.create('map', mapOptions);

    /* Fetching current location and adding marker */
    this.map.getMyLocation().then(location => {
      const currentLocationCoordinate = new LatLng(location.latLng.lat, location.latLng.lng);
      const position = {
        target: currentLocationCoordinate,
        zoom: 17
      };
      this.map.animateCamera(position);
      this.map.addMarkerSync({
        title: 'Your Location',
        icon: 'green', // 'assets/images/icons8-Marker-64.png --> Pass any image icon'
        animation: 'DROP',
        position: location.latLng
      });
    });

    /* Setting default marker */
    const marker: Marker = this.map.addMarkerSync({
      title: 'Indore Location',
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: 22.719568,
        lng: 75.857727
      }
    });

    /* Applying listener on marker click */
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });

  }
}
