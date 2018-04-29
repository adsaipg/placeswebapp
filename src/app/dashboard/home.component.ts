import { Component,ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('placeModal') placeModal;
  display:any = 'none';
  opacity:any = '1.0';
  latitude:number;
  longitude:number;
  description:any;
  address: any;
  action(){
    this.display = 'block';
  }
  upload(){
    this.close();
  }
  close(){
    this.display = 'none';
  }
  LocationData(event){
    console.log('eve:',event);
  }
}
