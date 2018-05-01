import { Component, ElementRef, NgZone, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-place-selector',
  templateUrl: './placeselect.component.html',
  styleUrls: ['./placeselect.component.css']
})
export class PlaceSelectComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  @Output() sendData: EventEmitter<any> = new EventEmitter();

  @Input('address') formattedAddress: any;
  @Input('lat') latitude: number;
  @Input('long') longitude: number;
  @Input('desc') description: any;
  @Input('payload') payload: any;
  @Input('index') index: any;
  data: any = {};
  completeData: any = {};
  zoom: number = 8;
  userSettings: any = {
    inputString: ''
  }
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    if (this.payload === 'done') {
      this.setCurrentPosition(); //current location of user
    }
    if (this.payload === 'update') {
      this.userSettings.inputString = this.formattedAddress;
    }
    //set google maps defaults

  }
  mapClicked(e: MouseEvent) {
    console.log('data2:', e);
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
  }
  autoCompleteCallback1(data) {
    //on selecting place from search bar in map
    console.log('data:', data);
    if (data.response) {
      this.latitude = data.data.geometry.location.lat;
      this.longitude = data.data.geometry.location.lng;
      this.formattedAddress = data.data.formatted_address;
      this.description = data.data.description;
      console.log('paylod:', this.payload);
      this.data.latitude = this.latitude;
      this.data.longitude = this.longitude;
      this.data.description = this.description;
      this.data.address = this.formattedAddress;
      this.sendData.emit({ "placeData": this.data, "payload": this.payload, "index": this.index });
    }
  }

  private setCurrentPosition() {
    console.log('test 6');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => { // getting current location using geolocation
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        //this.zoom = 14;
      });
    }
  }
}