import React from 'react';

const SensoryCard = ({ label, value, icon }) => (
  <div className="p-6 bg-stone-950/50 border border-stone-800/50 rounded-2xl hover:border-amber-600/30 transition-all">
    <div className="text-4xl mb-3">{icon}</div>
    <div className="text-sm text-stone-500 uppercase tracking-wider mb-2">{label}</div>
    <div className="text-xl font-semibold text-amber-100 capitalize">{value}</div>
  </div>
);

export const GraderDetails = ({ graderMetadata }) => {
  if (!graderMetadata) return null;

  const scoreColor = graderMetadata.scaScore >= 85 ? 'text-emerald-400' : 
                     graderMetadata.scaScore >= 80 ? 'text-amber-400' : 'text-orange-400';

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-stone-950 to-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-600" />
            <span className="text-amber-600 text-sm font-medium tracking-[0.3em] uppercase">Quality Control</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-4">
            Sensory Analysis
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Professional evaluation by {graderMetadata.evaluatorName}
          </p>
        </div>

        <div className="mb-16 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-emerald-600/20 blur-3xl" />
            <div className="relative p-12 bg-gradient-to-br from-stone-900/80 to-black/80 border border-amber-600/30 rounded-3xl backdrop-blur-xl">
              <div className="text-center space-y-4">
                <div className="text-sm text-amber-400 uppercase tracking-widest">SCA Score</div>
                <div className={`text-8xl font-bold ${scoreColor}`}>
                  {graderMetadata.scaScore}
                </div>
                <div className="flex items-center justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${
                      i < Math.floor(graderMetadata.scaScore / 20) 
                        ? 'bg-amber-400' 
                        : 'bg-stone-700'
                    }`} />
                  ))}
                </div>
                <div className="text-stone-400">Specialty Grade Coffee</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SensoryCard label="Aroma" value={graderMetadata.aroma} icon="🌸" />
          <SensoryCard label="Body" value={graderMetadata.body} icon="💧" />
          <SensoryCard label="Acidity" value={graderMetadata.acidity} icon="✨" />
          <SensoryCard label="Balance" value={graderMetadata.balance || 'excellent'} icon="⚖️" />
        </div>

        <div className="p-8 bg-gradient-to-br from-amber-950/20 to-black/40 border border-amber-600/20 rounded-2xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-amber-100 mb-6">Flavor Profile</h3>
          <p className="text-lg text-stone-300 leading-relaxed mb-6">
            {graderMetadata.flavor}
          </p>
          <div className="flex flex-wrap gap-3">
  {graderMetadata.flavor && graderMetadata.flavor.split(',').map((note, i) => (
    <div key={i} className="px-4 py-2 bg-amber-900/20 border border-amber-700/30 rounded-full">
      <span className="text-amber-300 text-sm">{note.trim()}</span>
    </div>
  ))}
</div>
          {graderMetadata.aftertaste && (
            <div className="mt-6 p-4 bg-stone-900/50 rounded-xl">
              <span className="text-stone-400 text-sm">Aftertaste: </span>
              <span className="text-stone-200">{graderMetadata.aftertaste}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};