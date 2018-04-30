import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule, AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from "@angular/router";


@Injectable()
export class AppService {

    authState: any = null;
    places: AngularFireList<any[]>;
    
    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private afs: AngularFirestore,
            private http:Http,private router:Router) {
  
              this.afAuth.authState.subscribe((auth) => {
                this.authState = auth
              });
            }
          
    get authenticated(): boolean {
      return this.authState !== null;
    }

    getPlaces(id:any): Observable<any> {
        let url = "https://truckishtest.firebaseio.com/placeUsers/"+id+".json";
        return this.http.get(url);
      }
  
    get currentUser(): any {
      return this.authenticated ? this.authState : null;
    }
  
  
    // Returns current user UID
    get currentUserId(): string {
      return this.authenticated ? this.authState.uid : '';
    }
    signOut(): void {
        this.afAuth.auth.signOut();
        this.router.navigate(['/'])
      }
    
  updateUserData(data:any): void {
      // Writes user name and email to realtime db
      // useful if your app displays information about users or for admin features
        let path = `placeUsers/${this.currentUserId}`; // Endpoint on firebase
        this.db.object(path).update(data)
        .catch(error => console.log(error));
    
      }    
}
