import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrigindo o problema do ícone de marcador padrão do Leaflet com Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;

// Mapeamento de um ícone Leaflet personalizado com a cor âmbar
const amberIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const LocationMap = ({ lat, lng, farmName, address }) => {
  if (!lat || !lng) {
    return (
      <div className="bg-gray-800 p-6 rounded-2xl text-center text-gray-500">
        <p className="text-lg">Localização não informada.</p>
        <p className="text-sm mt-2">Os dados de coordenadas não estão disponíveis para este registro.</p>
      </div>
    );
  }

  const position = [lat, lng];

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl transition-all duration-300 hover:shadow-3xl">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={amberIcon}>
          <Popup>
            <div className="text-black font-sans">
              <strong className="block text-lg mb-1">{farmName}</strong>
              <span className="text-sm text-gray-700">{address}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};