import React from 'react';
import { MapPin, Truck, TrendingUp, ThermometerSun, Droplets } from 'lucide-react';

const TransportMetric = ({ icon, label, value }) => (
  <div className="p-6 bg-stone-950/50 border border-stone-800/50 rounded-2xl">
    <div className="flex items-center gap-3 mb-3">
      {React.cloneElement(icon, { className: 'w-6 h-6 text-blue-400' })}
    </div>
    <div className="text-sm text-stone-500 uppercase tracking-wider mb-2">{label}</div>
    <div className="text-lg font-semibold text-stone-200">{value}</div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-slate-900/30 rounded-lg">
    <span className="text-slate-400 text-sm">{label}</span>
    <span className="text-slate-200 font-medium capitalize">{value}</span>
  </div>
);

export const LogisticsDetails = ({ logisticsMetadata }) => {
  if (!logisticsMetadata) return null;

  // 1. Mapa de legendas ATUALIZADO para o inglês.
  const vehicleTypeLabels = {
    truck_refrigerated: "Refrigerated Truck",
    truck_dry: "Dry Truck",
    van: "Van",
    container_ship: "Container Ship",
    air_cargo: "Air Cargo",
  };

  // 2. A lógica para usar o mapa continua a mesma.
  const vehicleLabel = vehicleTypeLabels[logisticsMetadata.vehicleType] || logisticsMetadata.vehicleType;

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-black via-blue-950 to-black">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-600" />
            <span className="text-blue-600 text-sm font-medium tracking-[0.3em] uppercase">Transportation</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-600" />
          </div>
          <h2 className="text-5xl pb-3 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 mb-4 leading-normal">
            Logistics & Transport
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto">
            Tracking ID: {logisticsMetadata.trackingId}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="p-8 bg-blue-950/30 border border-blue-900/30 rounded-2xl">
            <h3 className="text-2xl font-bold text-blue-100 mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Origin
            </h3>
            <p className="text-lg text-stone-300 mb-4">{logisticsMetadata.origin}</p>
            {logisticsMetadata.startTime && (
              <p className="text-sm text-stone-400">
                Departure: {new Date(logisticsMetadata.startTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            )}
          </div>

          <div className="p-8 bg-blue-950/30 border border-blue-900/30 rounded-2xl">
            <h3 className="text-2xl font-bold text-blue-100 mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Destination
            </h3>
            <p className="text-lg text-stone-300 mb-4">{logisticsMetadata.destination}</p>
            {logisticsMetadata.endTime && (
              <p className="text-sm text-stone-400">
                Arrival: {new Date(logisticsMetadata.endTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <TransportMetric icon={<Truck />} label="Vehicle" value={vehicleLabel} />
          <TransportMetric icon={<TrendingUp />} label="Distance" value={`${logisticsMetadata.distance} km`} />
          <TransportMetric icon={<ThermometerSun />} label="Temperature" value={`${logisticsMetadata.temperatureControl}°C`} />
          <TransportMetric icon={<Droplets />} label="Humidity" value={`${logisticsMetadata.humidityControl}%`} />
        </div>

        {logisticsMetadata.transportCertifications && logisticsMetadata.transportCertifications.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {logisticsMetadata.transportCertifications.map((cert) => (
              <div key={cert} className="px-4 py-2 bg-green-950/30 border border-green-800/30 rounded-full">
                <span className="text-green-400 text-sm font-medium capitalize">{cert.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};