import React from 'react';
import { Wind, Droplets, Users, Leaf } from 'lucide-react';

const SustainabilityCard = ({ icon, title, content }) => (
  <div className="p-8 bg-emerald-950/30 border border-emerald-900/30 rounded-2xl">
    <div className="flex items-center gap-3 mb-4">
      {React.cloneElement(icon, { className: 'w-8 h-8 text-emerald-400' })}
      <h3 className="text-2xl font-bold text-emerald-100">{title}</h3>
    </div>
    <p className="text-lg text-stone-300 leading-relaxed">{content}</p>
  </div>
);

export const SustainabilityDetails = ({ sustainabilityMetadata }) => {
  if (!sustainabilityMetadata) return null;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-emerald-950 to-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-600" />
            <span className="text-emerald-600 text-sm font-medium tracking-[0.3em] uppercase">Impact</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-500 mb-4">
            Sustainability
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Environmental and social responsibility at every step
          </p>
        </div>

        {sustainabilityMetadata.carbonFootprint && (
          <div className="mb-12 flex justify-center">
            <div className="p-12 bg-gradient-to-br from-emerald-950/30 to-black border border-emerald-900/30 rounded-3xl text-center">
              <div className="text-sm text-emerald-400 uppercase tracking-widest mb-4">Carbon Footprint</div>
              <div className="text-6xl font-bold text-emerald-300 mb-2">
                {sustainabilityMetadata.carbonFootprint}
              </div>
              <div className="text-stone-400">kg CO₂ per kg of coffee</div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {sustainabilityMetadata.renewableEnergy && (
            <SustainabilityCard 
              icon={<Wind />}
              title="Renewable Energy"
              content={sustainabilityMetadata.renewableEnergy}
            />
          )}
          {sustainabilityMetadata.waterUsage && (
            <SustainabilityCard 
              icon={<Droplets />}
              title="Water Efficiency"
              content={sustainabilityMetadata.waterUsage}
            />
          )}
          {sustainabilityMetadata.socialImpact && (
            <SustainabilityCard 
              icon={<Users />}
              title="Social Impact"
              content={sustainabilityMetadata.socialImpact}
            />
          )}
          {sustainabilityMetadata.biodiversity && (
            <SustainabilityCard 
              icon={<Leaf />}
              title="Biodiversity"
              content={sustainabilityMetadata.biodiversity}
            />
          )}
        </div>

        {sustainabilityMetadata.certifications && sustainabilityMetadata.certifications.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {sustainabilityMetadata.certifications.map((cert) => (
              <div key={cert} className="px-6 py-3 bg-emerald-950/30 border border-emerald-800/30 rounded-full">
                <span className="text-emerald-400 text-sm font-medium capitalize">{cert.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};