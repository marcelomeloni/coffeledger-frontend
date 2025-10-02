import React from 'react';
import { MapPin, Coffee, Calendar, Award, Users, Mountain, Star } from 'lucide-react';
import { LocationMap } from './LocationMap';

const DetailCard = ({ icon, title, value, highlight, large }) => (
  <div className={`p-6 rounded-xl border transition-all duration-300 ${
    highlight 
      ? 'bg-gradient-to-br from-amber-500/10 to-amber-900/20 border-amber-500/30 shadow-lg' 
      : 'bg-white/5 border-white/10 hover:border-amber-500/20'
  } ${large ? 'col-span-2' : ''}`}>
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg ${
        highlight ? 'bg-amber-500/20' : 'bg-white/10'
      }`}>
        {React.cloneElement(icon, { 
          className: `w-6 h-6 ${highlight ? 'text-amber-400' : 'text-amber-200/70'}` 
        })}
      </div>
      <div className="flex-1">
        <div className="text-sm text-amber-200/60 uppercase tracking-wider mb-2 font-light">{title}</div>
        <div className={`text-lg font-medium ${highlight ? 'text-amber-100' : 'text-white'} leading-relaxed`}>
          {value}
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon, value, label, subtitle }) => (
  <div className="bg-gradient-to-br from-amber-900/20 to-amber-950/30 border border-amber-500/20 rounded-xl p-6 backdrop-blur-sm">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-amber-500/20 rounded-lg">
        {React.cloneElement(icon, { className: 'w-5 h-5 text-amber-400' })}
      </div>
      <div className="text-amber-200/60 text-sm font-light uppercase tracking-wider">{label}</div>
    </div>
    <div className="text-3xl font-bold text-amber-100 mb-1">{value}</div>
    {subtitle && <div className="text-amber-200/40 text-sm">{subtitle}</div>}
  </div>
);

export const ProductionDetails = ({ producerMetadata }) => {
  if (!producerMetadata) return null;

  // Extrai coordenadas do metadata
  const getCoordinates = () => {
    if (!producerMetadata.coordinates) return null;
    
    const lat = parseFloat(producerMetadata.coordinates.lat);
    const lng = parseFloat(producerMetadata.coordinates.lng || producerMetadata.coordinates.lon);
    
    if (isNaN(lat) || isNaN(lng)) return null;
    
    return { lat, lng };
  };

  const coordinates = getCoordinates();
  const hasMap = coordinates !== null;

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-amber-950 via-stone-900 to-black min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' fill='%23f59e0b' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="text-amber-500/80 text-sm font-light tracking-[0.3em] uppercase">ORIGIN STORY</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 mb-6 font-serif">
            {producerMetadata.farmName}
          </h1>
          <p className="text-xl text-amber-200/70 max-w-3xl mx-auto leading-relaxed font-light">
            Where exceptional coffee begins its journey, nurtured in the highlands of {producerMetadata.farmName}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid xl:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Story & Stats */}
          <div className="xl:col-span-2 space-y-8">
            {/* Story Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-amber-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-amber-100 font-serif">The Legacy</h2>
              </div>
              <p className="text-lg text-amber-200/80 leading-relaxed font-light">
                {producerMetadata.producerStory || "For generations, this family-owned estate has been dedicated to the art of coffee cultivation. Each bean tells a story of tradition, passion, and uncompromising quality, nurtured in the rich soils of Brazil's most prestigious coffee-growing regions."}
              </p>
              
              {producerMetadata.shadeConsortium && (
                <div className="mt-6 p-4 bg-green-900/20 border border-green-700/30 rounded-xl">
                  <p className="text-green-300 text-sm leading-relaxed">🌳 {producerMetadata.shadeConsortium}</p>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <StatCard 
                icon={<Mountain />}
                value={`${producerMetadata.altitude || 'N/A'}m`}
                label="Altitude"
                subtitle="Above sea level"
              />
              <StatCard 
                icon={<Star />}
                value={producerMetadata.qualityScore || 'N/A'}
                label="Quality Score"
                subtitle="Specialty grade"
              />
              <StatCard 
                icon={<Coffee />}
                value={producerMetadata.variety || 'Arabica'}
                label="Variety"
                subtitle="Coffee species"
              />
              <StatCard 
                icon={<Award />}
                value={producerMetadata.processingMethod || 'Natural'}
                label="Processing"
                subtitle="Traditional method"
              />
            </div>

            {/* Certifications */}
            {producerMetadata.certifications && producerMetadata.certifications.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-100 mb-4 font-serif">Certifications & Standards</h3>
                <div className="flex flex-wrap gap-3">
                  {producerMetadata.certifications.map((cert) => (
                    <div key={cert} className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
                      <span className="text-amber-300 text-sm font-medium capitalize">
                        {cert.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Map & Essential Details */}
          <div className="space-y-8">
            {/* Map Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-amber-100 flex items-center gap-3 font-serif">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  Geographic Origin
                </h3>
              </div>
              
              {hasMap ? (
                <>
                  <div className="p-2">
                    <LocationMap 
                      lat={coordinates.lat}
                      lng={coordinates.lng}
                      farmName={producerMetadata.farmName}
                      address={producerMetadata.address}
                    />
                  </div>
                  <div className="p-4 bg-amber-500/5 border-t border-white/10">
                    <p className="text-amber-300 text-sm text-center font-light">
                      📍 {producerMetadata.address}
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center">
                  <MapPin className="w-16 h-16 text-amber-500/30 mx-auto mb-4" />
                  <p className="text-amber-200/60 text-lg font-light">Location data not available</p>
                  <p className="text-amber-200/40 text-sm mt-2">
                    Geographic coordinates required for map display
                  </p>
                </div>
              )}
            </div>

            {/* Essential Details */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-amber-100 mb-4 font-serif">Production Details</h3>
              <div className="grid gap-4">
                <DetailCard 
                  icon={<Calendar />} 
                  title="Harvest Season" 
                  value={
                    producerMetadata.harvestDate 
                      ? new Date(producerMetadata.harvestDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Seasonal harvest'
                  } 
                />
                <DetailCard 
                  icon={<Users />} 
                  title="Harvest Method" 
                  value={producerMetadata.harvestMethod || 'Traditional hand-picking'} 
                />
                <DetailCard 
                  icon={<Award />} 
                  title="Processing Technique" 
                  value={producerMetadata.processingMethod || 'Natural sun-dried'} 
                  highlight 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Geographic Information */}
        {hasMap && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-amber-500 rounded-full"></div>
              <h3 className="text-2xl font-bold text-amber-100 font-serif">Geographic Profile</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-amber-200/60 text-sm font-light uppercase tracking-wider mb-2">Latitude</div>
                <div className="text-amber-100 text-lg font-mono">{coordinates.lat.toFixed(6)}</div>
              </div>
              <div>
                <div className="text-amber-200/60 text-sm font-light uppercase tracking-wider mb-2">Longitude</div>
                <div className="text-amber-100 text-lg font-mono">{coordinates.lng.toFixed(6)}</div>
              </div>
              <div>
                <div className="text-amber-200/60 text-sm font-light uppercase tracking-wider mb-2">Region</div>
                <div className="text-amber-100 text-lg">
                  {producerMetadata.address?.split(',')?.[1]?.trim() || 'São Paulo'}
                </div>
              </div>
              <div>
                <div className="text-amber-200/60 text-sm font-light uppercase tracking-wider mb-2">Terroir</div>
                <div className="text-amber-100 text-lg">Highland</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};