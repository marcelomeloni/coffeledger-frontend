import React from 'react';
import { Wind, Droplets, Users, Leaf, CheckCircle } from 'lucide-react';

// Importe a função de formatação
import { formatLabel } from '../../lib/utils';

// Um novo componente interno para exibir cada prática
const PracticeItem = ({ text }) => (
  <div className="flex items-start gap-3">
    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
    <span className="text-stone-300 text-lg">{text}</span>
  </div>
);

// Manteremos este card para o "Impacto Social", que é mais textual
const SustainabilityCard = ({ icon, title, content }) => (
  <div className="p-8 bg-emerald-950/30 border border-emerald-900/30 rounded-2xl h-full">
    <div className="flex items-center gap-3 mb-4">
      {React.cloneElement(icon, { className: 'w-8 h-8 text-emerald-400' })}
      <h3 className="text-2xl font-bold text-emerald-100">{title}</h3>
    </div>
    <p className="text-lg text-stone-300 leading-relaxed">{content}</p>
  </div>
);

export const SustainabilityDetails = ({ sustainabilityMetadata }) => {
  if (!sustainabilityMetadata) return null;

  // Desestruturar os dados para facilitar o uso
  const {
    certifications,
    carbonFootprint,
    waterManagement,
    biodiversityPractices,
    renewableEnergyPractices,
    socialImpact
  } = sustainabilityMetadata;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-emerald-950 to-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-600" />
            <span className="text-emerald-600 text-sm font-medium tracking-[0.3em] uppercase">Impact</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-500 mb-4 leading-normal">
            Sustainability
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Environmental and social responsibility at every step
          </p>
        </div>

        {carbonFootprint && (
          <div className="mb-16 flex justify-center">
            <div className="p-10 bg-gradient-to-br from-emerald-950/30 to-black border border-emerald-900/30 rounded-3xl text-center">
              <div className="text-sm text-emerald-400 uppercase tracking-widest mb-4">Carbon Footprint</div>
              <div className="text-6xl font-bold text-emerald-300 mb-2">
                {carbonFootprint}
              </div>
              <div className="text-stone-400">kg CO₂ per kg of coffee</div>
            </div>
          </div>
        )}
        
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Nova seção para Práticas Sustentáveis */}
            <div className="p-8 bg-emerald-950/30 border border-emerald-900/30 rounded-2xl space-y-8">
                <h3 className="text-3xl font-bold text-emerald-100 font-serif border-b border-emerald-800 pb-4">
                    Sustainable Practices
                </h3>
                
                {/* Gerenciamento de Água */}
                {waterManagement && (
                    <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-emerald-300/80 flex items-center gap-2">
                            <Droplets className="w-5 h-5"/> Water Management
                        </h4>
                        <PracticeItem text={formatLabel(waterManagement)} />
                    </div>
                )}

                {/* Práticas de Biodiversidade */}
                {biodiversityPractices && biodiversityPractices.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-emerald-300/80 flex items-center gap-2">
                           <Leaf className="w-5 h-5"/> Biodiversity
                        </h4>
                        {biodiversityPractices.map(practice => <PracticeItem key={practice} text={formatLabel(practice)} />)}
                    </div>
                )}
                
                {/* Práticas de Energia Renovável */}
                {renewableEnergyPractices && renewableEnergyPractices.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-emerald-300/80 flex items-center gap-2">
                           <Wind className="w-5 h-5"/> Renewable Energy
                        </h4>
                        {renewableEnergyPractices.map(practice => <PracticeItem key={practice} text={formatLabel(practice)} />)}
                    </div>
                )}
            </div>
            
            {/* O Impacto Social ainda usa o card antigo, pois é um texto descritivo */}
            {socialImpact && (
                <SustainabilityCard 
                    icon={<Users />}
                    title="Social Impact"
                    content={socialImpact}
                />
            )}
        </div>

        {certifications && certifications.length > 0 && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-emerald-100 mb-6 font-serif">Certifications</h3>
            <div className="flex flex-wrap gap-4 justify-center">
                {certifications.map((cert) => (
                <div key={cert} className="px-5 py-2.5 bg-emerald-950/30 border border-emerald-800/30 rounded-full">
                    <span className="text-emerald-300 font-medium">{formatLabel(cert)}</span>
                </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};