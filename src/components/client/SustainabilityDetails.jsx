import React from 'react';

// Mapeamentos para labels
const sustainabilityCertifications = {
  carbon_neutral: 'Carbon Neutral',
  b_corp: 'B Corp',
  rainforest_alliance: 'Rainforest Alliance',
  fair_trade: 'Fair Trade',
  organic: 'Organic',
  bird_friendly: 'Bird Friendly'
};

export function SustainabilityDetails({ sustainabilityMetadata }) {
  const mockSustainabilityData = {
    carbonFootprint: 2.5,
    renewableEnergy: "Our roasting facility runs entirely on solar power, and we partner with a local delivery service that uses electric vehicles for urban distribution.",
    socialImpact: "A portion of every sale supports a local community project that provides education and healthcare to the children of our coffee farmers.",
    waterUsage: "We use a closed-loop water system for coffee processing, reducing water consumption by 80% and ensuring no contaminated water is released into the local ecosystem.",
    biodiversity: "Our farm practices agroforestry, intercropping coffee with native fruit trees to promote local biodiversity and create a natural habitat for migratory birds.",
    certifications: ["carbon_neutral", "rainforest_alliance", "fair_trade"]
  };

  const data = sustainabilityMetadata || mockSustainabilityData;

  const {
    carbonFootprint,
    renewableEnergy,
    socialImpact,
    waterUsage,
    biodiversity,
    certifications
  } = data;

  const certificationsLabels = certifications?.map(cert => sustainabilityCertifications[cert] || cert).join(', ') || 'None';

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-10 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            A Commitment to the Planet
          </span>
        </h2>
        
        {/* Destaque para a pegada de carbono */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-2xl shadow-lg border border-gray-700 mb-12 text-center">
          <h3 className="text-xl font-bold text-amber-300 mb-2">Carbon Footprint</h3>
          <p className="text-5xl font-playfair font-black text-white drop-shadow-lg">
            {carbonFootprint ? `${carbonFootprint} kg CO2` : '--'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            per kg of coffee
          </p>
        </div>

        {/* Layout de duas colunas para detalhes de sustentabilidade */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Lado Esquerdo: Impacto Ambiental */}
          <div className="flex flex-col space-y-8 bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-amber-300">Environmental Impact</h3>
            <div>
              <h4 className="text-md font-semibold text-amber-300 mb-2">Renewable Energy</h4>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">{renewableEnergy || 'No information available.'}</p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-amber-300 mb-2">Water Management</h4>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">{waterUsage || 'No information available.'}</p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-amber-300 mb-2">Biodiversity</h4>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">{biodiversity || 'No information available.'}</p>
            </div>
          </div>
          
          {/* Lado Direito: Impacto Social e Certificações */}
          <div className="flex flex-col space-y-8 bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold text-amber-300">Social & Certifications</h3>
            <div>
              <h4 className="text-md font-semibold text-amber-300 mb-2">Social Impact</h4>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">{socialImpact || 'No information available.'}</p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-amber-300 mb-2">Certifications</h4>
              <p className="text-sm font-bold text-white leading-relaxed">
                {certificationsLabels}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}