import React from 'react';
import { LocationMap } from './LocationMap';

// Mapeamentos para labels em inglês para consistência
const roastNumbers = {
  test_roast: 'Test Roast',
  final_roast: 'Final Roast',
  production: 'Production Batch'
};

const roastDestinations = {
  espresso: 'Espresso',
  filter: 'Filter',
  microlot: 'Exclusive Microlot',
  blend: 'Blend'
};

const roastProfiles = {
  light: 'Light',
  medium_light: 'Medium-Light',
  medium: 'Medium',
  medium_dark: 'Medium-Dark',
  dark: 'Dark',
  espresso: 'Espresso',
  filter: 'Filter',
  french: 'French'
};

const roasterTypes = {
  drum: 'Drum Roaster',
  fluid_bed: 'Fluid Bed',
  hot_air: 'Hot Air'
};

const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export function RoasterDetails({ roasterMetadata }) {
  // Mock data for development
  const mockRoasterData = {
    roasteryName: "Craft & Roast Coffee Co.",
    roasteryLocation: { lat: -23.5505, lng: -46.6333 },
    roastNumber: "final_roast",
    roastDestination: "filter",
    postRoastProtocol: "Cupping validation performed 24 hours after roasting by our head roaster to ensure quality.",
    roastProfile: "medium_light",
    roastDate: "2024-09-05T00:00:00.000Z",
    batchSize: 15,
    chargeTemperature: 180,
    temperature: 215,
    dropTemperature: 198,
    duration: 12,
    firstCrack: 8.5,
    secondCrack: 11.2,
    developmentTime: 2.5,
    developmentRatio: 20.8,
    roasterType: "drum",
    roastNotes: "Developed notes of red fruit and caramel. Clean cup with a bright, balanced acidity. Roast was uniform and without defects."
  };

  const data = roasterMetadata || mockRoasterData;

  const {
    roasteryName,
    roasteryLocation,
    roastNumber,
    roastDestination,
    postRoastProtocol,
    roastProfile,
    roastDate,
    batchSize,
    chargeTemperature,
    temperature,
    dropTemperature,
    duration,
    firstCrack,
    secondCrack,
    developmentTime,
    developmentRatio,
    roasterType,
    roastNotes
  } = data;

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Título da Seção */}
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-10 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            The Roasting Process
          </span>
        </h2>
        
        {/* Seção Principal: Destaque do Perfil e da Localização */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
          {/* Lado Esquerdo: Localização e Informações Chave */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold text-amber-300 drop-shadow-md mb-1">
              {roasteryName || 'Roastery not specified'}
            </h3>
            <p className="text-sm font-light text-gray-400 mb-6">
              {roasteryLocation ? `${roasteryLocation.lat}, ${roasteryLocation.lng}` : 'Location not available'}
            </p>
            <LocationMap 
              lat={roasteryLocation?.lat} 
              lng={roasteryLocation?.lng} 
              farmName={roasteryName} 
              address={'Roastery Location'} 
            />
          </div>

          {/* Lado Direito: Perfil da Torra em Destaque */}
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-amber-300 mb-4">Roast Profile</h3>
              <p className="text-4xl sm:text-5xl font-playfair font-black text-white leading-none mb-4">
                {roastProfiles[roastProfile] || roastProfile || 'Not specified'}
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-gray-300 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-semibold">Roast Date</span>
                  <span className="text-white mt-1">{formatDate(roastDate)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-semibold">Batch Size</span>
                  <span className="text-white mt-1">{batchSize ? `${batchSize} kg` : 'Not specified'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-semibold">Roast Type</span>
                  <span className="text-white mt-1">{roasterTypes[roasterType] || roasterType || 'Not specified'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs uppercase font-semibold">Destination</span>
                  <span className="text-white mt-1">{roastDestinations[roastDestination] || roastDestination || 'Not specified'}</span>
                </div>
              </div>
            </div>
            {postRoastProtocol && (
              <div className="mt-8 border-t border-gray-700 pt-4">
                <h4 className="text-md font-semibold text-amber-300 mb-2">Protocol</h4>
                <p className="text-sm font-light italic leading-relaxed text-gray-300">
                  {postRoastProtocol}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Seção da Curva de Torra e Dados Técnicos */}
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-amber-300">Roasting Metrics</h3>
          <p className="text-sm font-light leading-relaxed italic text-gray-300 mb-6">
            A precisely controlled process is key to unlocking the full potential of these beans.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-300 text-sm">
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-xs uppercase font-semibold">Total Duration</span>
              <span className="text-white mt-1 text-lg font-bold">{duration ? `${duration} min` : 'N/A'}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-xs uppercase font-semibold">Development Time</span>
              <span className="text-white mt-1 text-lg font-bold">{developmentTime ? `${developmentTime} min` : 'N/A'}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-xs uppercase font-semibold">First Crack</span>
              <span className="text-white mt-1 text-lg font-bold">{firstCrack ? `${firstCrack} min` : 'N/A'}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-xs uppercase font-semibold">Charge Temp</span>
              <span className="text-white mt-1 text-lg font-bold">{chargeTemperature ? `${chargeTemperature}°C` : 'N/A'}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-xs uppercase font-semibold">Max Temp</span>
              <span className="text-white mt-1 text-lg font-bold">{temperature ? `${temperature}°C` : 'N/A'}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-xs uppercase font-semibold">Drop Temp</span>
              <span className="text-white mt-1 text-lg font-bold">{dropTemperature ? `${dropTemperature}°C` : 'N/A'}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-gray-400 text-xs uppercase font-semibold">Dev Ratio</span>
              <span className="text-white mt-1 text-lg font-bold">{developmentRatio ? `${developmentRatio}%` : 'N/A'}</span>
            </div>
          </div>
          {roastNotes && (
            <div className="mt-8 border-t border-gray-700 pt-4">
              <h4 className="text-md font-semibold text-amber-300 mb-2">Roaster's Notes</h4>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">
                {roastNotes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}