import React, { useState, useEffect } from 'react';
import { formatLabel } from '../../lib/utils.js';
import { 
  MapPin, Truck, TrendingUp, ThermometerSun, Droplets, 
  Clock, Package, Navigation, Zap, Shield, Leaf, 
  CheckCircle, Car, Ship, Plane, Warehouse
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;

// Custom amber marker icon for Leaflet
const amberIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Route Map Component - CORRIGIDO para mostrar todos os trajetos
const RouteMap = ({ stages }) => {
  if (!stages || stages.length === 0) {
    return (
      <div className="bg-stone-800/50 p-8 rounded-2xl text-center text-stone-400 border border-stone-700/50">
        <Package className="w-12 h-12 mx-auto mb-4 text-stone-500" />
        <p className="text-lg font-medium mb-2">Insufficient Route Data</p>
        <p className="text-sm">Coffee journey route cannot be displayed yet.</p>
      </div>
    );
  }

  // Filtra estágios válidos com coordenadas
  const validStages = stages.filter(stage => 
    stage.originCoordinates && stage.destinationCoordinates &&
    stage.originCoordinates.lat && stage.originCoordinates.lng &&
    stage.destinationCoordinates.lat && stage.destinationCoordinates.lng
  );

  if (validStages.length === 0) {
    return (
      <div className="bg-stone-800/50 p-8 rounded-2xl text-center text-stone-400 border border-stone-700/50">
        <MapPin className="w-12 h-12 mx-auto mb-4 text-stone-500" />
        <p className="text-lg font-medium mb-2">Missing Coordinates</p>
        <p className="text-sm">Location data needed to map the route.</p>
      </div>
    );
  }

  // Coleta TODAS as coordenadas para definir os bounds do mapa
  const allCoordinates = validStages.flatMap(stage => [
    [stage.originCoordinates.lat, stage.originCoordinates.lng],
    [stage.destinationCoordinates.lat, stage.destinationCoordinates.lng]
  ]);

  const bounds = L.latLngBounds(allCoordinates);

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden border border-stone-700/50 shadow-2xl">
      <MapContainer
        bounds={bounds}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        zoomControl={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Renderiza TODOS os trajetos válidos */}
        {validStages.map((stage, index) => {
          const origin = [stage.originCoordinates.lat, stage.originCoordinates.lng];
          const destination = [stage.destinationCoordinates.lat, stage.destinationCoordinates.lng];

          // Define cores diferentes para cada etapa
          const colors = ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444'];
          const routeColor = colors[index % colors.length];

          return (
            <React.Fragment key={`stage-${index}-${stage.origin}-${stage.destination}`}>
              <Polyline 
                positions={[origin, destination]} 
                color={routeColor}
                weight={5} 
                opacity={0.8}
              />
              <Marker position={origin} icon={amberIcon}>
                <Popup className="custom-popup">
                  <div className="text-center min-w-[200px]">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <strong className="text-base text-gray-900">
                        Origin Stage {index + 1}
                      </strong>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stage.origin}</p>
                    <p className="text-xs text-gray-500">
                      Distance: {stage.distance || 'N/A'} km
                    </p>
                  </div>
                </Popup>
              </Marker>
              <Marker position={destination} icon={amberIcon}>
                <Popup className="custom-popup">
                  <div className="text-center min-w-[200px]">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <strong className="text-base text-gray-900">
                        Destination Stage {index + 1}
                      </strong>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stage.destination}</p>
                    <p className="text-xs text-gray-500">
                      {stage.endTime ? 'Completed' : 'In Progress'}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

// Transport Metric Component
const TransportMetric = ({ icon, label, value, subtitle }) => (
  <div className="p-6 bg-stone-950/50 border border-stone-800/50 rounded-2xl hover:border-amber-500/30 transition-all duration-300 group">
    <div className="flex items-center gap-3 mb-3">
      {React.cloneElement(icon, { className: 'w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors' })}
    </div>
    <div className="text-sm text-stone-500 uppercase tracking-wider mb-2">{label}</div>
    <div className="text-lg font-semibold text-stone-200 group-hover:text-white transition-colors">{value}</div>
    {subtitle && <div className="text-xs text-stone-400 mt-1">{subtitle}</div>}
  </div>
);

// Journey Step Component - CORRIGIDO para status correto
const JourneyStep = ({ 
  stage, 
  location, 
  description, 
  startTime, 
  endTime, 
  isCurrent, 
  isCompleted, 
  transportModeIcon,
  distance
}) => (
  <div className={`relative flex items-start gap-4 p-6 rounded-xl transition-all duration-300 ${
    isCurrent ? 'bg-amber-500/10 border border-amber-500/30 shadow-lg' : 
    isCompleted ? 'bg-green-500/10 border border-green-500/30' : 'bg-stone-800/20 border border-stone-700/20 hover:bg-stone-800/30'
  }`}>
    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
      isCurrent ? 'bg-amber-500 animate-pulse shadow-lg' : 
      isCompleted ? 'bg-green-500' : 'bg-stone-600'
    }`}>
      {isCompleted ? <CheckCircle className="w-6 h-6 text-white" /> : transportModeIcon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <h3 className={`font-semibold text-lg truncate ${
          isCurrent ? 'text-amber-300' : 
          isCompleted ? 'text-green-300' : 'text-stone-300'
        }`}>
          {stage}
        </h3>
        <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${
          isCurrent ? 'bg-amber-500/20 text-amber-300' : 
          isCompleted ? 'bg-green-500/20 text-green-300' : 'bg-stone-600/50 text-stone-400'
        }`}>
          {isCurrent ? 'In Progress' : isCompleted ? 'Completed' : 'Pending'}
        </span>
      </div>
      <p className="text-stone-200 mb-2 truncate">{location}</p>
      {distance && (
        <p className="text-sm text-amber-400 mb-2 font-medium">
          📏 {distance} km traveled
        </p>
      )}
      {description && <p className="text-sm text-stone-400 mb-3 leading-relaxed">{description}</p>}
      <div className="flex items-center gap-4 text-xs text-stone-500 flex-wrap">
        {startTime && (
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Departure: {new Date(startTime).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        )}
        {endTime && (
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Arrival: {new Date(endTime).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        )}
      </div>
    </div>
  </div>
);

// Main Component - CORRIGIDO para status correto
export const LogisticsDetails = ({ logisticsMetadata }) => {
  const [animatedDistance, setAnimatedDistance] = useState(0);

  // Safely handle logistics data - ensure it's always an array
  const logisticsStages = React.useMemo(() => {
    if (!logisticsMetadata) return [];
    return Array.isArray(logisticsMetadata) ? logisticsMetadata : [logisticsMetadata];
  }, [logisticsMetadata]);

  // Calculate totals safely
  const totalDistance = logisticsStages.reduce((sum, stage) => {
    return sum + (Number(stage.distance) || 0);
  }, 0);

  const totalDuration = logisticsStages.reduce((sum, stage) => {
    if (stage.startTime && stage.endTime) {
      try {
        const start = new Date(stage.startTime).getTime();
        const end = new Date(stage.endTime).getTime();
        return sum + Math.max(0, end - start);
      } catch {
        return sum;
      }
    }
    return sum;
  }, 0);

  // Format duration helper
  const formatDuration = (ms) => {
    if (!ms || ms <= 0) return 'Calculating...';
    
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Get transport icon
  const getTransportIcon = (vehicleType) => {
    const iconClass = "w-5 h-5 text-white";
    switch (vehicleType) {
      case 'air_cargo': return <Plane className={iconClass} />;
      case 'container_ship': return <Ship className={iconClass} />;
      case 'truck_refrigerated':
      case 'truck_dry': return <Truck className={iconClass} />;
      case 'van': return <Car className={iconClass} />;
      default: return <Truck className={iconClass} />;
    }
  };

  // CORREÇÃO: Determina corretamente se todos os estágios estão concluídos
  const allStagesCompleted = logisticsStages.every(stage => stage.endTime);
  const completedStagesCount = logisticsStages.filter(stage => stage.endTime).length;

  // Animate distance counter
  useEffect(() => {
    if (totalDistance > 0) {
      let current = 0;
      const target = totalDistance;
      const duration = 1800;
      const steps = 50;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setAnimatedDistance(Math.round(target));
          clearInterval(timer);
        } else {
          setAnimatedDistance(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [totalDistance]);

  if (!logisticsStages || logisticsStages.length === 0) {
    return (
      <section className="relative py-20 px-6 bg-gradient-to-b from-black via-stone-950 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <Package className="w-16 h-16 mx-auto mb-6 text-stone-500" />
          <h2 className="text-3xl font-bold text-stone-300 mb-4">Logistics Tracking</h2>
          <p className="text-stone-400 text-lg">
            No logistics data available for this coffee batch.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 px-4 sm:px-6 bg-gradient-to-b from-black via-stone-950 to-black text-stone-200">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-amber-600" />
            <span className="text-amber-600 text-sm font-medium tracking-widest uppercase">
              Coffee Journey
            </span>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-amber-600" />
          </div>
          <h2 className="text-4xl pb-3 sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-6 leading-tight">
            Complete Logistics
          </h2>
          
          {logisticsStages[0]?.trackingId && (
            <p className="text-stone-400 font-mono text-sm bg-stone-900/50 px-4 py-2 rounded-lg inline-block">
              Tracking: <span className="text-amber-400">{logisticsStages[0].trackingId}</span>
            </p>
          )}
        </div>

        {/* Interactive Map - AGORA MOSTRA TODOS OS TRAJETOS */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-amber-100 mb-8 flex items-center justify-center gap-3">
            <Navigation className="w-6 h-6" />
            Complete Route Map
          </h3>
          <RouteMap stages={logisticsStages} />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <TransportMetric 
            icon={<TrendingUp />} 
            label="Total Distance" 
            value={`${animatedDistance} km`}
            subtitle="Complete journey"
          />
          <TransportMetric 
            icon={<Clock />} 
            label="Total Duration" 
            value={formatDuration(totalDuration)}
            subtitle="Transport time"
          />
          <TransportMetric 
            icon={<ThermometerSun />} 
            label="Temperature Range" 
            value={`12°C - 23°C`}
            subtitle="Optimal conditions"
          />
          <TransportMetric 
            icon={<Droplets />} 
            label="Humidity Range" 
            value={`58% - 60%`}
            subtitle="Quality preservation"
          />
        </div>

        {/* Transport Stages - CORRIGIDO para mostrar status correto */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-amber-100 mb-8 flex items-center gap-3">
            <Package className="w-6 h-6" />
            All Transport Stages
          </h3>
          <div className="space-y-4">
            {logisticsStages.map((stage, index) => {
              // CORREÇÃO: Determina corretamente se o estágio está concluído
              const isCompleted = !!stage.endTime;
              // CORREÇÃO: Só está "current" se for o último estágio incompleto
              const isCurrent = !isCompleted && 
                index === logisticsStages.findIndex(s => !s.endTime);

              return (
                <JourneyStep
                  key={`journey-${index}-${stage.origin}-${stage.destination}`}
                  stage={`Stage ${index + 1}: ${stage.origin} → ${stage.destination}`}
                  location={`Vehicle: ${formatLabel(stage.vehicleType) || 'Not specified'} | Plate: ${stage.vehiclePlate || 'N/A'} | Driver: ${stage.driverName || 'N/A'}`}
                  description={stage.transportConditions || 'Standard transport conditions applied.'}
                  isCurrent={isCurrent}
                  isCompleted={isCompleted}
                  transportModeIcon={getTransportIcon(stage.vehicleType)}
                  startTime={stage.startTime}
                  endTime={stage.endTime}
                  distance={stage.distance}
                />
              );
            })}
          </div>
        </div>

        {/* Progress Summary - CORRIGIDO para mostrar progresso real */}
        <div className="bg-stone-900/30 rounded-2xl p-6 border border-stone-700/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-stone-300 font-medium">
              {allStagesCompleted ? 'Journey Complete! 🎉' : 'Journey Progress'}
            </span>
            <span className={`font-semibold ${
              allStagesCompleted ? 'text-green-400' : 'text-amber-400'
            }`}>
              {allStagesCompleted ? '100%' : `${Math.round((completedStagesCount / logisticsStages.length) * 100)}%`}
            </span>
          </div>
          <div className="w-full bg-stone-700/30 rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                allStagesCompleted 
                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                  : 'bg-gradient-to-r from-amber-500 to-green-500'
              }`}
              style={{ width: `${allStagesCompleted ? 100 : (completedStagesCount / logisticsStages.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-stone-500">
            <span>Start</span>
            <span>{completedStagesCount} of {logisticsStages.length} Stages</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Certifications Summary */}
        {logisticsStages.some(stage => stage.transportCertifications) && (
          <div className="mt-8 text-center">
            <h4 className="text-lg font-semibold text-stone-300 mb-4">Transport Certifications</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from(new Set(
                logisticsStages.flatMap(stage => stage.transportCertifications || [])
              )).map((cert, index) => (
                <div key={index} className="px-3 py-1 bg-green-950/40 border border-green-800/40 rounded-full">
                  <span className="text-green-400 text-xs font-medium capitalize">
                    {cert.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};