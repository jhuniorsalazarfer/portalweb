import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrecipitacionService {

  API_BASE : string = 'http://localhost:8002/portalweb/';
  constructor(private http:HttpClient){ }
}
