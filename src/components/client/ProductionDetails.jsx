import React from 'react';
import { LocationMap } from './LocationMap';
import { Leaf, Mountain, Wheat, Sunset, HandPlatter, Droplets, Medal } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  const date = new Date(dateString);
  // Using 'en-US' locale for consistent English formatting
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Mapeamentos para labels em inglês
const processingMethodLabels = {
  natural: "Natural Process",
  washed: "Washed Process",
  honey: "Honey Process",
  'semi-washed': "Semi-Washed Process",
  anaerobic: "Anaerobic Fermentation",
  carbonic_maceration: "Carbonic Maceration"
};

const harvestMethodLabels = {
  manual: "Manual (Stripping)",
  selective: "Selective Picking",
  mechanical: "Mechanical Harvesting"
};

const certificationDisplay = {
  organic: { label: "Organic Certified", icon: Leaf },
  fair_trade: { label: "Fair Trade", icon: HandPlatter },
  rainforest: { label: "Rainforest Alliance", icon: Droplets }, // Using droplets for nature
  utz: { label: "UTZ Certified", icon: Medal },
  bird_friendly: { label: "Bird Friendly", icon: Leaf } // Reusing leaf for nature/bird
};

export function ProductionDetails({ producerMetadata }) {
  // Mock data para desenvolvimento, ajustada para storytelling e inglês
  const mockProducerData = {
    farmName: "Fazenda Ouro Negro",
    address: "BR-265, Km 230, São Sebastião da Grama-SP, Brazil",
    coordinates: {
      lat: -21.8015,
      lng: -46.7912
    },
    altitude: 1250, // meters
    variety: "Bourbon Amarelo",
    cropYear: "2024/25",
    harvestDate: "2024-05-15T00:00:00.000Z",
    producerStory: "Nestled in the heart of São Sebastião da Grama, Fazenda Ouro Negro is a third-generation family farm, renowned for its unwavering passion for cultivating exceptional specialty coffees. Our tradition, rich in heritage, blends seamlessly with innovative, sustainable practices, crafting beans of unparalleled flavor. We are deeply committed to respecting the environment and nurturing our local community, ensuring every cup tells a story of care, quality, and legacy.",
    harvestMethod: "selective", // "selective" -> Selective Picking
    processingMethod: "natural", // "natural" -> Natural Process
    qualityScore: 89.5,
    certifications: ["fair_trade", "organic"]
  };

  const data = producerMetadata || mockProducerData;

  const {
    farmName,
    address,
    coordinates,
    altitude,
    variety,
    cropYear,
    harvestDate,
    producerStory,
    harvestMethod,
    processingMethod,
    qualityScore,
    certifications,
  } = data;

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Título da Seção com gradiente Deluxe */}
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-10 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            The Origin Story
          </span>
        </h2>
        
        {/* Bloco principal de storytelling: Farm, Altitude, Variety, Harvest */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-700 mb-16 relative overflow-hidden">
          {/* Fundo sutil de montanha/folha */}
          <div className="absolute inset-0 opacity-10 blur-sm">
            <img src="https://images.unsplash.com/photo-1517596825368-232973166b2e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Coffee farm background" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10 text-center">
            <h3 className="text-4xl font-playfair font-bold text-amber-300 drop-shadow-md mb-4 leading-tight">
              From the Lush Hills of {farmName || 'Our Farm'}
            </h3>
            <p className="text-lg font-light text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
              Every bean in this batch began its journey at the esteemed <strong className="text-white">{farmName || 'a distinguished farm'}</strong>, nestled in the picturesque {address || 'an undisclosed location'} in Brazil.
              It was cultivated at a remarkable altitude of <strong className="text-white">{altitude ? `${altitude} meters` : 'unknown altitude'}</strong>, where the unique microclimate nurtures the <strong className="text-white">{variety || 'a fine variety'}</strong> coffee trees.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto mt-10">
              {/* Card: Altitude */}
              <div className="bg-gray-800 bg-opacity-70 p-5 rounded-xl shadow-lg border border-gray-700 flex items-center space-x-4">
                <Mountain className="h-8 w-8 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Altitude</p>
                  <p className="text-xl font-semibold text-white">{altitude ? `${altitude} m` : 'N/A'}</p>
                </div>
              </div>
              {/* Card: Variety */}
              <div className="bg-gray-800 bg-opacity-70 p-5 rounded-xl shadow-lg border border-gray-700 flex items-center space-x-4">
                <Wheat className="h-8 w-8 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Variety</p>
                  <p className="text-xl font-semibold text-white">{variety || 'N/A'}</p>
                </div>
              </div>
              {/* Card: Harvest Date */}
              <div className="bg-gray-800 bg-opacity-70 p-5 rounded-xl shadow-lg border border-gray-700 flex items-center space-x-4">
                <Sunset className="h-8 w-8 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">Harvested</p>
                  <p className="text-xl font-semibold text-white">{formatDate(harvestDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção da Experiência do Produtor & Métodos */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16">
          {/* História do Produtor - Coluna da Esquerda */}
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-amber-300">The Producer's Legacy</h3>
              <p className="text-base font-light leading-relaxed text-gray-300">
                {producerStory || 'The producer\'s story is currently unavailable.'}
              </p>
            </div>
            {certifications && certifications.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-lg font-bold text-amber-300 mb-3">Certifications:</h4>
                <div className="flex flex-wrap gap-4">
                  {certifications.map((cert, i) => {
                    const certDisplay = certificationDisplay[cert];
                    if (!certDisplay) return null; // Handle unknown certifications
                    const Icon = certDisplay.icon;
                    return (
                      <span key={i} className="flex items-center bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm font-medium shadow-md">
                        <Icon className="h-4 w-4 mr-2 text-amber-400" /> {certDisplay.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Métodos de Colheita e Processamento - Coluna da Direita */}
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-amber-300 mb-4">Crafted with Care</h3>
              <p className="text-base text-gray-300 mb-6">
                This coffee is a testament to meticulous cultivation and traditional methods.
              </p>
              
              <div className="space-y-6">
                {/* Método de Colheita */}
                <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg shadow-md border border-gray-700">
                  <HandPlatter className="h-8 w-8 text-amber-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 uppercase font-semibold">Harvest Method</p>
                    <p className="text-xl font-semibold text-white">{harvestMethodLabels[harvestMethod] || harvestMethod || 'Not specified'}</p>
                  </div>
                </div>
                {/* Método de Processamento */}
                <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg shadow-md border border-gray-700">
                  <Droplets className="h-8 w-8 text-amber-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 uppercase font-semibold">Processing Method</p>
                    <p className="text-xl font-semibold text-white">{processingMethodLabels[processingMethod] || processingMethod || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {qualityScore && (
                <div className="mt-8 text-center bg-gray-900 p-6 rounded-lg shadow-md border border-gray-700">
                  <p className="text-sm text-gray-400 uppercase font-semibold">Quality Score</p>
                  <p className="text-5xl font-playfair font-black text-amber-400 mt-2">{qualityScore.toFixed(1)} <span className="text-gray-500 text-3xl">/ 100</span></p>
                  <p className="text-xs text-gray-500 mt-2">SCA Protocol Evaluation</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Seção do Mapa (em seu próprio card, para melhor visibilidade e contexto) */}
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700">
          <h3 className="text-2xl font-bold text-amber-300 drop-shadow-md mb-6 text-center">
            Where It All Began
          </h3>
          <LocationMap
            lat={coordinates?.lat}
            lng={coordinates?.lng}
            farmName={farmName}
            address={address}
          />
          <p className="text-sm text-gray-500 text-center mt-6">
            Explore the precise location of {farmName} where these exceptional beans were grown.
          </p>
        </div>
      </div>
    </div>
  );
}