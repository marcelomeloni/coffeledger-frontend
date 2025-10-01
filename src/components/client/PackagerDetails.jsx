import React from 'react';

// Mapeamentos para labels
const packagingTypes = {
  vacuum_bag: 'Vacuum Sealed Bag',
  valve_bag: 'Valve Bag',
  kraft_bag: 'Kraft Paper Bag',
  tin_can: 'Tin Can',
  doypack: 'Doypack',
  grain_pro: 'Grain Pro'
};

const packageSizes = {
  '250g': '250g',
  '500g': '500g',
  '1kg': '1kg',
  '2kg': '2kg',
  '5kg': '5kg',
  '60kg': '60kg (Bag)'
};

const gasFlushingTypes = {
  none: 'None',
  nitrogen: 'Nitrogen',
  carbon_dioxide: 'Carbon Dioxide'
};

const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export function PackagerDetails({ packagerMetadata }) {
  const mockPackagerData = {
    packagingCompany: "Artisan Coffee Packaging",
    location: "São Paulo, SP - Brazil",
    packagingDesign: "Custom, minimalist design with gold foil accents and embossed logo.",
    producerSeal: "yes",
    preparationMessage: "Recommended for V60 pour-over. Use 1:16 coffee to water ratio. Enjoy within 3 weeks of opening for optimal flavor.",
    packagingType: "doypack",
    packageSize: "250g",
    weight: 250,
    packagingDate: "2024-09-10T00:00:00.000Z",
    expirationDate: "2025-09-10T00:00:00.000Z",
    lotNumber: "LOT-2025-001-BR",
    qrCode: "yes",
    gasFlushing: "nitrogen",
    packagingNotes: "Batch packaged on a state-of-the-art machine. Each bag sealed with nitrogen gas to preserve freshness."
  };

  const data = packagerMetadata || mockPackagerData;

  const {
    packagingCompany,
    location,
    packagingDesign,
    producerSeal,
    preparationMessage,
    packagingType,
    packageSize,
    weight,
    packagingDate,
    expirationDate,
    lotNumber,
    qrCode,
    gasFlushing,
    packagingNotes
  } = data;

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Título Principal */}
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-10 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            The Final Touch
          </span>
        </h2>
        
        {/* Introdução ao Processo de Embalagem */}
        <div className="text-center mb-16">
          <p className="text-lg sm:text-xl font-light italic leading-relaxed text-gray-400">
            Your coffee, now perfectly roasted, is prepared for its final destination.
            The packaging is designed to preserve its exceptional quality and tell its unique story.
          </p>
        </div>

        {/* Informações da Embalagem - Layout em Colunas */}
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-12">
            {/* Lado Esquerdo: Detalhes do Design */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-bold text-amber-300 mb-2">Design & Identity</h3>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Packaging Type</span>
                <span className="text-white mt-1">{packagingTypes[packagingType] || 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Package Size</span>
                <span className="text-white mt-1">{packageSizes[packageSize] || 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Net Weight</span>
                <span className="text-white mt-1">{weight ? `${weight}g` : 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Lot Number</span>
                <span className="text-white mt-1">{lotNumber || 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Producer Seal</span>
                <span className="text-white mt-1">{producerSeal === 'yes' ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">QR Code</span>
                <span className="text-white mt-1">{qrCode === 'yes' ? 'Yes' : 'No'}</span>
              </div>
            </div>

            {/* Lado Direito: Detalhes de Frescor e Preparo */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-bold text-amber-300 mb-2">Preservation & Freshness</h3>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Packaging Date</span>
                <span className="text-white mt-1">{formatDate(packagingDate)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Expiration Date</span>
                <span className="text-white mt-1">{formatDate(expirationDate)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Gas Flushing</span>
                <span className="text-white mt-1">{gasFlushingTypes[gasFlushing] || 'Not specified'}</span>
              </div>
              <div className="flex flex-col mt-4">
                <h4 className="text-md font-semibold text-amber-300">Preparation Message</h4>
                <p className="text-sm font-light leading-relaxed italic text-gray-300 mt-1">
                  {preparationMessage || 'No preparation instructions available.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seção para Notas Adicionais */}
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-amber-300">Packaging Notes</h3>
          <p className="text-sm font-light leading-relaxed italic text-gray-300">
            {packagingNotes || 'No additional notes for this packaging stage.'}
          </p>
        </div>
      </div>
    </div>
  );
}