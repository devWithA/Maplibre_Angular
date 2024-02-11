import { Injectable } from '@angular/core';
import { Map } from 'maplibre-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() {
    // @ts-ignore
    MapboxDraw.constants.classes.CONTROL_BASE = 'maplibregl-ctrl';
    // @ts-ignore
    MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
    // @ts-ignore
    MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';
  }

  addPitchToggleControl(map: Map) {
    map.addControl(new PitchToggle(60), "top-right")
  }

  addDrawControl(map: Map) {
    const draw: any = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
        point: true,
        line_string: true,
        combine_features: true,
        uncombine_features: true,
      }
    });
    map.addControl(draw);
  }
}

class PitchToggle {
  _pitch: number;
  _map: Map | undefined;
  _container: HTMLDivElement;
  _btn: HTMLButtonElement;

  constructor(pitch = 60) {
    this._pitch = pitch;
    this._btn = document.createElement("button");
    this._container = document.createElement("div");
  }

  onAdd(map: Map): HTMLDivElement {
    this._map = map;

    this._btn.className = "maplibregl-ctrl-icon bi bi-box"
    this._btn.type = "button"

    this._btn.onclick = () => {
      if (map.getPitch() == 0) {
        map.easeTo({
          pitch: this._pitch
        });
        this._container.classList.add("bg-primary")
      } else {
        map.easeTo({
          pitch: 0
        })
        this._container.classList.remove("bg-primary")
      }
    }

    this._container.className = "maplibregl-ctrl-group maplibregl-ctrl"
    this._container.appendChild(this._btn)
    return this._container
  }

  onRemove() {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._map = undefined;
  }

}