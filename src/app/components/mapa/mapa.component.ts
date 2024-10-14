import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FiltrosService } from '../../core/services/apis/filtros.service';
import { Departamento } from '../../core/models/departamento.model';
import { Provincia } from '../../core/models/provincia.model';
import { FormsModule } from '@angular/forms';
import { Distrito } from '../../core/models/distrito.model';
import * as L from 'leaflet';
import 'leaflet-fullscreen';
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
  marker!: L.Marker<any>;
  
  constructor (
    private serviceFiltro : FiltrosService ,
    private serviceEstacion : EstacionService
  ){}

  public departamentoSelect: string = '';
  departamentos : Departamento[] = [];
  provincias : Provincia[] = [];
  distritos : Distrito[] = [];
  estaciones : Estacion[] = [];
  map !: any;
  baseLayers: any;

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

  getProvincias(event: any): void {
    this.departamentoSelect = event.target.value;
    this.serviceFiltro.listProvincia(event.target.value)
    .subscribe(provincias => {
      this.provincias = provincias;
    }); 
    this.distritos = [];
    this.mostrarDepCusco();
  }
  
  getDistritos(event: any): void{
    this.serviceFiltro.listDistrito(this.departamentoSelect,event.target.value)
    .subscribe(distritos => {
      this.distritos = distritos;
    });
    this.mostrarProvCusco(); 
  }

  getEstaciones(){
    this.serviceEstacion.listEstacion()
    .subscribe(estaciones => {
      this.estaciones = estaciones;
      
      const urlIconBlue = 'assets/icons/marker-blue.png';
      const urlIconGreen = 'assets/icons/marker-green.png';

      estaciones.forEach(element => {
    
        if (element.codCategoria == '15') {
          const dynamicIcon = this.createIcon(urlIconBlue);
          this.marker = L.marker([parseFloat(element.latitudSIG), parseFloat(element.longitudSIG)], { icon: dynamicIcon }).addTo(this.map).bindTooltip("ESTACIÓN: "+element.nombreEstacion);;

         
        
        }
        else{
          const dynamicIcon = this.createIcon(urlIconGreen);
          this.marker = L.marker([parseFloat(element.latitudSIG), parseFloat(element.longitudSIG)], { icon: dynamicIcon }).addTo(this.map).bindTooltip("ESTACIÓN: "+element.nombreEstacion);
        }
        const popupContent = `
        <div class="row">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="true" style="font-size: 15px; font-weight: bold;">Información</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#grafico" type="button" role="tab" aria-controls="grafico" aria-selected="false" style="font-size: 15px; font-weight: bold;">Gráfico</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#tabla" type="button" role="tab" aria-controls="tabla" aria-selected="false" style="font-size: 15px; font-weight: bold;">Tabla</button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="home-tab">
                <div class="row">
                  <div class="col-md-4 pt-2 px-1">
                    <div class="card">
                      <img src="assets/images/H1.jpeg" class="img-thumbnail img-fluid" alt="...">
                    </div>
                  
                  </div>
                  <div class="col-md-8 pt-2 px-1">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title text-center pb-2" style="font-size: 16px;">ESTACIÓN: <strong>${element.nombreEstacion}</strong></h5>
                        <h5 class="card-title text-center pb-2" style="font-size: 15px;">CÓDIGO: <strong>${element.codEstacion}</strong></h5>
                        <div class="card">
                          <div class="row">
                            <div class="col-md-4">
                              <p class="text-center py-2"><strong>Departamento:</strong><br> CUSCO</p>
                              <p class="text-center pb-2"><strong>Latitud:</strong><br>${element.latitudGrado}°${element.latitudMinuto}'${element.latitudSegundo}''</p>
                            </div>
                            <div class="col-md-4">
                              <p class="text-center py-2"><strong>Provincia:</strong><br> CUSCO</p>
                              <p class="text-center pb-2"><strong>Longitud:</strong><br>${element.longitudGrado}°${element.longitudMinuto}'${element.longitudSegundo}''</p>
                            </div>
    
                            <div class="col-md-4">
                              <p class="text-center py-2"><strong>Distrito:</strong><br>CUSCO</p>
                              <p class="text-center pb-2"><strong>Altitud:</strong><br>${element.alturamsnm} msnm.</p>
                            </div>
    
                            <div class="col-md-12">
                              <p class="text-center pb-3"><strong>Tipo de Estación:</strong> Hidrométrica Automática - Pluviométrica</p>
                            </div>
    
                          </div>
                        </div>
                      </div>
                    </div>
    
                  </div>
    
                </div>
                
              </div>
    
              <div class="tab-pane fade" id="grafico" role="tabpanel" aria-labelledby="profile-tab">
    
              </div>
    
              <div class="tab-pane fade" id="tabla" role="tabpanel" aria-labelledby="contact-tab">
    
              </div>
            </div>
          </div>
      `;
    
        this.marker.bindPopup(popupContent, {
          maxWidth: 800,  // Customize max width
          minWidth: 700,  // Customize max width
          closeButton: true,  // Add a close button
          className: 'custom-popup'  // Add custom class for styling
        });

      });

    });
  }
  
  //Leaflet configuracion

  createIcon(url: string): L.Icon {
    return L.icon({
         iconUrl: url, // Ruta de tu icono
        iconSize: [25, 45], // Tamaño del icono
        iconAnchor: [12, 41], // Punto del icono donde se ancla al mapa
        popupAnchor: [1, -38], // Punto donde se abrirá el popup
    });
  }
 
   mostrarDepCusco() {
    this.map.flyTo([-13.331, -72.164], 8, {
      duration: 2,  // Animación con duración de 2 segundos
      easeLinearity: 0.5  // Suavidad en la animación
    });
  }

  mostrarProvCusco() {
    this.map.flyTo([-13.5392, -71.9862], 12, {
      duration: 2,  // Animación con duración de 2 segundos
      easeLinearity: 0.5  // Suavidad en la animación
    });
  }

  getMapDistrito(){
    this.map.flyTo([-13.52610, -71.95084], 14, {
      duration: 2,  // Animación con duración de 2 segundos
      easeLinearity: 0.5  // Suavidad en la animación
    });
  }


   private initMapa(): void {
  
    this.map = new L.Map('map').setView([-9.19,-72.84], 6);

    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 5,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var openTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      minZoom: 5,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    osm.addTo(this.map);
    

    this.baseLayers = {
      'OpenStreetMap': osm,
      'OpenTopoMap': openTopo
    };

  
    L.control.layers(this.baseLayers).addTo(this.map);

    this.map.addControl(new (L.Control as any).Fullscreen());
    
  //   L.circle([-13.53009, -72.040], {
  //     color: 'red',
  //     fillColor: '#f03',
  //     fillOpacity: 0.5,
  //     radius: 500
  // }).addTo(this.map);

  }  

  //Funcion para leyenda
  displayLeyenda: string = 'none';
  funcionLeyenda() {
    this.displayLeyenda = this.displayLeyenda === 'none' ? 'block' : 'none';
  }
}
