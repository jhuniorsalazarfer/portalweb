import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { circle, Map, marker, polygon, tileLayer } from 'leaflet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portalWeb';

  ngAfterViewInit(): void {
    
    const map = new Map('map').setView([-9.99, -74.29], 6);
    
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker([-13.53008, -71.90061]).addTo(map);
    marker([-13.53188, -71.9673]).addTo(map);
    marker([-13.50911, -71.99446]).addTo(map);
    marker([-13.50897, -71.9868]).addTo(map);
    marker([-13.53278, -71.96794]).addTo(map);
    
    circle([-13.175, -72.040], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(map);

  polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
    [51.48, -0.065]
]).addTo(map);
    // tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
  }
}
