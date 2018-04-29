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
    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase) {
  
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
    onKeyConfPass(e){
        this.ConfPassword = e.target.value;
        if(this.ConfPassword != this.password){
            this.errMsg = 'Error: Both Password must be same.'
        }
        else{
            this.errMsg = '';
        }
    }
  
    emailSignUp() {
        if(this.ConfPassword === null || this.email === null || this.password === null){
            this.errMsg = 'Error: Blank entries not allowed.'
            return;
        }
        this.loading= true;
      return this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.authState = user
          this.updateUserData()
        })
        .catch(error => {
            this.errMsg = error;
            this.loading = false;
            console.log(error)
        });
    }
  
    private updateUserData(): void {
        alert("success");
        this.loading = false;
      // Writes user name and email to realtime db
      // useful if your app displays information about users or for admin features
        let path = `users/${this.currentUserId}`; // Endpoint on firebase
        let data = {
                      email: this.authState.email,
                      name: this.authState.displayName
                    }
    
        this.db.object(path).update(data)
        .catch(error => console.log(error));
    
      }       
  }
  