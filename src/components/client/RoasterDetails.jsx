import React from 'react';

const RoastMetric = ({ label, value, highlight }) => (
  <div className={`flex justify-between items-center p-4 rounded-xl ${
    highlight ? 'bg-orange-900/20 border border-orange-700/30' : 'bg-stone-900/30'
  }`}>
    <span className="text-stone-400">{label}</span>
    <span className={`font-semibold ${highlight ? 'text-orange-300' : 'text-stone-200'} capitalize`}>
      {value}
    </span>
  </div>
);

const TemperatureCard = ({ label, value, unit, color }) => {
  const colors = {
    blue: 'from-blue-600/20 to-blue-900/20 border-blue-600/30 text-blue-300',
    orange: 'from-orange-600/20 to-orange-900/20 border-orange-600/30 text-orange-300',
    red: 'from-red-600/20 to-red-900/20 border-red-600/30 text-red-300'
  };

  return (
    <div className={`p-6 bg-gradient-to-br ${colors[color]} border rounded-2xl`}>
      <div className="text-sm text-stone-400 uppercase tracking-wider mb-2">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-bold">{value}</span>
        <span className="text-2xl">{unit}</span>
      </div>
    </div>
  );
};

export const RoasterDetails = ({ roasterMetadata }) => {
  if (!roasterMetadata) return null;

  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-950/20 via-transparent to-transparent animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-600" />
            <span className="text-orange-600 text-sm font-medium tracking-[0.3em] uppercase">Transformation</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-orange-400 to-red-500 mb-4">
            The Art of Roasting
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Crafted at {roasterMetadata.roasteryName}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div className="p-8 bg-gradient-to-br from-orange-950/30 to-black border border-orange-900/30 rounded-2xl">
            <h3 className="text-2xl font-bold text-orange-100 mb-6">Roast Profile</h3>
            <div className="space-y-4">
              <RoastMetric label="Profile" value={roasterMetadata.roastProfile} highlight />
              <RoastMetric label="Roast Date" value={new Date(roasterMetadata.roastDate).toLocaleDateString()} />
              <RoastMetric label="Batch Size" value={`${roasterMetadata.batchSize || '15'} kg`} />
              <RoastMetric label="Duration" value={`${roasterMetadata.duration || '12'} min`} />
              {roasterMetadata.firstCrack && (
                <RoastMetric label="First Crack" value={`${roasterMetadata.firstCrack} min`} />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <TemperatureCard 
              label="Charge Temp" 
              value={roasterMetadata.chargeTemperature || 180}
              unit="°C"
              color="blue"
            />
            <TemperatureCard 
              label="Max Temp" 
              value={roasterMetadata.temperature || 215}
              unit="°C"
              color="orange"
            />
            <TemperatureCard 
              label="Drop Temp" 
              value={roasterMetadata.dropTemperature || 198}
              unit="°C"
              color="red"
            />
          </div>
        </div>

        <div className="text-center p-8 bg-gradient-to-r from-orange-950/20 via-red-950/20 to-orange-950/20 border border-orange-600/20 rounded-2xl backdrop-blur-sm">
          <div className="text-sm text-orange-400 uppercase tracking-widest mb-2">Recommended For</div>
          <div className="text-3xl font-bold text-orange-200 capitalize">
            {roasterMetadata.roastDestination || 'Espresso & Filter'}
          </div>
        </div>
      </div>
    </section>
  );
};