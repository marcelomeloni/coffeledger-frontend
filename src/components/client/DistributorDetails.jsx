import React from 'react';
import { Truck, MapPin, Users, Tag } from 'lucide-react';

const InfoCard = ({ icon, label, value }) => (
  <div className="p-6 bg-indigo-950/30 border border-indigo-900/30 rounded-2xl">
    <div className="flex items-center gap-4 mb-3">
      <div className="p-2 bg-indigo-500/20 rounded-lg">
        {React.cloneElement(icon, { className: 'w-6 h-6 text-indigo-400' })}
      </div>
      <h3 className="text-xl font-bold text-indigo-100">{label}</h3>
    </div>
    <div className="text-lg font-semibold text-stone-200 capitalize">
      {value}
    </div>
  </div>
);

const TagList = ({ label, items }) => (
  <div className="p-8 bg-indigo-950/30 border border-indigo-900/30 rounded-2xl">
    <h3 className="text-2xl font-bold text-indigo-100 mb-6">{label}</h3>
    <div className="flex flex-wrap gap-3">
      {items.map((item, i) => (
        <div key={i} className="px-4 py-2 bg-indigo-900/30 border border-indigo-700/40 rounded-full">
          <span className="text-indigo-300 text-sm capitalize">{item.replace('_', ' ')}</span>
        </div>
      ))}
    </div>
  </div>
);

export const DistributorDetails = ({ distributorMetadata }) => {
  if (!distributorMetadata) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US');
    } catch {
      return dateString;
    }
  };

  const getFullAddress = (addressObj) => {
    if (!addressObj) return 'N/A';
    const parts = [
      addressObj.street,
      addressObj.city,
      addressObj.state,
      addressObj.country
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {distributorMetadata.destinationAddress && (
            <InfoCard
              icon={<MapPin />}
              label="Destination Address"
              value={getFullAddress(distributorMetadata.destinationAddress)}
            />
          )}
          <InfoCard
            icon={<Truck />}
            label="Transport Mode"
            value={distributorMetadata.transportMode.replace('_', ' ')}
          />
          <InfoCard
            icon={<Users />}
            label="Client Type"
            value={distributorMetadata.clientType}
          />
          <InfoCard
            icon={<Tag />}
            label="Shipment Date"
            value={formatDate(distributorMetadata.distributionDate)}
          />
        </div>

        {distributorMetadata.salesChannel && distributorMetadata.salesChannel.length > 0 && (
          <TagList label="Sales Channels" items={distributorMetadata.salesChannel} />
        )}

        {distributorMetadata.distributionNotes && (
          <div className="p-8 mt-8 bg-gradient-to-br from-indigo-950/20 to-black/40 border border-indigo-600/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-indigo-100 mb-4">Additional Notes</h3>
            <p className="text-lg text-stone-300">{distributorMetadata.distributionNotes}</p>
          </div>
        )}
      </div>
    </section>
  );
};