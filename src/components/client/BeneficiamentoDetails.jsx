import React from 'react';

const MetricCard = ({ label, value, unit, icon, highlight }) => (
  <div className={`p-6 rounded-2xl border transition-all hover:scale-105 ${
    highlight 
      ? 'bg-gradient-to-br from-cyan-600/20 to-cyan-950/20 border-cyan-600/40' 
      : 'bg-stone-950/50 border-stone-800/30'
  }`}>
    <div className="text-3xl mb-3">{icon}</div>
    <div className="text-sm text-stone-500 uppercase tracking-wider mb-2">{label}</div>
    <div className="flex items-baseline gap-2">
      <span className={`text-4xl font-bold ${highlight ? 'text-cyan-300' : 'text-stone-200'}`}>
        {value}
      </span>
      <span className="text-xl text-stone-400">{unit}</span>
    </div>
  </div>
);

const QualityCard = ({ label, value, unit }) => (
  <div className="p-6 bg-gradient-to-br from-stone-900/80 to-black/80 border border-stone-700/50 rounded-2xl">
    <div className="text-sm text-stone-500 uppercase tracking-wider mb-2">{label}</div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-stone-200">{value}</span>
      <span className="text-lg text-stone-400">{unit}</span>
    </div>
  </div>
);

export const BeneficiamentoDetails = ({ beneficiamentoMetadata }) => {
  if (!beneficiamentoMetadata) return null;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-stone-950 to-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-600" />
            <span className="text-cyan-600 text-sm font-medium tracking-[0.3em] uppercase">Processing</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-500 mb-4">
            Dry Mill Processing
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            {beneficiamentoMetadata.millingFacilityName}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <MetricCard 
            label="Input Weight"
            value={beneficiamentoMetadata.incomingWeightKg}
            unit="kg"
            icon="⬇️"
          />
          <MetricCard 
            label="Output Weight"
            value={beneficiamentoMetadata.finalGreenWeightKg}
            unit="kg"
            icon="⬆️"
          />
          <MetricCard 
            label="Yield"
            value={beneficiamentoMetadata.yieldPercentage}
            unit="%"
            icon="📊"
            highlight
          />
        </div>

        {beneficiamentoMetadata.processingSteps && (
          <div className="p-8 bg-stone-950/50 border border-stone-800/50 rounded-2xl mb-12">
            <h3 className="text-2xl font-bold text-cyan-100 mb-6">Processing Steps</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {beneficiamentoMetadata.processingSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-cyan-950/20 border border-cyan-900/30 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-cyan-600/20 flex items-center justify-center text-cyan-400 font-bold">
                    {i + 1}
                  </div>
                  <span className="text-stone-300 capitalize">{step.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <QualityCard 
            label="Final Moisture"
            value={beneficiamentoMetadata.moistureAfterProcessing}
            unit="%"
          />
          <QualityCard 
            label="Defect Rate"
            value={beneficiamentoMetadata.defectDistribution?.defectivePercentage || 'N/A'}
            unit={beneficiamentoMetadata.defectDistribution?.defectivePercentage ? '%' : ''}
          />
        </div>
      </div>
    </section>
  );
};