import React from 'react';
import { Box, Package, Calendar, Coffee } from 'lucide-react';

const PackageInfo = ({ icon, label, value, highlight }) => (
  <div className={`p-6 rounded-2xl border transition-all hover:scale-105 ${
    highlight 
      ? 'bg-gradient-to-br from-purple-600/20 to-purple-950/20 border-purple-600/40' 
      : 'bg-stone-950/50 border-stone-800/30'
  }`}>
    <div className="flex items-center gap-3 mb-3">
      {React.cloneElement(icon, { className: `w-8 h-8 ${highlight ? 'text-purple-300' : 'text-purple-400'}` })}
    </div>
    <div className="text-sm text-stone-500 uppercase tracking-wider mb-2">{label}</div>
    <div className={`text-xl font-semibold ${highlight ? 'text-purple-200' : 'text-stone-200'} capitalize`}>
      {value}
    </div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded-lg">
    <span className="text-slate-400 text-sm">{label}</span>
    <span className="text-slate-200 font-medium capitalize">{value}</span>
  </div>
);

export const PackagerDetails = ({ packagerMetadata }) => {
  if (!packagerMetadata) return null;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-600" />
            <span className="text-purple-600 text-sm font-medium tracking-[0.3em] uppercase">Packaging</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-500 mb-4">
            Premium Packaging
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            {packagerMetadata.packagingCompany}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <PackageInfo icon={<Box />} label="Type" value={packagerMetadata.packagingType} />
          <PackageInfo icon={<Package />} label="Size" value={packagerMetadata.packageSize || packagerMetadata.weight + 'g'} />
          <PackageInfo icon={<Calendar />} label="Packed" value={new Date(packagerMetadata.packagingDate).toLocaleDateString('en-US')} highlight />
        </div>

        {packagerMetadata.preparationMessage && (
          <div className="p-8 bg-gradient-to-br from-purple-950/30 to-black border border-purple-900/30 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold text-purple-100 mb-4 flex items-center gap-2">
              <Coffee className="w-6 h-6" />
              Brewing Recommendations
            </h3>
            <p className="text-lg text-stone-300 leading-relaxed">{packagerMetadata.preparationMessage}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-stone-950/50 border border-stone-800/50 rounded-2xl">
            <h3 className="text-xl font-bold text-purple-100 mb-4">Package Details</h3>
            <div className="space-y-3">
              <InfoRow label="Lot Number" value={packagerMetadata.lotNumber} />
              <InfoRow label="QR Code" value={packagerMetadata.qrCode === 'yes' ? '✓ Included' : 'Not included'} />
              {packagerMetadata.gasFlushing && packagerMetadata.gasFlushing !== 'none' && (
                <InfoRow label="Gas Flushing" value={packagerMetadata.gasFlushing} />
              )}
            </div>
          </div>

          <div className="p-6 bg-stone-950/50 border border-stone-800/50 rounded-2xl">
            <h3 className="text-xl font-bold text-purple-100 mb-4">Freshness</h3>
            <div className="space-y-3">
              <InfoRow label="Packaging Date" value={new Date(packagerMetadata.packagingDate).toLocaleDateString('en-US')} />
              {packagerMetadata.expirationDate && (
                <InfoRow label="Best Before" value={new Date(packagerMetadata.expirationDate).toLocaleDateString('en-US')} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};