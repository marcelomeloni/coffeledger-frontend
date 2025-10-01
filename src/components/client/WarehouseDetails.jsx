import React from 'react';
import { LocationMap } from './LocationMap';

// Função para formatar a data
const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export function WarehouseDetails({ warehouseMetadata }) {
  // Mock data for development
  const mockWarehouseData = {
    warehouseName: "Grain & Grind Logistics Hub",
    location: "São Paulo, SP - Brazil",
    coordinates: {
      lat: -23.4255,
      lng: -46.4784
    },
    storageCapacity: "50 tonnes",
    internalBatching: "Organized by microlot and harvest year",
    storageType: "jute_bag",
    temperature: 20,
    humidity: 60,
    stockEntryDate: "2024-06-01T00:00:00.000Z",
    stockExitDate: null, // Pode ser nulo se o lote ainda estiver lá
    storageDuration: 90,
    inspectionDate: "2024-08-28T00:00:00.000Z",
    pestControl: "preventive",
    warehouseNotes: "Lote verificado ao entrar e inspecionado mensalmente. Umidade e temperatura mantidas em níveis ideais para preservar a qualidade."
  };

  const data = warehouseMetadata || mockWarehouseData;

  const {
    warehouseName,
    location,
    coordinates,
    storageCapacity,
    internalBatching,
    storageType,
    temperature,
    humidity,
    stockEntryDate,
    stockExitDate,
    storageDuration,
    inspectionDate,
    pestControl,
    warehouseNotes,
  } = data;

  // Map values to human-readable labels
  const storageTypeLabel = {
    silo: "Silo",
    big_bag: "Big Bag",
    jute_bag: "Jute Bag",
    grain_pro: "Grain Pro",
    vacuum: "Vacuum Sealed"
  }[storageType] || storageType;

  const pestControlLabel = {
    none: "None",
    preventive: "Preventive",
    corrective: "Corrective",
    biological: "Biological"
  }[pestControl] || pestControl;

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading for the section */}
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-10 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            The Art of Preservation
          </span>
        </h2>
        
        {/* Storytelling and Warehouse Intro */}
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 mb-16">
          <p className="text-xl sm:text-2xl font-light italic leading-relaxed text-gray-300 text-center">
            Your coffee’s journey continues where science meets art.
          </p>
          <p className="text-sm font-light leading-relaxed text-gray-400 mt-6 text-center">
            Following its harvest, this exceptional batch was carefully moved to a state-of-the-art facility,
            where precise conditions are maintained to protect its delicate flavors.
          </p>
        </div>

        {/* Two-Column Layout: Map & Data */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Warehouse Location & Map */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold text-amber-300 drop-shadow-md mb-1">
              {warehouseName || 'Warehouse not specified'}
            </h3>
            <p className="text-sm font-light text-gray-400 mb-6">
              {location || 'Location not available'}
            </p>
            <LocationMap 
              lat={coordinates?.lat} 
              lng={coordinates?.lng} 
              farmName={warehouseName} 
              address={location} 
            />
          </div>

          {/* Right Column: Key Metrics & Conditions */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-amber-300 mb-4">Storage Log</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-300 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Entry Date</span>
                <span className="text-white mt-1">{formatDate(stockEntryDate)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Exit Date</span>
                <span className="text-white mt-1">{formatDate(stockExitDate)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Storage Duration</span>
                <span className="text-white mt-1">{storageDuration ? `${storageDuration} days` : 'Not available'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Type of Storage</span>
                <span className="text-white mt-1">{storageTypeLabel || 'Not available'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Temperature</span>
                <span className="text-white mt-1">{temperature ? `${temperature}°C` : 'Not available'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Humidity</span>
                <span className="text-white mt-1">{humidity ? `${humidity}%` : 'Not available'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Pest Control</span>
                <span className="text-white mt-1">{pestControlLabel || 'Not available'}</span>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-md font-semibold text-amber-300 mb-2">Internal Batching</h4>
              <p className="text-sm font-light italic leading-relaxed text-gray-300">
                {internalBatching || 'Not available'}
              </p>
            </div>
          </div>
        </div>

        {/* Warehouse Notes / Story section */}
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 mt-8">
          <h3 className="text-xl font-bold mb-4 text-amber-300">Warehouse Notes</h3>
          <p className="text-sm font-light leading-relaxed italic text-gray-300">
            {warehouseNotes || 'No specific notes for this batch.'}
          </p>
        </div>
      </div>
    </div>
  );
}