import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AppService } from '../app.services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authState: any = null;
  loading: boolean = false;
  password: any;
  email: any = null;
  errMssg: any = '';

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private service: AppService) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }
//on typing email and password
  onKeyPass(e) {
    this.password = e.target.value;
  }
  onKeyEmail(e) {
    this.email = e.target.value;
  }
//login to account
  emailLogin() {
    if(this.password === null || this.email === null){
        this.errMssg = 'Error: Blank entries not allowed.'
        return;
    }
      this.loading = true;
     return this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
       .then((user) => {
         this.authState = user;
         localStorage.setItem('userEmail' , JSON.stringify(this.email));
         //navigate to dashboard
         this.router.navigate(['home'], {
          relativeTo: this.route.parent,
        });
       })
       .catch(error => {
           this.errMssg = error;
           this.loading = false;
           console.log(error)
        });
  }

}
