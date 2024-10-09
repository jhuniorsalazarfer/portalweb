import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Departamento } from '../../models/departamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  API_URL : string = 'http://localhost:8002/portalweb/departamentos/listConvenio';
  constructor(private http:HttpClient){ }

  listDepartamento():Observable<Departamento[]>{
    return this.http.get<Departamento[]>(this.API_URL).pipe(res => res);
  }
}
