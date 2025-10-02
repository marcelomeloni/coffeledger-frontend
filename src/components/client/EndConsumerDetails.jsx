import React from 'react';
import { Coffee, Award, Thermometer, Droplets, Clock, Zap, Target, Star, User } from 'lucide-react';

// Importe a função de formatação que criamos
import { formatLabel } from '../../lib/utils';

// Um novo componente interno para exibir as métricas da receita
const RecipeMetric = ({ icon, label, value, unit }) => (
  <div className="text-center p-4 bg-yellow-950/40 rounded-lg border border-yellow-800/30">
    <div className="flex justify-center items-center gap-2 mb-2">
      {React.cloneElement(icon, { className: 'w-4 h-4 text-yellow-400/70' })}
      <div className="text-xs text-yellow-400/60 uppercase tracking-widest">{label}</div>
    </div>
    <div className="text-2xl font-bold text-yellow-200">
      {value}
      {unit && <span className="text-lg font-normal text-yellow-400/80 ml-1">{unit}</span>}
    </div>
  </div>
);

export const EndConsumerDetails = ({ endConsumerMetadata }) => {
  if (!endConsumerMetadata) return null;

  const {
    preparationMethod,
    baristaName,
    grindSize,
    doseIn,
    doseOut,
    extractionTime,
    waterTemperature,
    tastingNotes,
    consumerFeedback
  } = endConsumerMetadata;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-yellow-950 to-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-600" />
            <span className="text-yellow-600 text-sm font-medium tracking-[0.3em] uppercase">Final Chapter</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 mb-4 leading-normal">
            Brewing & Enjoyment
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            The final expression of the coffee's journey, crafted by the barista.
          </p>
        </div>

        <div className="space-y-12">
          {/* Seção da Receita de Preparo */}
          <div className="p-8 bg-yellow-950/30 border border-yellow-900/30 rounded-2xl">
            <h3 className="text-3xl font-bold text-yellow-100 mb-6 font-serif">Brewing Recipe</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {preparationMethod && <RecipeMetric icon={<Coffee />} label="Method" value={formatLabel(preparationMethod)} />}
              {grindSize && <RecipeMetric icon={<Zap />} label="Grind" value={formatLabel(grindSize)} />}
              {doseIn && <RecipeMetric icon={<Star />} label="Dose" value={doseIn} unit="g" />}
              {doseOut && <RecipeMetric icon={<Target />} label="Yield" value={doseOut} unit="g" />}
              {extractionTime && <RecipeMetric icon={<Clock />} label="Time" value={extractionTime} unit="s" />}
              {waterTemperature && <RecipeMetric icon={<Thermometer />} label="Temp" value={waterTemperature} unit="°C" />}
            </div>
          </div>

          {/* Seção de Perfil Sensorial e Notas */}
          <div className="p-8 bg-yellow-950/30 border border-yellow-900/30 rounded-2xl">
            <h3 className="text-3xl font-bold text-yellow-100 mb-6 font-serif">Sensory Profile & Notes</h3>
            
            {tastingNotes && tastingNotes.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-yellow-300/80 mb-3">Perceived Tasting Notes</h4>
                <div className="flex flex-wrap gap-3">
                  {tastingNotes.map((note) => (
                    <div key={note} className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                      <span className="text-yellow-300 text-sm font-medium">{formatLabel(note)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(baristaName || consumerFeedback) && (
              <div className="mt-6 border-t border-yellow-800/50 pt-6">
                {baristaName && (
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-5 h-5 text-yellow-400/80" />
                    <p className="text-lg text-stone-300">
                      Notes by: <span className="font-semibold text-yellow-200">{baristaName}</span>
                    </p>
                  </div>
                )}
                {consumerFeedback && (
                  <p className="text-lg text-stone-300/90 leading-relaxed font-light italic">
                    "{consumerFeedback}"
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};