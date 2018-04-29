import { Component } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    authState: any = null;
    loading:boolean = false;
    password:any;
    email:any = null;
    errMssg:any='';

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private route: ActivatedRoute,
              private router: Router) {

            this.afAuth.authState.subscribe((auth) => {
              this.authState = auth
            });
          }
        
  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }


  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  onKeyPass(e){
    this.password = e.target.value;
}
onKeyEmail(e){
    this.email = e.target.value;
}

  emailLogin() {
    if(this.password === null || this.email === null){
        this.errMssg = 'Error: Blank entries not allowed.'
        return;
    }
      this.loading = true;
     return this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
       .then((user) => {
         this.authState = user
         this.updateUserData()
       })
       .catch(error => {
           this.errMssg = error;
           this.loading = false;
           console.log(error)
        });
  }
  private updateUserData(): void {
     // alert("success");
      this.loading = false;
      this.router.navigate(['home'], {
        relativeTo: this.route.parent,
    }); 
    }       
}
