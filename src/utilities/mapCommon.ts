import { environment } from "src/environments/environment";
import { Basemap } from "src/models/basemap";


const maptilerKey = environment.maptilerKey;

export const basemapList: Basemap[] = [
    {
        url: `https://api.maptiler.com/maps/basic-v2/style.json?key=${maptilerKey}`,
        image: "assets/maps/basic-v2.png"
    },
    {
        url: `https://api.maptiler.com/maps/satellite/style.json?key=${maptilerKey}`,
        image: "assets/maps/satellite.png"
    },
    {
        url: `https://api.maptiler.com/maps/topo-v2/style.json?key=${maptilerKey}`,
        image: "assets/maps/topo-v2.png"
    }
]