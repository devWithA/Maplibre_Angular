import { Component, ElementRef, ViewChild } from '@angular/core';
import maplibregl, { Map } from 'maplibre-gl';
import { environment } from 'src/environments/environment';
import { Basemap } from 'src/app/models/basemap';
import { basemapList } from 'src/app/utilities/mapCommon';
import { MapService } from '../services/mapService/map.service';
import * as turf from '@turf/turf'
import { DrawCreateEvent } from '@mapbox/mapbox-gl-draw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @ViewChild("map")
  private mapRef!: ElementRef<HTMLElement>;
  map!: Map;

  basemapList: Basemap[] = basemapList;
  selectedBasemapIndex = 0

  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapRef.nativeElement, // container id
      style: this.basemapList[this.selectedBasemapIndex].url, // style URL
      center: [-74.0349617, 40.7148305], // starting position [lng, lat]
      zoom: 15, // starting zoom,
      // pitch: 60
    })

    this.map.addControl(new maplibregl.NavigationControl())
    this.map.addControl(new maplibregl.FullscreenControl())

    this.mapService.addPitchToggleControl(this.map);

    this.mapService.addDrawControl(this.map);

    this.map.on('draw.create', this.handleDraw);
    this.map.on('draw.update', this.handleDraw);

  }

  handleBasemapChange(basemap: Basemap, i: number) {
    if (this.selectedBasemapIndex === i) {
      return;
    }

    this.map.setStyle(basemap.url);
    this.selectedBasemapIndex = i;

  }

  handleDraw(e: DrawCreateEvent) {
    let drawFeature = e.features[0];

    switch (drawFeature.geometry.type) {
      case "Polygon":
        const area = turf.area(drawFeature);
        alert("Area : " + area.toFixed(2) + " m. sq.")
        break;
      case "LineString":
        const length = turf.length(drawFeature);
        alert("Length : " + length.toFixed(2) + " km")
        break;
      case "Point":
        // console.log("Point");
        break;
      default:
        break;
    }

  }

}
