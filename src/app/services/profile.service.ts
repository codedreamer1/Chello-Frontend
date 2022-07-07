import { Injectable, NgZone  } from '@angular/core';
import { baseurl } from '../utils/base-url';
import { routers } from '../utils/router-navigate';
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userData: any;
  base_url: any;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public baseurl: baseurl,
    public routernavigate: routers,
    private http: HttpClient
  ) {
    this.base_url = this.baseurl.url;
  }

  public editProfile(registerData: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};
    return this.http.post<any[]>(this.base_url + 'profiles', registerData, requestOptions);
  }

  public addBank(bankDetail: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};
    return this.http.post<any[]>(this.base_url + 'paymentDetail/addBank', bankDetail, requestOptions);
  }

  public addCard(cardDetail: any): Observable<any[]> {
    console.log("CardDetails", cardDetail);
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};
    return this.http.post<any[]>(this.base_url + 'paymentDetail/addCard', cardDetail, requestOptions);
  }

  public getBankDetail(){
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = { headers: header}; 
	  return this.http.post(this.base_url + 'paymentDetail/bankDetail', '', requestOptions)
  }

  public getCardDetail(){
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token });
    const requestOptions = {headers: header};  
	  return this.http.post(this.base_url + 'paymentDetail/cardDetail', '', requestOptions)
  }
}
