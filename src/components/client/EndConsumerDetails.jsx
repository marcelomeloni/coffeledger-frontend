import React from 'react';
import { Coffee, Award } from 'lucide-react';

export const EndConsumerDetails = ({ endConsumerMetadata }) => {
  if (!endConsumerMetadata) return null;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-yellow-950 to-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-600" />
            <span className="text-yellow-600 text-sm font-medium tracking-[0.3em] uppercase">Experience</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 mb-4">
            Brewing & Enjoyment
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Notes from baristas and coffee lovers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {endConsumerMetadata.preparationNotes && (
            <div className="p-8 bg-yellow-950/30 border border-yellow-900/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-yellow-100 mb-4 flex items-center gap-2">
                <Coffee className="w-6 h-6" />
                Preparation Notes
              </h3>
              <p className="text-lg text-stone-300 leading-relaxed">{endConsumerMetadata.preparationNotes}</p>
            </div>
          )}

          {endConsumerMetadata.extractionDetails && (
            <div className="p-8 bg-yellow-950/30 border border-yellow-900/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-yellow-100 mb-4">Extraction Details</h3>
              <p className="text-lg text-stone-300 leading-relaxed">{endConsumerMetadata.extractionDetails}</p>
            </div>
          )}

          {endConsumerMetadata.consumerExperience && (
            <div className="p-8 bg-yellow-950/30 border border-yellow-900/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-yellow-100 mb-4">Consumer Experience</h3>
              <p className="text-lg text-stone-300 leading-relaxed">{endConsumerMetadata.consumerExperience}</p>
            </div>
          )}

          {endConsumerMetadata.competitionUse && (
            <div className="p-8 bg-gradient-to-br from-yellow-950/30 to-amber-950/30 border border-yellow-600/40 rounded-2xl">
              <h3 className="text-2xl font-bold text-yellow-100 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Competition Use
              </h3>
              <p className="text-lg text-stone-300 leading-relaxed">{endConsumerMetadata.competitionUse}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};