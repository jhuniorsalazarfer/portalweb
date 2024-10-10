import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from '../../models/departamento.model';
import { Observable } from 'rxjs';
import { Provincia } from '../../models/provincia.model';
import { Distrito } from '../../models/distrito.model';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  API_BASE : string = 'http://localhost:8002/portalweb/';
  constructor(private http:HttpClient){ }

  listDepartamento():Observable<Departamento[]>{
    return this.http.get<Departamento[]>(this.API_BASE+'departamentos/listConvenio').pipe(res => res);
  }

  listProvincia(codDep: any):Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.API_BASE+'provincias/listConvenio/'+codDep).pipe(res => res);
  }

  listDistrito(codDep: any, codProv: any):Observable<Distrito[]>{
    return this.http.get<Distrito[]>(this.API_BASE+'distritos/listConvenio/'+codDep+'/'+codProv).pipe(res => res);
  }
}
