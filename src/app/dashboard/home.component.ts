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
  latitude:number;
  longitude:number;
  description:any;
  address: any;
  showModal:boolean = false;
  authState: any = null;
  data:any[] = [];
  dataForUpload:any[] = [];
  placesArray:any[]=[];
  userId:any;
  loading:boolean = false;
  searchText:any;

  constructor(private service:AppService,private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(){
    this.getPlaceCards();
    this.route.params.subscribe((params: any) => {
      localStorage.setItem('userInfo' , JSON.stringify(this.service.currentUserId));
  
  });
   // this.userId = JSON.parse(localStorage.getItem('userInfo'));
  }

  getPlaceCards(){
    this.loading = true;
    this.placesArray = [{description:'Add new place'}];
    this.userId = JSON.parse(localStorage.getItem('userInfo'));
    console.log("id:",this.userId);
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

  action(){
    this.display = 'block';
    this.showModal = true;
  }
  upload(){
    this.placesArray.push(this.data);
    this.placesArray.shift();
    // console.log('final data:',this.dataForUpload);
    this.service.updateUserData(this.placesArray);
    console.log('placesarray:',this.placesArray);
    this.getPlaceCards();
    this.close();
  }
  close(){
    this.showModal = false;
    this.display = 'none';
    }
  LocationData(event){
    this.data = [];
    this.data = event;
    console.log('eve:',this.data);
  }
  signOut(){
    this.service.signOut();
  }
}
