import { Component, ElementRef, ViewChild } from '@angular/core';
import maplibregl, { Map } from 'maplibre-gl';
import { environment } from 'src/environments/environment';
import { Basemap } from 'src/models/basemap';
import { basemapList } from 'src/utilities/mapCommon';

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

  ngAfterViewInit(): void {
    this.map = new Map({
      container: this.mapRef.nativeElement, // container id
      style: this.basemapList[this.selectedBasemapIndex].url, // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
    })

    this.map.addControl(new maplibregl.NavigationControl())
    this.map.addControl(new maplibregl.FullscreenControl())

  }

  handleBasemapChange(basemap: Basemap, i: number) {
    if (this.selectedBasemapIndex === i) {
      return;
    }

    this.map.setStyle(basemap.url);
    this.selectedBasemapIndex = i;

  }

}
