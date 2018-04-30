import { Component, ElementRef, NgZone, OnInit, ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader,MouseEvent } from '@agm/core';
import {} from '@types/googlemaps'; 

@Component({
  selector: 'app-place-selector',
  templateUrl: './placeselect.component.html',
  styleUrls: ['./placeselect.component.css']
})
export class PlaceSelectComponent implements OnInit {
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    @Output() sendData: EventEmitter<any> = new EventEmitter();
    
    @Input('address') formattedAddress:any;
    @Input('lat') latitude: number ;
    @Input('long') longitude: number ;
    @Input('desc') description:any;
    data:any = {};
    zoom: number = 8;
    userSettings: any = {
        inputString: ''
      }
    constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone
    ) {}
  
    ngOnInit() {
        
          this.setCurrentPosition();
      //set google maps defaults
   
    }
    mapClicked(e:MouseEvent){
        console.log('data2:',e);
        this.latitude = e.coords.lat;
        this.longitude = e.coords.lng;
    }
    autoCompleteCallback1(data){
        console.log('data:',data);
        if(data.response){
        this.latitude = data.data.geometry.location.lat;
        this.longitude = data.data.geometry.location.lng;
        this.formattedAddress = data.data.formatted_address;
        this.description = data.data.description;
        console.log(this.description);
        this.data.latitude = this.latitude;
        this.data.longitude = this.longitude;
        this.data.description = this.description;
        this.data.address = this.formattedAddress;
        this.sendData.emit(this.data);
        }
    }
   
    private setCurrentPosition() {
        console.log('test 6');
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          //this.zoom = 14;
        });
      }
    }
  }