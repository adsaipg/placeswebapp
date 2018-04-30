import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TabsModule } from 'ngx-bootstrap';
import { Routes,RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './appheader/header.component';
import { HomeComponent } from './dashboard/home.component';
import { LoginHomeComponent } from './loginhome/loginhome.component';
import { PlaceSelectComponent } from './placeselect/placeselect.component';
import { AppService } from './app.services';
import { FilterPipe} from './pipes/filter.pipe';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyB0DWK1DxAGOno26qqERDz8o5iVtU_Y1-g",
  authDomain: "truckishtest.firebaseapp.com",
  databaseURL: "https://truckishtest.firebaseio.com",
  projectId: "truckishtest",
  storageBucket: "truckishtest.appspot.com",
  messagingSenderId: "288874878710"
};
const routes:Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginHomeComponent },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
]
@NgModule({
  declarations: [
    AppComponent,
    LoginHomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    PlaceSelectComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(routes),
    Ng4GeoautocompleteModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBexTNip9DYnl-q6XYmY9XgYbFWN62i-P4',
      libraries: ["places"],
      language: 'en-US'
    }),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
