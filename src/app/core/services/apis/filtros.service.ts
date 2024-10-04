import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Departamento } from '../../models/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  private http = inject(HttpClient);

  listDepartamento(){
    return this.http.get<Departamento[]>('http://localhost:8002/portalweb/departamentos/listConvenio')
  }
}
