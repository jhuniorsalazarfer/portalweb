import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import * as M from 'leaflet';
import { FiltrosService } from '../../core/services/apis/filtros.service';

@Component({
  selector: 'component-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent {

  private map:any;
  private userMarker: M.Marker<any> | undefined;
  private departamentoService = inject(FiltrosService);

  

  ngOnInit(): void {
    this.initMapa();
    this.departamentoService.listDepartamento()
    .subscribe(departamentos => {
      console.log(departamentos)
    });
  }

  private initMapa() {
    
    const map = new M.Map('map').setView([-9.99, -74.29], 6);
    
    M.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markeritem = M.marker([-13.53008, -71.90061]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.53188, -71.9673]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.50911, -71.99446]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.50897, -71.9868]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.53278, -71.96794]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.52245, -71.99288]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.35796, -71.97831]).addTo(map).bindPopup("Estacion convenio");
  
    M.marker([-13.5208, -71.97353]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.52409, -71.94358]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.53485, -71.92078]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.5453, -71.98471]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.52138, -71.96103]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.5233, -71.95676]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.5407, -71.94051]).addTo(map).bindPopup("Estacion convenio");
    M.marker([-13.53563, -71.91936]).addTo(map).bindPopup("Estacion convenio");

    // map.fitBounds([
    //   [markeritem.getLatLng().lat, markeritem.getLatLng().lng]
    // ])
  //   circle([-13.175, -72.040], {
  //     color: 'red',
  //     fillColor: '#f03',
  //     fillOpacity: 0.5,
  //     radius: 500
  // }).addTo(map);

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

  acercarMapa() {
    // this.map.off();
    // this.map.remove();
    // new M.Map('map').setView([14.5394, -78.9863], 6);
    // console.log('Jola')
  } 
}
