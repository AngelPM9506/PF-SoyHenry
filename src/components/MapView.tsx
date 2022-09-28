import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CityInDB } from 'src/utils/interface';
import { Key, useEffect, useState } from 'react';

L.Icon.Default.imagePath = "/";

function MultipleMarkers({cities}: any) {
    return cities.map((c: CityInDB, index: Key) => {
      return <Marker key={index} position={[c.longitude, c.latitude]}>
                    <Popup>
                        {c.name}
                    </Popup>
             </Marker>;
    });
}

const MapView = ({cities}: any) => {

    const getIntersection = (cities: any) => {
        const coordinates = cities.map((c: CityInDB) => {
            return {
                lat: c.longitude,
                long: c.latitude
            }
        })

        var corner1 = L.latLng(coordinates[0].lat, coordinates[0].long)
        var corner2 = L.latLng(coordinates[coordinates.length - 1].lat, coordinates[coordinates.length - 1].long)

        const bounds = L.latLngBounds(corner1, corner2);
        return bounds.getCenter()
    }


    return(
        <MapContainer center={[cities.length === 1 ? cities[0].longitude : getIntersection(cities).lat, cities.length === 1 ? cities[0].latitude : getIntersection(cities).lng]} zoom={4} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MultipleMarkers cities={cities}/>
        </MapContainer>
    )
}

export default MapView;
