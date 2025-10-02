import React from 'react';
import { Box, Package, Calendar, Coffee, Image as ImageIcon, Sparkles } from 'lucide-react';
import { formatLabel } from '../../lib/utils.js';

const Card = ({ title, children, icon }) => (
  <div className="p-8 bg-purple-950/30 border border-purple-900/30 rounded-2xl">
    <div className="flex items-center gap-4 mb-6">
      {icon && React.cloneElement(icon, { className: 'w-6 h-6 text-purple-400' })}
      <h3 className="text-2xl font-bold text-purple-100">{title}</h3>
    </div>
    {children}
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded-lg">
    <span className="text-slate-400 text-sm">{label}</span>
    <span className="text-slate-200 font-medium capitalize">{value}</span>
  </div>
);

const TagList = ({ items }) => (
  <div className="flex flex-wrap gap-3">
    {items.map((item, i) => (
      <div key={i} className="px-4 py-2 bg-purple-900/30 border border-purple-700/40 rounded-full">
        <span className="text-purple-300 text-sm capitalize">{item.replace('_', ' ')}</span>
      </div>
    ))}
  </div>
);

export const PackagerDetails = ({ packagerMetadata }) => {
  if (!packagerMetadata) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

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

        {packagerMetadata.packagingImage && (
          <div className="mb-12 text-center">
            <h3 className="text-xl text-purple-200 mb-4">Your coffee's unique look:</h3>
            <img 
              src={packagerMetadata.packagingImage} 
              alt="Coffee packaging" 
              className="w-full max-w-sm mx-auto rounded-2xl shadow-xl border border-white/10" 
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card title="Package Details" icon={<Box />}>
            <div className="space-y-3">
              <DetailRow label="Package Type" value={formatLabel(packagerMetadata.packagingType)} />
              <DetailRow label="Package Size" value={packagerMetadata.packageSize} />
              <DetailRow label="Packed Date" value={formatDate(packagerMetadata.packagingDate)} />
              {packagerMetadata.bestBeforeDate && (
                <DetailRow label="Best Before" value={formatDate(packagerMetadata.bestBeforeDate)} />
              )}
            </div>
          </Card>
          
          <Card title="Freshness & Quality" icon={<Sparkles />}>
            <div className="space-y-4">
              {packagerMetadata.freshnessSeal && packagerMetadata.freshnessSeal.length > 0 && (
                <div>
                  <h4 className="text-sm text-purple-200/80 mb-2">Freshness Technology</h4>
                  <TagList items={packagerMetadata.freshnessSeal} />
                </div>
              )}
              {packagerMetadata.packagingDesign && (
                <div className="p-4 bg-purple-900/20 rounded-xl mt-4">
                  <p className="text-sm text-purple-300 leading-relaxed">
                    {packagerMetadata.packagingDesign}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {packagerMetadata.preparationMessage && (
          <Card title="Brewing Recommendations" icon={<Coffee />}>
            <p className="text-lg text-stone-300 leading-relaxed">{packagerMetadata.preparationMessage}</p>
          </Card>
        )}
      </div>
    </section>
  );
};