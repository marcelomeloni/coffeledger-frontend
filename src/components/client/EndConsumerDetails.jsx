import React from 'react';

export function EndConsumerDetails({ consumerMetadata }) {
  const mockConsumerData = {
    preparationNotes: "This coffee excels with a V60 pour-over method. We recommend a medium-fine grind and a brew ratio of 1:16 for a vibrant and clean cup.",
    extractionDetails: "Water Temperature: 94°C. Extraction Time: 2:45. Grind Size: 18 on a Comandante grinder.",
    consumerExperience: "Customers have praised the coffee's bright acidity and complex fruit notes. It pairs exceptionally well with pastries and light breakfast foods.",
    competitionUse: "Featured in the 2025 Brazilian Barista Championship as the signature espresso, earning a 'Best Espresso' award for its exceptional clarity and sweetness."
  };

  const data = consumerMetadata || mockConsumerData;

  const {
    preparationNotes,
    extractionDetails,
    consumerExperience,
    competitionUse,
  } = data;

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-playfair font-black text-center mb-10 drop-shadow-lg">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
            The Final Experience
          </span>
        </h2>
        
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-700 space-y-8">
          {preparationNotes && (
            <div>
              <h3 className="text-xl font-bold text-amber-300 mb-2">Preparation Notes</h3>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">
                {preparationNotes}
              </p>
            </div>
          )}

          {extractionDetails && (
            <div>
              <h3 className="text-xl font-bold text-amber-300 mb-2">Extraction Details</h3>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">
                {extractionDetails}
              </p>
            </div>
          )}

          {consumerExperience && (
            <div>
              <h3 className="text-xl font-bold text-amber-300 mb-2">Consumer Feedback</h3>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">
                {consumerExperience}
              </p>
            </div>
          )}

          {competitionUse && (
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-bold text-amber-300 mb-2">Competition Use</h3>
              <p className="text-sm font-light leading-relaxed italic text-gray-300">
                {competitionUse}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}