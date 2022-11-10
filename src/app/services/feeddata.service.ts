import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseurl;
const apikey = environment.apikey;
@Injectable({
  providedIn: 'root'
})

export class FeeddataService {


  public headers:HttpHeaders= new HttpHeaders({
    'Content-Type':'application/json',
    'Accept':"application/json",
    'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE',
    'Authorization':''
});
  constructor(private httpclient:HttpClient) { }
  public getFeedByPage(pageIndex:number,pageSize:number){
    let params= new HttpParams();
    return this.httpclient.get(`${baseUrl}&apiKey=${environment.apikey}`)
    // return this.httpclient.get(`${baseUrl}/public/audits/${pageIndex}/${pageSize}`,{headers :this.headers,params})
  }
}
