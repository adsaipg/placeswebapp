import { Component } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    authState: any = null;
    email:any = null;
    password:any = null;
    ConfPassword:any = null;
    loading:boolean = false;
    errMsg:any='';
    disablebutn:boolean = false;
    success:boolean = false;
    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase) {
  
              this.afAuth.authState.subscribe((auth) => {
                this.authState = auth
              });
            }

    onKeyPass(e){
      this.errMsg = '';
      this.disablebutn = false;
        this.password = e.target.value;
    }
    onKeyEmail(e){
      this.errMsg = '';
      this.disablebutn = false;
        this.email = e.target.value;
    }

    onKeyConfPass(e){
      this.disablebutn = false;
        this.ConfPassword = e.target.value;
        if(this.ConfPassword != this.password){
          this.disablebutn = true;
            this.errMsg = 'Error: Both Password must be same.'
        }
        else{
            this.errMsg = '';
        }
    }
  
    emailSignUp() {
      this.errMsg = '';
        if(this.ConfPassword === null || this.email === null || this.password === null){
            this.errMsg = 'Error: Blank entries not allowed.'
            return;
        }
        this.loading= true;
      return this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.authState = user
          this.loading = false;
          this.success = true;
        })
        .catch(error => {
            this.errMsg = error;
            this.loading = false;
            this.success = false;
            console.log(error)
        });
    }  
  }
  