import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FiltrosService } from '../../core/services/apis/filtros.service';
import { Departamento } from '../../core/models/departamento.model';
import { Provincia } from '../../core/models/provincia.model';
import { FormsModule } from '@angular/forms';
import { Distrito } from '../../core/models/distrito.model';
import { circle, Map, marker, tileLayer } from 'leaflet';
import { EstacionService } from '../../core/services/apis/estacion.service';
import { Estacion } from '../../core/models/estacion.model';

@Component({
  selector: 'component-mapa',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent implements OnInit{

  // private map:any;
  
  constructor (
    private serviceFiltro : FiltrosService ,
    private serviceEstacion : EstacionService
  ){}

  public departamentoSelect: string = '';
  departamentos : Departamento[] = [];
  provincias : Provincia[] = [];
  distritos : Distrito[] = [];
  estaciones : Estacion[] = [];

  ngOnInit(): void {
    this.getDepartamentos();
    this.getEstaciones();
    this.initMapa();
  }

  getDepartamentos(){
    this.serviceFiltro.listDepartamento()
    .subscribe(departamentos => {
      this.departamentos = departamentos;
    });
  }

  getEstaciones(){
    this.serviceEstacion.listEstacion()
    .subscribe(estaciones => {
      this.estaciones = estaciones;
    });
  }

  getProvincias(event: any): void {
    this.departamentoSelect = event.target.value;
    this.serviceFiltro.listProvincia(event.target.value)
    .subscribe(provincias => {
      this.provincias = provincias;
    }); 
    this.distritos = [];
  }
  
  getDistritos(event: any): void{
    this.serviceFiltro.listDistrito(this.departamentoSelect,event.target.value)
    .subscribe(distritos => {
      this.distritos = distritos;
    }); 
  }

  private initMapa() {
    
    const map = new Map('map').setView([-9.99, -74.29], 6);
    
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    console.log(this.estaciones)
    marker([-13.53008, -71.90061]).addTo(map).bindPopup("Estacion convenio");
    marker([-13.53188, -71.9673]).addTo(map).bindPopup("Estacion convenio");
    marker([-13.50911, -71.99446]).addTo(map).bindPopup("Estacion convenio");
    marker([-13.50897, -71.9868]).addTo(map).bindPopup("Estacion convenio");
    marker([-13.53278, -71.96794]).addTo(map).bindPopup("Estacion convenio");
    marker([-13.52245, -71.99288]).addTo(map).bindPopup("Estacion convenio");
    marker([-13.35796, -71.97831]).addTo(map).bindPopup("Estacion convenio");
    marker([-13.5208, -71.97353]).addTo(map).bindPopup("Estacion convenio");
    marker([-13.52409, -71.94358]).addTo(map).bindPopup("Estacion convenio");
     marker([-13.53485, -71.92078]).addTo(map).bindPopup("Estacion convenio");
     marker([-13.5453, -71.98471]).addTo(map).bindPopup("Estacion convenio");
     marker([-13.52138, -71.96103]).addTo(map).bindPopup("Estacion convenio");
     marker([-13.5233, -71.95676]).addTo(map).bindPopup("Estacion convenio");
     marker([-13.5407, -71.94051]).addTo(map).bindPopup("Estacion convenio");
     marker([-13.53563, -71.91936]).addTo(map).bindPopup("Estacion convenio");

    map.fitBounds([
      [-13.5394, -71.9863]
    ]);
    circle([-13.53009, -72.040], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(map);

//   polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047],
//     [51.48, -0.065]
// ]).addTo(map);
    // tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
  }

  
}
