import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estacion } from '../../models/estacion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstacionService {

  API_BASE : string = 'http://localhost:8002/portalweb/';
  constructor(private http:HttpClient){ }

  listEstacion():Observable<Estacion[]>{
    return this.http.get<Estacion[]>(this.API_BASE+'estaciones/listConvenio').pipe(res => res);
  }
}
