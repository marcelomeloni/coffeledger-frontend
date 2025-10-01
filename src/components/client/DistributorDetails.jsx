import React from 'react';
import { LocationMap } from './LocationMap';

// Mapeamentos para labels em inglês
const salesChannels = {
  ecommerce: "E-commerce",
  coffee_shop: "Coffee Shop",
  supermarket: "Supermarket",
  specialty_store: "Specialty Store",
  wholesale: "Wholesale"
};

const transportModes = {
  ground: "Ground",
  air: "Air",
  sea: "Sea"
};

const customerTypes = {
  cafe: "Cafeteria",
  restaurant: "Restaurant",
  hotel: "Hotel",
  retail: "Retail",
  wholesale: "Wholesale"
};

const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export function DistributorDetails({ distributorMetadata }) {
  const mockDistributorData = {
    distributorName: "Coffee Express Logistics",
    salesChannel: ["coffee_shop", "specialty_store"],
    consumptionHistory: "First time on the market, exclusive launch for a selected group of coffee shops in São Paulo.",
    consumerTracking: "QR Code on the package links directly to this batch page for full traceability.",
    destinationMarket: "São Paulo, SP - Brazil",
    destinationAddress: "Av. Paulista, 1000 - São Paulo, SP",
    destinationCoordinates: {
      lat: -23.5635,
      lng: -46.6521
    },
    distributionDate: "2024-09-12T00:00:00.000Z",
    transportMode: "ground",
    customerType: "cafe",
    distributionNotes: "Delivered in refrigerated conditions to maintain freshness."
  };

  const data = distributorMetadata || mockDistributorData;

  const {
    distributorName,
    salesChannel,
    consumptionHistory,
    consumerTracking,
    destinationMarket,
    destinationAddress,
    destinationCoordinates,
    distributionDate,
    transportMode,
    customerType,
    distributionNotes,
  } = data;

  const salesChannelLabels = salesChannel?.map(channel => salesChannels[channel] || channel).join(', ') || 'Not available';
  const transportModeLabel = transportModes[transportMode] || transportMode;
  const customerTypeLabel = customerTypes[customerType] || customerType;

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Título Principal */}
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-10 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            The Final Destination
          </span>
        </h2>

        {/* Storytelling e Informações de Rastreamento */}
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 mb-16">
          <p className="text-xl sm:text-2xl font-light italic leading-relaxed text-gray-400 text-center">
            Your coffee has now reached its final stop, ready to be brewed and enjoyed.
          </p>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold text-amber-300">
              <span className="text-white">{distributorName || 'Not specified'}</span>
            </h3>
            <p className="text-sm font-light text-gray-400">
              {destinationMarket || 'Market not specified'}
            </p>
          </div>
          {consumerTracking && (
            <p className="text-xs font-light leading-relaxed text-gray-500 italic mt-6 text-center">
              *Consumer Tracking: {consumerTracking}
            </p>
          )}
        </div>

        {/* Layout de duas colunas para Mapa e Detalhes da Distribuição */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Lado Esquerdo: Localização de Destino */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold text-amber-300 drop-shadow-md mb-1">
              Destination
            </h3>
            <p className="text-sm font-light text-gray-400 mb-6">
              {destinationAddress || 'Address not available'}
            </p>
            <LocationMap
              lat={destinationCoordinates?.lat}
              lng={destinationCoordinates?.lng}
              farmName={distributorName}
              address={destinationAddress}
            />
          </div>

          {/* Lado Direito: Logística e Detalhes */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-amber-300 mb-4">Delivery Log</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-300 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Distribution Date</span>
                <span className="text-white mt-1">{formatDate(distributionDate)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Transport Mode</span>
                <span className="text-white mt-1">{transportModeLabel || 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Sales Channel</span>
                <span className="text-white mt-1">{salesChannelLabels}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Customer Type</span>
                <span className="text-white mt-1">{customerTypeLabel || 'Not specified'}</span>
              </div>
            </div>
            {distributionNotes && (
              <div className="mt-8 border-t border-gray-700 pt-4">
                <h4 className="text-md font-semibold text-amber-300 mb-2">Delivery Notes</h4>
                <p className="text-sm font-light italic leading-relaxed text-gray-300">
                  {distributionNotes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Histórico de Consumo/Observações (opcional) */}
        {consumptionHistory && (
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 mt-8">
            <h3 className="text-xl font-bold mb-4 text-amber-300">Consumption History</h3>
            <p className="text-sm font-light leading-relaxed italic text-gray-300">
              {consumptionHistory}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}