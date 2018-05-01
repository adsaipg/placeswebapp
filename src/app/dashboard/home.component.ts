import { Component,ViewChild,OnInit } from '@angular/core';
import { AppService } from '../app.services';
import { ActivatedRoute ,Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('placeModal') placeModal;
  display:any = 'none';
  opacity:any = '1.0';
  latitude:number = 0;
  longitude:number = 0;
  description:any = '';
  address: any = '';
  showModal:boolean = false;
  authState: any = null;
  data:any[] = [];
  dataForUpload:any[] = [];
  placesArray:any[]=[];
  userId:any;
  loading:boolean = false;
  searchText:any;
  payload:any = '';
  index:any = 0;
  userEmail:any;

  constructor(private service:AppService,private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(){
    this.getPlaceCards();
    this.route.params.subscribe((params: any) => {
      localStorage.setItem('userInfo' , JSON.stringify(this.service.currentUserId));
      this.userEmail = JSON.parse(localStorage.getItem('userEmail'));
      console.log('email:',this.userEmail);
  
  });
   // this.userId = JSON.parse(localStorage.getItem('userInfo'));
  }

  getPlaceCards(){
    this.loading = true;
    this.placesArray = [{description:'Add new place'}];
    this.userId = JSON.parse(localStorage.getItem('userInfo'));
    console.log("id:",this.userId);
    if(this.userId){
    this.service.getPlaces(this.userId).subscribe((res)=>{
      console.log('places:',res);
      res=res.json();
      if(res && this.userId){
      res.forEach(element => {
        this.placesArray.push(element);
      });
    }
      this.loading = false;
    });
  }
  else{
    alert("Some error occurred.Please login again !");
    this.loading = false;
  }
    }

  action(payload,place,index){
    console.log('pay:',payload,' place:',place);
    this.payload = payload;
    console.log('indx:',index);
    this.index = index;
    if(payload === 'update'){
      this.latitude = place.latitude;
      this.longitude = place.longitude;
      this.description = place.description;
      this.address = place.address;
    }
    this.display = 'block';
    this.showModal = true;
  }
  upload(){
    if(this.data){
    this.placesArray.push(this.data);
    }
    this.placesArray.shift();
    // console.log('final data:',this.dataForUpload);
    this.service.updateUserData(this.placesArray);
    console.log('placesarray:',this.placesArray);
    this.getPlaceCards();
    this.data = [];
    this.close();
  }
  close(){
    this.showModal = false;
    this.display = 'none';
    }
  LocationData(event){
    this.data = [];
    console.log('eve:',event);
    if(event.payload === 'update'){
      this.data = [];
      this.updateArray(event.placeData,event.index);
    }
    if(event.payload === 'done'){
      this.data = event.placeData;
    }
  }
  updateArray(d,i){
    this.placesArray.splice(i,1,d);
    console.log('updatedARra:',this.placesArray);
    //this.upload();
  }
  delete(index){
    console.log('old:',this.placesArray);
    this.placesArray.splice(index,1);
    console.log('new:',this.placesArray);
    this.upload();
  }
  signOut(){
    this.service.signOut();
  }
}
