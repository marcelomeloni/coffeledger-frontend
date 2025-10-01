import React from 'react';
import { LocationMap } from './LocationMap';

const formatDate = (dateString) => {
  if (!dateString) return 'Não disponível';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

// Mapeamentos para labels
const transportCertifications = {
  organic_certified: 'Transporte Orgânico Certificado',
  sustainable: 'Transporte Sustentável',
  carbon_neutral: 'Carbono Neutro'
};

const vehicleTypes = {
  truck_refrigerated: 'Caminhão Refrigerado',
  truck_dry: 'Caminhão Seco',
  van: 'Van',
  container_ship: 'Navio Container',
  air_cargo: 'Avião de Carga'
};

export function LogisticsDetails({ logisticsMetadata }) {
  const mockLogisticsData = {
    trackingId: "TRK-2025-001-BLOCKCHAIN-HASH",
    transportCertifications: ["sustainable", "carbon_neutral"],
    origin: "Fazenda Santa Maria, Monte Verde-MG",
    originCoordinates: { lat: -22.8837, lng: -46.7275 },
    destination: "Armazém Central, São Paulo-SP",
    destinationCoordinates: { lat: -23.5505, lng: -46.6333 },
    startTime: "2025-09-12T08:00:00",
    endTime: "2025-09-12T10:09:00",
    vehicleType: "truck_dry",
    vehiclePlate: "ABC1D23",
    driverName: "João Silva",
    temperatureControl: null,
    humidityControl: null,
    distance: 138,
    transportConditions: "Transporte hermético, sem umidade, protegido de luz solar direta.",
    incidents: "Sem incidentes registrados. Viagem concluída com sucesso e dentro do prazo."
  };

  const data = logisticsMetadata || mockLogisticsData;

  const {
    trackingId,
    transportCertifications,
    origin,
    originCoordinates,
    destination,
    destinationCoordinates,
    startTime,
    endTime,
    vehicleType,
    vehiclePlate,
    driverName,
    temperatureControl,
    humidityControl,
    distance,
    transportConditions,
    incidents
  } = data;

  const certificationsLabels = transportCertifications?.map(cert => transportCertifications[cert] || cert).join(', ') || 'Nenhuma';
  const vehicleTypeLabel = vehicleTypes[vehicleType] || vehicleType;

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-10 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            Logística e Movimentação
          </span>
        </h2>
        
        {/* Bloco de Rastreamento e Certificações */}
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 mb-12">
          <h3 className="text-lg font-bold text-amber-300">Tracking ID</h3>
          <p className="text-2xl font-mono text-white mt-2 mb-4 break-words">
            {trackingId || 'N/A'}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 uppercase font-semibold">Certificações de Transporte:</span>
            <p className="text-sm font-light text-white italic">{certificationsLabels}</p>
          </div>
        </div>

        {/* Layout de duas colunas para detalhes técnicos e mapa */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Lado Esquerdo: Detalhes do Envio */}
          <div className="flex flex-col space-y-8 bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-amber-300">Detalhes do Envio</h3>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-300 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Partida</span>
                <span className="text-white mt-1">{formatDate(startTime)} às {formatTime(startTime)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Chegada</span>
                <span className="text-white mt-1">{formatDate(endTime)} às {formatTime(endTime)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Origem</span>
                <span className="text-white mt-1">{origin || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Destino</span>
                <span className="text-white mt-1">{destination || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Veículo</span>
                <span className="text-white mt-1">{vehicleTypeLabel || 'N/A'} ({vehiclePlate || 'N/A'})</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Motorista</span>
                <span className="text-white mt-1">{driverName || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Distância</span>
                <span className="text-white mt-1">{distance ? `${distance} km` : 'N/A'}</span>
              </div>
            </div>

            {transportConditions && (
              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-md font-semibold text-amber-300 mb-2">Condições do Transporte</h4>
                <p className="text-sm font-light leading-relaxed italic text-gray-300">
                  {transportConditions}
                </p>
              </div>
            )}
            
            {incidents && (
              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-md font-semibold text-amber-300 mb-2">Incidentes / Observações</h4>
                <p className="text-sm font-light leading-relaxed italic text-gray-300">
                  {incidents}
                </p>
              </div>
            )}
          </div>

          {/* Lado Direito: Mapa do Trajeto */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-amber-300 mb-4">Rota de Transporte</h3>
            <LocationMap
              origin={{ lat: originCoordinates?.lat, lng: originCoordinates?.lng }}
              destination={{ lat: destinationCoordinates?.lat, lng: destinationCoordinates?.lng }}
              farmName={origin}
              address={destination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}