import React from 'react';

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded-lg">
    <span className="text-slate-400 text-sm">{label}</span>
    <span className="text-slate-200 font-medium capitalize">{value}</span>
  </div>
);

export const DistributorDetails = ({ distributorMetadata }) => {
  if (!distributorMetadata) return null;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-indigo-950 to-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-600" />
            <span className="text-indigo-600 text-sm font-medium tracking-[0.3em] uppercase">Distribution</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-500 mb-4">
            Market Distribution
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            {distributorMetadata.distributorName}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-indigo-950/30 border border-indigo-900/30 rounded-2xl">
            <h3 className="text-2xl font-bold text-indigo-100 mb-6">Distribution Details</h3>
            <div className="space-y-4">
              <InfoRow label="Market" value={distributorMetadata.destinationMarket} />
              <InfoRow label="Customer Type" value={distributorMetadata.customerType} />
              <InfoRow label="Transport Mode" value={distributorMetadata.transportMode} />
              {distributorMetadata.distributionDate && (
                <InfoRow label="Distribution Date" value={new Date(distributorMetadata.distributionDate).toLocaleDateString('en-US')} />
              )}
            </div>
          </div>

          {distributorMetadata.salesChannel && distributorMetadata.salesChannel.length > 0 && (
            <div className="p-8 bg-indigo-950/30 border border-indigo-900/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-indigo-100 mb-6">Sales Channels</h3>
              <div className="flex flex-wrap gap-3">
                {distributorMetadata.salesChannel.map((channel) => (
                  <div key={channel} className="px-4 py-2 bg-indigo-900/30 border border-indigo-700/40 rounded-full">
                    <span className="text-indigo-300 text-sm capitalize">{channel.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {distributorMetadata.consumerTracking && (
          <div className="p-8 bg-gradient-to-br from-indigo-950/20 to-black/40 border border-indigo-600/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-indigo-100 mb-4">Consumer Tracking</h3>
            <p className="text-lg text-stone-300">{distributorMetadata.consumerTracking}</p>
          </div>
        )}
      </div>
    </section>
  );
};