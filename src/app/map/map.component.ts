import { Component, ElementRef, ViewChild } from '@angular/core';
import maplibregl, { Map } from 'maplibre-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @ViewChild("map")
  private mapRef!: ElementRef<HTMLElement>;

  map!: Map;

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapRef.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
    })

    this.map.addControl(new maplibregl.NavigationControl())
    this.map.addControl(new maplibregl.FullscreenControl())

  }

}
