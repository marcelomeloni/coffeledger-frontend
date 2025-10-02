import React from 'react';
import { ThermometerSun, Droplets, Clock } from 'lucide-react';
import { formatLabel } from '../../lib/utils.js';
const StorageMetric = ({ icon, label, value, unit, highlight }) => (
  <div className={`p-6 rounded-2xl border transition-all hover:scale-105 ${
    highlight 
      ? 'bg-gradient-to-br from-slate-600/20 to-slate-950/20 border-slate-600/40' 
      : 'bg-slate-950/50 border-slate-800/30'
  }`}>
    <div className="flex items-center gap-3 mb-3">
      {React.cloneElement(icon, { className: `w-8 h-8 ${highlight ? 'text-slate-300' : 'text-slate-400'}` })}
    </div>
    <div className="text-sm text-slate-500 uppercase tracking-wider mb-2">{label}</div>
    <div className="flex items-baseline gap-2">
      <span className={`text-4xl font-bold ${highlight ? 'text-slate-200' : 'text-slate-300'}`}>{value}</span>
      <span className="text-xl text-slate-400">{unit}</span>
    </div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded-lg">
    <span className="text-slate-400 text-sm">{label}</span>
    <span className="text-slate-200 font-medium capitalize">{value}</span>
  </div>
);

export const WarehouseDetails = ({ warehouseMetadata }) => {
  if (!warehouseMetadata) return null;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-600" />
            <span className="text-slate-600 text-sm font-medium tracking-[0.3em] uppercase">Storage</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 mb-4">
            Warehouse Control
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            {warehouseMetadata.warehouseName}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StorageMetric 
            icon={<ThermometerSun />}
            label="Temperature"
            value={warehouseMetadata.temperature}
            unit="°C"
          />
          <StorageMetric 
            icon={<Droplets />}
            label="Humidity"
            value={warehouseMetadata.humidity}
            unit="%"
          />
          <StorageMetric 
            icon={<Clock />}
            label="Storage Duration"
            value={warehouseMetadata.storageDuration}
            unit="days"
            highlight
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 bg-slate-950/50 border border-slate-800/50 rounded-2xl">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Storage Details</h3>
            <div className="space-y-3">
              <InfoRow label="Type" value={formatLabel(warehouseMetadata.storageType)} />
              <InfoRow label="Capacity" value={warehouseMetadata.storageCapacity} />
              <InfoRow label="Entry Date" value={new Date(warehouseMetadata.stockEntryDate).toLocaleDateString('en-US')} />
              {warehouseMetadata.stockExitDate && (
                <InfoRow label="Exit Date" value={new Date(warehouseMetadata.stockExitDate).toLocaleDateString('en-US')} />
              )}
            </div>
          </div>

          <div className="p-8 bg-slate-950/50 border border-slate-800/50 rounded-2xl">
            <h3 className="text-2xl font-bold text-slate-100 mb-4">Quality Control</h3>
            <div className="space-y-3">
              <InfoRow label="Pest Control" value={formatLabel(warehouseMetadata.pestControl)} />
              <InfoRow label="Last Inspection" value={new Date(warehouseMetadata.inspectionDate).toLocaleDateString('en-US')} />
            </div>
            {warehouseMetadata.warehouseNotes && (
              <div className="mt-4 p-4 bg-slate-900/50 rounded-xl">
                <p className="text-sm text-slate-300">{warehouseMetadata.warehouseNotes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};